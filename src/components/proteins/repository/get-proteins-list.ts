import { DbClient } from '../../../db/sql-storage/models.js';
import { pool } from '../../../db/sql-storage/pool.js';
import { StringAnyMap } from '../../../typings/index.js';
import { parseListReqOptions } from '../../../utils/parse-list-req-options.js';
import { ColumnsSchema, FiltersSchema, ProteinClient, ProteinRequest, ProteinsListResult, TableColumn } from '../models.js';

export { getProteinsList };

const columnsSchema: readonly ColumnsSchema[] = [
  { columnName: 'uniProtId', aliasName: 'p."uniProtId"', alwaysInclude: true }, //
  { columnName: 'accession', aliasName: 'p."accession"' },
  { columnName: 'geneId', aliasName: 'p."geneId"' },
  { columnName: 'geneName', aliasName: 'g."name" AS "geneName"' },
  { columnName: 'domainName', aliasName: 'p."domainName"' },
  { columnName: 'domainId', aliasName: 'p."domainId"' },
  { columnName: 'name', aliasName: 'p."name"', isDefault: true },
  { columnName: 'description', aliasName: 'p."description"' },
  { columnName: 'length', aliasName: 'p."length"' },
  { columnName: 'sequence', aliasName: 'p."sequence"' },
  { columnName: 'species', aliasName: 'p."species"' },
  { columnName: 'isEnzyme', aliasName: 'p."isEnzyme"' },
  { columnName: 'methodId', aliasName: 'p."methodId"', isDefault: true },
  { columnName: 'pubMedId', aliasName: 'p."pubMedId"' },
  { columnName: 'organelleId', aliasName: 'p."organelleId"', isDefault: true },
  // { columnName: 'geneAliases', aliasName: 'g."geneAliases" AS "geneAliases"' },
  { columnName: 'proteinAliases', aliasName: 'p."proteinAliases"' },
  { columnName: 'reactionId', aliasName: 'p."reactionId"' },
  { columnName: 'reactionName', aliasName: 'p."reactionName"' },
  { columnName: 'reactionECNumber', aliasName: 'p."reactionECNumber"' },
  { columnName: 'reactionMetaDomain', aliasName: 'p."reactionMetaDomain"' },
  { columnName: 'pathwayId', aliasName: 'p."pathwayId"' },
  { columnName: 'pathwayName', aliasName: 'p."pathwayName"' },
] as const;

const aggFiltersSchema: readonly FiltersSchema[] = [
  { filterName: 'methodId', columnName: 'loc."methodId"' }, //
  { filterName: 'pubMedId', columnName: 'loc."pubMedId"' },
  { filterName: 'organelleId', columnName: 'loc."organelleId"' },
  { filterName: 'domainId', columnName: 'd."id"' },
  { filterName: 'pathwayId', columnName: 'pwy."id"' },
  { filterName: 'reactionId', columnName: 'rxn."id"' },
] as const;

const mainFiltersSchema: readonly FiltersSchema[] = [
  { filterName: 'geneId', columnName: 'g."accession"' }, //
] as const;

