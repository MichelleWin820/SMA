import { ActionReducer, MetaReducer } from '@ngrx/store';

export { metaReducers };

const debug = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    console.debug('state', state);
    console.debug('action', action);

    return reducer(state, action);
  };
};

const metaReducers: MetaReducer<any>[] = [debug];
