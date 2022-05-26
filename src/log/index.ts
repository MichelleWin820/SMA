import { appConfig } from '../config/index.js';
import { DefaultLogger } from './default.js';
import { ILogger, LogLevel } from './typings.js';

export { logger, createAppLogger };

let logger: ILogger;
const createAppLogger = () => {
  logger = new DefaultLogger(LogLevel[appConfig.logLevel]);
};