const getProteinsList = async (req: ProteinRequest, client?: DbClient): Promise<ProteinsListResult> => {
  const columns = filterSelectedColumns(columnsSchema, req.columns);
  const sortColumns = columns.map((c) => c.columnName);
  const selectColumns = columns.map((c) => c.aliasName).join(',\n');
  const columnsSet = new Set(sortColumns);
  const { orderBy, skip, limit, orderDirection } = parseListReqOptions<ProteinClient>(req, sortColumns);

  const values: string[] = [];
  const whereAgg = buildWhere(aggFiltersSchema, values, [], req);

  const len = values.length + 1;
  const mainConditions: string[] = [];

  const like = `(
                  p."name" ILIKE $${len}
              OR  p."uniProtId" ILIKE $${len}
              OR  p."description" ILIKE $${len}
              OR  g."name" ILIKE $${len}
              OR  g."accession" ILIKE $${len}
              ${columnsSet.has('domainId') ? `OR  p."domainId" ILIKE $${len}` : ``}
              ${columnsSet.has('domainName') ? `OR  p."domainName" ILIKE $${len}` : ``}
              ${columnsSet.has('proteinAliases') ? `OR  p."proteinAliases" ILIKE $${len}` : ``}
  )`;

  if (req.term) {
    values.push(`%${req.term}%`);
    mainConditions.push(like);
  }

  const whereMain = buildWhere(mainFiltersSchema, values, mainConditions, req);

  const text = `
  SELECT ${selectColumns},
         COUNT(*) OVER() AS total
  FROM (
      SELECT ptn.*,
             ${columnsSet.has('proteinAliases') ? `STRING_AGG(DISTINCT tag."name", '; ') AS "proteinAliases",` : ``}
             ${columnsSet.has('methodId') ? `STRING_AGG(DISTINCT loc."methodId", '; ') AS "methodId",` : ``}
             ${columnsSet.has('pubMedId') ? `ARRAY_AGG(DISTINCT loc."pubMedId") AS "pubMedId",` : ``}
             ${columnsSet.has('organelleId') ? `STRING_AGG(DISTINCT loc."organelleId", '; ') AS "organelleId",` : ``}
             ${columnsSet.has('domainName') ? `STRING_AGG(DISTINCT d."name", '; ') AS "domainName",` : ``}
             ${columnsSet.has('domainId') ? `STRING_AGG(DISTINCT d."id", '; ') AS "domainId",` : ``}
             ${columnsSet.has('reactionId') ? `STRING_AGG(DISTINCT rxn."id", '; ') AS "reactionId",` : ``}
             ${columnsSet.has('reactionName') ? `STRING_AGG(DISTINCT rxn."name", '; ') AS "reactionName",` : ``}
             ${columnsSet.has('reactionECNumber') ? `STRING_AGG(DISTINCT rxn."ecNumber", '; ') AS "reactionECNumber",` : ``}
             ${columnsSet.has('reactionMetaDomain') ? `STRING_AGG(DISTINCT rxn."metaDomain", '; ') AS "reactionMetaDomain",` : ``}
             ${columnsSet.has('pathwayId') ? `STRING_AGG(DISTINCT pwy."id", '; ') AS "pathwayId",` : ``}
             ${columnsSet.has('pathwayName') ? `STRING_AGG(DISTINCT pwy."name", '; ') AS "pathwayName",` : ``}
            0 as total
      FROM "public"."proteins" as ptn
      LEFT JOIN "public"."localization" as loc ON loc."proteinId" = ptn."accession"
      LEFT JOIN "public"."rxnprnpwy" as rpp ON rpp."proteinId" = ptn."accession"
      LEFT JOIN "public"."pathways" as pwy ON rpp."pathwayId" = pwy."id"
      LEFT JOIN "public"."reactions" as rxn ON rpp."reactionId" = rxn."id"
      LEFT JOIN "public"."domains" as d ON d."proteinId" = ptn."accession"
      LEFT JOIN "public"."tags" as tag ON tag."proteinId" = ptn."accession"
      ${whereAgg}
      GROUP BY ptn."accession"
  ) as p
  LEFT JOIN "public"."genes" as g ON g."accession" = p."geneId"
  ${whereMain}
  ORDER BY "${orderBy}" ${orderDirection}
  LIMIT ${limit | 0}
  OFFSET ${skip | 0};`;

  const res = await (client || pool).query({ text, values });
  const rows = res.rows;
  const total: number = rows.length > 0 ? Number.parseFloat(rows[0].total) : -1;

  return { proteins: rows, total };
};

const filterSelectedColumns = (schema: readonly ColumnsSchema[], columns: readonly TableColumn[] = []): readonly ColumnsSchema[] => {
  const set = new Set<TableColumn>(columns);
  return schema.filter((s) => s.alwaysInclude || set.has(s.columnName) || (set.size === 0 && s.isDefault));
};

const buildWhere = (schema: readonly FiltersSchema[], values: string[], conditions: string[], filters?: StringAnyMap): string => {
  schema.reduce((acc, af) => {
    const arr = filters?.[af.filterName];
    if (Array.isArray(arr) && arr.length > 0) {
      const condition = buildInArrayCondition(af.columnName, arr, values);
      acc.push(condition);
    }
    return acc;
  }, conditions);

  if (conditions.length === 0) return '';
  return 'WHERE ' + conditions.join(' AND ');
};

const buildInArrayCondition = (tableColumnName: string, array: readonly string[], values: string[]): string => {
  const expressions: string[] = [];

  array.forEach((id) => {
    values.push(id);
    expressions.push(`$${values.length}`);
  });

  return `${tableColumnName} IN (${expressions.join(',')})`;
};
