import { randomBytes } from 'crypto';

export { getRandomString };

const getRandomString = (bytesLength = 96, type: 'base64' | 'hex' = 'hex'): string => {
  const buffer = randomBytes(bytesLength);
  return buffer.toString(type);
};
