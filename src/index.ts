import { isIndexedDbSupported, getIndexedDb } from './lib/helper';
import IndexedDbSdk from './lib/IndexedDbSdk';

interface Table {
  name: string;
  primaryKey: string;
  autoIncrement?: boolean;
  indices?: Array<string>;
}
interface Config {
  dbName?: string;
  dbVersion?: number;
  tables: Array<Table>;
}

function indexedDbSdkFactory(config: Config): Promise<IndexedDbSdk> {
  return new Promise((resolve, reject) => {
    if (!isIndexedDbSupported())
      return reject('IndexedDb is not supported by your browser');

    const { dbName, dbVersion, tables } = config;

    const idb = getIndexedDb();
    let db: IDBDatabase | null = null;
    const objectStoreMap: { [key: string]: IDBObjectStore } = {};

    const dbConnection = idb.open(dbName || location.hostname, dbVersion || 1);
    dbConnection.onsuccess = (e: any) => {
      // @ts-ignore
      db = e.target.result;

      const obj = new IndexedDbSdk(idb, db!, objectStoreMap);

      resolve(obj);
    };

    dbConnection.onerror = () => {
      reject('Sorry could not connect to database');
    };

    dbConnection.onupgradeneeded = (e) => {
      // @ts-ignore
      db = e.target.result as IDBObjectStore;

      tables.forEach(
        ({ name, primaryKey, autoIncrement = true, indices = [] }) => {
          const objectStore = (db as IDBDatabase).createObjectStore(name, {
            keyPath: primaryKey,
            autoIncrement,
          });

          indices.forEach((i) => objectStore.createIndex(i, i));

          objectStoreMap[name] = objectStore;
        }
      );
    };
  });
}


export default indexedDbSdkFactory;
