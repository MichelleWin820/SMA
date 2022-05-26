import { Protein } from 'src/app/core/typings/protein';
import { ViewParams } from 'src/app/search/typings/table';

export const searchFeatureKey = 'search';

export interface SearchState {
  readonly viewParams: ViewParams;
  readonly proteins: readonly Protein[];
  readonly proteinsTotal: number;
}
