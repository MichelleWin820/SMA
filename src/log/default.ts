import { ILogger, LogLevel } from './typings.js';

export class DefaultLogger implements ILogger {
  constructor(private level: LogLevel) {}

  log(...args: any[]): void {
    console.log(...args);
  }

  error(...args: any[]): void {
    console.error(...args);
  }

  debug(...args: any[]): void {
    if (this.level <= LogLevel.debug) {
      console.debug(...args);
    }
  }

  info(...args: any[]): void {
    if (this.level <= LogLevel.info) {
      console.info(...args);
    }
  }
}
