import { isIndexedDbSupported, getIndexedDb } from './lib/helper';
import IndexedDbSdk from './lib/IndexedDbSdk';

interface Config {
  dbName?: string;
  dbVersion?: number;
}

function indexedDbSdkFactory(config: Config = {}): Promise<IndexedDbSdk> {
  return new Promise((resolve, reject) => {
    if (!isIndexedDbSupported())
      return reject('IndexedDb is not supported by your browser');

    const { dbName, dbVersion } = config;

    const idb = getIndexedDb();
    let db = null;

    const dbConnection = idb.open(dbName || location.hostname, dbVersion || 1);
    dbConnection.onsuccess = () => {
      db = dbConnection.result;

      const obj = new IndexedDbSdk(db);

      resolve(obj);
    };

    dbConnection.onerror = () => {
      reject('Sorry could not connect to database');
    };
  });
}

indexedDbSdkFactory({ dbName: 'NotesApp' }).then((db) => {
  db.createCollection('notes');
});

export default indexedDbSdkFactory;
