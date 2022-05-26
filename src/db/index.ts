import * as sqlStorege from './sql-storage/index.js';

export { init, stop, clear };

const init = (): Promise<readonly unknown[]> => {
  return Promise.all([
    sqlStorege.init(), //
  ]);
};

const stop = (): Promise<readonly unknown[]> => {
  return Promise.all([
    sqlStorege.stop(), //
  ]);
};

const clear = (): Promise<void> => {
  return sqlStorege.clear();
};
