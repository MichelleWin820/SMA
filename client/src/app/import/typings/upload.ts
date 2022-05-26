import { AppError, StringAnyMap } from 'src/app/core/typings/common';

export type ImportStatus = 'uploading' | 'importing' | 'complete';

export type UploadRequest = {
  readonly file: File;
  readonly separator: string;
};

export type Payload = {
  readonly msg?: string;
  readonly row?: StringAnyMap;
  readonly idx?: string | number;
  readonly progress?: number;
  readonly error?: AppError;
};

export type LogMessage = {
  readonly id: string | number;
  readonly error: boolean;
  readonly message: string;
};
