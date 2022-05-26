import { readFileSync } from 'fs';
import yargs from 'yargs';
import { AppError } from '../errors/app-error.js';
import { StringAnyMap } from '../typings/index.js';
import { defaultConfig } from './default.js';
import { AppConfig } from './typings.js';

export { appConfig, createAppConfig };

let appConfig: AppConfig;

const createAppConfig = () => {
  appConfig = parseConfig();
};

const parseConfig = (): AppConfig => {
  const settings = process.env.SETTINGS;
  const config: Partial<AppConfig> = settings ? JSON.parse(settings) : getConfigJSON();

  return {
    ...defaultConfig, //
    ...config,
  } as AppConfig;
};

const getConfigJSON = (): Partial<AppConfig> => {
  const args = process.argv.slice(2);
  const argv = yargs(args).argv as StringAnyMap;

  if (!argv.c && !argv.config) {
    throw new AppError({ message: 'Please, specify config file' });
  }
  const configPath = argv.c || argv.config;
  const configStr = readFileSync(configPath, 'utf8');

  const config: Partial<AppConfig> = {
    ...JSON.parse(configStr),
    ...argv,
  };

  return config;
};
