import { IAppError } from '../../errors/index.js';
import { StringAnyMap } from '../../typings/index.js';
import { User } from '../auth/models.js';

export const IMPORT_START = 'import:start';
export const IMPORT_PROGRESS = 'import:progress';
export const IMPORT_COMPLETE = 'import:complete';

export type ImportRequest = {
  table: string;
  escape?: string;
  delimiter?: string;
};

export type ImportResponse = {
  readonly token: string;
};

export type Payload = ImportResponse & {
  readonly msg?: string;
  readonly row?: StringAnyMap;
  readonly idx?: string | number;
  readonly progress?: number;
  readonly error?: IAppError;
};

export type ProcessImportTable<T = StringAnyMap> = (token: string, creator: User) => Promise<readonly T[]>;
export type ProcessImportCSV<T = StringAnyMap> = (token: string, creator: User, rows: readonly StringAnyMap[]) => Promise<readonly T[]>;

export type ImportParams<T = StringAnyMap> = {
  readonly token: string;
  readonly creator: User;
  readonly rows: readonly StringAnyMap[];
  readonly createItem: (creator: User, raw: StringAnyMap) => Promise<T>;
};
