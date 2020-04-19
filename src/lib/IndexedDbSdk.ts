import IndexedDbTable from './IndexedDbTable';

// todo: think about adding unique to indices

enum TransactionMode {
  READ_WRITE = 'readwrite',
  READ_ONLY = 'readonly',
}

/**
 * If autoIncrement is set to true then key for newly stored object
 * is generated automatically
 */
interface CollectionConfig {
  autoIncrement?: boolean;
  primaryKey?: string;
  indices?: string | Array<string>;
  transactionMode?: TransactionMode;
}

class IndexedDbSdk {
  constructor(private db: IDBDatabase) {}

  public createCollection(
    name: string,
    config: CollectionConfig
  ): Promise<IndexedDbTable> {
    return new Promise((resolve, reject) => {
      const {
        primaryKey,
        autoIncrement,
        indices: i,
        transactionMode = TransactionMode.READ_WRITE,
      } = config;
      const objectStore = primaryKey
        ? this.db.createObjectStore(
            name,
            autoIncrement
              ? { keyPath: primaryKey, autoIncrement }
              : { keyPath: primaryKey }
          )
        : this.db.createObjectStore(name);

      const indices = Array.isArray(i) ? i : [i];

      indices.forEach((i) => {
        objectStore.createIndex(name, i!);
      });

      objectStore.transaction.oncomplete = () => {
        const objectStoreInstance = this.db
          .transaction(name, transactionMode)
          .objectStore(name);

        resolve(new IndexedDbTable(objectStoreInstance));
      };

      objectStore.transaction.onerror = () => {
        reject('Transaction failed');
      };

      objectStore.transaction.onabort = () => {
        reject('Transaction aborted');
      };
    });
  }
}

export default IndexedDbSdk;
