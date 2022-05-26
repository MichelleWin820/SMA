import { init as domainsInit } from '../../components/domains/index.js';
import { init as genesInit } from '../../components/genes/index.js';
import { init as localizationInit } from '../../components/localization/index.js';
import { init as methodsInit } from '../../components/methods/index.js';
import { init as papers } from '../../components/papers/index.js';
import { init as pathways } from '../../components/pathways/index.js';
import { init as proteinsInit } from '../../components/proteins/index.js';
import { init as reactionsInit } from '../../components/reactions/index.js';
import { init as sharesInit } from '../../components/share/index.js';
import { init as tagsInit } from '../../components/tags/index.js';
import { logger } from '../../log/index.js';
import { connect } from './connect.js';
import { initAppPool } from './pool.js';

export { init };

const init = async (): Promise<void> => {
  initAppPool();

  logger.info('Trying to connect to PostgreSQL...');
  const client = await connect();
  logger.info('PostgreSQL connected.');

  try {
    logger.info('Init database...');
    await client.query(crateCryptoEx());
    await client.query(createShortUID());

    await Promise.all([
      sharesInit(client), //
      genesInit(client),
      methodsInit(client),
      pathways(client),
      papers(client),
    ]);

    await Promise.all([
      proteinsInit(client), //
    ]);

    await Promise.all([
      tagsInit(client),
      domainsInit(client),
      reactionsInit(client),
      localizationInit(client), //
    ]);

    logger.info('Database inited.');
  } finally {
    client.release();
  }
};

const crateCryptoEx = () => {
  return `CREATE EXTENSION IF NOT EXISTS pgcrypto;`;
};

const createShortUID = () => {
  return `
    CREATE OR REPLACE FUNCTION gen_short_uid(size INT) RETURNS TEXT AS $$
    DECLARE
      characters TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      bytes BYTEA := gen_random_bytes(size);
      l INT := length(characters);
      i INT := 0;
      output TEXT := '';
    BEGIN
      WHILE i < size LOOP
        output := output || substr(characters, get_byte(bytes, i) % l + 1, 1);
        i := i + 1;
      END LOOP;
      RETURN output;
    END;
    $$ LANGUAGE plpgsql VOLATILE;`;
};
