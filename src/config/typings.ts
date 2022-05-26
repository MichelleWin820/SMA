import { LogLevel } from '../log/typings.js';

export type NodeEnv = 'test' | 'local' | 'develop' | 'pp' | 'production';

export type AppConfig = {
  readonly env: string;
  readonly rootPath: string;
  readonly logLevel: keyof typeof LogLevel;
  readonly host: HostSettings;
  readonly auth: AuthSettings;
  readonly postreSql: PGSettings;
  readonly upload: UploadSettings;
};

export type HostSettings = {
  readonly port: number;
  readonly protocol: 'http' | 'https';
};

export type AuthSettings = {
  readonly tokenSign: string;
  readonly expiresIn: string;
  readonly cookieName: string;
  readonly masterpassword: string;
};

export type UploadSettings = {
  readonly uploadDir: string;
  readonly maxFileSize?: number;
  readonly maxFields?: number;
  readonly onFileBegin?: (name: string, file: any) => void;
};

export type PGSettings = {
  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly user: string;
  readonly password: string;
};
