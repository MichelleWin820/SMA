export enum LogLevel {
  debug = 1,
  info = 2,
  log = 4,
}

export interface ILogger {
  log(...args: any[]): void;
  info(...args: any[]): void;
  debug(...args: any[]): void;
  error(...args: any[]): void;
}
