import { File } from 'formidable';
import { existsSync, mkdirSync } from 'fs';
import { appConfig } from '../../../config/index.js';

export { onFileBegin };

const onFileBegin = (name: string, file: File) => {
  const uploadDir = appConfig.upload.uploadDir;

  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }
};
