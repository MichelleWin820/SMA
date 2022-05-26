import { ListRequest } from '../../typings/index.js';

export type Protein = {
  readonly uniProtId: string;
  readonly accession: string;
  readonly geneId: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly length?: number | null;
  readonly sequence?: string | null;
  readonly species?: string | null;
  readonly isEnzyme?: boolean | null;
};

export type ProteinClient = Protein & {
  readonly geneName?: string | null;
  readonly domainName?: string | null;
  readonly domainId?: string | null;
  readonly methodId?: string | null;
  readonly pubMedId?: readonly string[] | null;
  readonly reactionId?: string | null;
  readonly reactionName?: string | null;
  readonly reactionECNumber?: string | null;
  readonly reactionMetaDomain?: string | null;
  readonly pathwayId?: string | null;
  readonly pathwayName?: string | null;
  readonly organelleId?: string | null;
  readonly geneAliases?: string | null;
  readonly proteinAliases?: string | null;
};

export type TableColumn = keyof ProteinClient;

export type ProteinRequest = ListRequest & {
  readonly term?: string | null;
  readonly geneId?: readonly string[];
  readonly domainId?: readonly string[];
  readonly pubMedId?: readonly string[];
  readonly organelleId?: readonly string[];
  readonly methodId?: readonly string[];
  readonly reactionId?: readonly string[];
  readonly pathwayId?: readonly string[];
  readonly columns?: readonly TableColumn[];
};

export type FiltersSchema = {
  readonly filterName: TableColumn;
  readonly columnName: string;
};

export type ColumnsSchema = {
  readonly columnName: TableColumn;
  readonly aliasName: string;
  readonly isDefault?: boolean;
  readonly alwaysInclude?: boolean;
};

export type SearchSelectConfig = {
  readonly selectedColumns: string[];
  readonly orderByColumns: string[];
};

export type WhereConditionResult = {
  readonly where: string;
  readonly values: string[];
  readonly conditions: string[];
};

export type ProteinsListResult = {
  readonly proteins: readonly ProteinClient[];
  readonly total: number;
};
