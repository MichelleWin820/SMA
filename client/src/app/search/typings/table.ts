import { StringStringMap, StringTMap } from 'src/app/core/typings/common';
import { Protein } from 'src/app/core/typings/protein';

export type ProteinColumn = keyof Protein;
export type ProteinsListResult = { proteins: readonly Protein[]; total: number };

export type FilterParamValue = string | number | boolean | readonly string[] | null;
export type FilterParams = StringTMap<FilterParamValue>;

export type AppFilter = {
  readonly idFieldName: string;
  readonly labelFieldName: string;
  readonly alternativeLabelFieldName?: string;
  readonly dataSourceName: string;
  readonly filterParamName: ProteinColumn;
  readonly dropdownItemName: string;
  readonly buttonText: StringStringMap;
};

export type TableColumn = {
  readonly id: keyof Protein;
  readonly friendlyName: string;
  readonly dropdownItemName: string;
};

export type ViewParams = {
  readonly filters: FilterParams;
  readonly columns: readonly ProteinColumn[];
};
