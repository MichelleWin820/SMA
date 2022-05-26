import { indexBy } from 'src/app/core/utils/app-utils';
import { ProteinColumn, TableColumn } from 'src/app/search/typings/table';

export { TABLE_COLUMNS_LIST, TABLE_COLUMNS_MAP_BY_ID, DEFAULT_TABLE_COLUMNS };

const TABLE_COLUMNS_LIST: readonly TableColumn[] = [
  {
    id: 'accession',
    friendlyName: 'Protein accession',
    dropdownItemName: 'Protein accession',
  },
  {
    id: 'uniProtId',
    friendlyName: 'ID',
    dropdownItemName: 'Protein ID',
  },
  {
    id: 'name',
    friendlyName: 'Name',
    dropdownItemName: 'Protein name',
  },
  {
    id: 'description',
    friendlyName: 'Description',
    dropdownItemName: 'Protein Description',
  },
  {
    id: 'species',
    friendlyName: 'Species',
    dropdownItemName: 'Species',
  },
  {
    id: 'sequence',
    friendlyName: 'Sequence',
    dropdownItemName: 'Sequence',
  },
  {
    id: 'isEnzyme',
    friendlyName: 'Enzyme',
    dropdownItemName: 'Enzyme',
  },
  {
    id: 'geneName',
    friendlyName: 'Gene name',
    dropdownItemName: 'Gene name',
  },
  {
    id: 'geneId',
    friendlyName: 'Gene accession',
    dropdownItemName: 'Gene accession',
  },
  {
    id: 'domainName',
    friendlyName: 'Domain',
    dropdownItemName: 'Domain name',
  },
  {
    id: 'domainId',
    friendlyName: 'Domain ID',
    dropdownItemName: 'Domain ID',
  },
  {
    id: 'methodId',
    friendlyName: 'Method',
    dropdownItemName: 'Method',
  },
  {
    id: 'pubMedId',
    friendlyName: 'PubMed ID',
    dropdownItemName: 'PubMed ID',
  },
  {
    id: 'organelleId',
    friendlyName: 'Organelle',
    dropdownItemName: 'Organelle',
  },
  // {
  //   id: 'geneAliases',
  //   friendlyName: 'Gene Aliases',
  //   dropdownItemName: 'Gene Aliases',
  // },
  {
    id: 'proteinAliases',
    friendlyName: 'Protein Aliases',
    dropdownItemName: 'Protein Aliases',
  },
  {
    id: 'pathwayId',
    friendlyName: 'Pathway ID',
    dropdownItemName: 'Pathway ID',
  },
  {
    id: 'pathwayName',
    friendlyName: 'Pathway Name',
    dropdownItemName: 'Pathway Name',
  },
  {
    id: 'reactionId',
    friendlyName: 'Reaction ID',
    dropdownItemName: 'Reaction ID',
  },
  {
    id: 'reactionName',
    friendlyName: 'Reaction Name',
    dropdownItemName: 'Reaction Name',
  },
  {
    id: 'reactionECNumber',
    friendlyName: 'Reaction EC Number',
    dropdownItemName: 'Reaction EC Number',
  },
  {
    id: 'reactionMetaDomain',
    friendlyName: 'Reaction Metadomain',
    dropdownItemName: 'Reaction Metadomain',
  },
] as const;

const TABLE_COLUMNS_MAP_BY_ID = indexBy<TableColumn>(TABLE_COLUMNS_LIST, 'id');
const DEFAULT_TABLE_COLUMNS: readonly ProteinColumn[] = ['name', 'uniProtId', 'organelleId', 'methodId', 'geneId'] as const;
