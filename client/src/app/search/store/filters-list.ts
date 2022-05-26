import { indexBy } from 'src/app/core/utils/app-utils';
import { AppFilter } from 'src/app/search/typings/table';

export { APP_FILTERS_LIST, APP_FILTERS_MAP_BY_PARAM_NAME };

const APP_FILTERS_LIST: readonly AppFilter[] = [
  {
    idFieldName: 'accession',
    labelFieldName: 'name',
    dataSourceName: 'loadGenes',
    filterParamName: 'geneId',
    alternativeLabelFieldName: 'accession',
    buttonText: { '=0': 'Genes', '=1': '1 gene', other: '# genes' },
    dropdownItemName: 'Genes',
  },
  {
    idFieldName: 'id',
    labelFieldName: 'name',
    dataSourceName: 'loadDomains',
    filterParamName: 'domainId',
    buttonText: { '=0': 'Domains', '=1': '1 domain', other: '# domains' },
    dropdownItemName: 'Domains',
  },
  {
    idFieldName: 'type',
    labelFieldName: 'type',
    dataSourceName: 'loadMethods',
    filterParamName: 'methodId',
    buttonText: { '=0': 'Methods', '=1': '1 method', other: '# methods' },
    dropdownItemName: 'Methods',
  },
  {
    idFieldName: 'id',
    labelFieldName: 'name',
    dataSourceName: 'loadPathways',
    filterParamName: 'pathwayId',
    buttonText: { '=0': 'Pathway', '=1': '1 pathway', other: '# pathways' },
    dropdownItemName: 'Pathways',
  },
  {
    idFieldName: 'id',
    labelFieldName: 'name',
    dataSourceName: 'loadReactions',
    filterParamName: 'reactionId',
    buttonText: { '=0': 'Reaction', '=1': '1 reaction', other: '# reactions' },
    dropdownItemName: 'Reactions',
  },
] as const;

const APP_FILTERS_MAP_BY_PARAM_NAME = indexBy<AppFilter>(APP_FILTERS_LIST, 'filterParamName');
