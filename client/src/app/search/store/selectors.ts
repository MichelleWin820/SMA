import { createFeatureSelector, createSelector } from '@ngrx/store';
import { searchFeatureKey, SearchState } from 'src/app/search/store/state';

export const getSchemeStateSelector = createFeatureSelector<SearchState>(searchFeatureKey);

export const selectProteinsSelector = createSelector(getSchemeStateSelector, (state) => state.proteins);
export const selectProteinsTotalSelector = createSelector(getSchemeStateSelector, (state) => state.proteinsTotal);
export const selectViewParams = createSelector(getSchemeStateSelector, (state) => state.viewParams);
export const selectViewFilters = createSelector(selectViewParams, (viewParams) => viewParams.filters);
export const selectViewColumns = createSelector(selectViewParams, (viewParams) => viewParams.columns);
