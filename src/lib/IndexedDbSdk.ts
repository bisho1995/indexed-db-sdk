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
  private tables: { [key: string]: IndexedDbTable };
  constructor(
    private db: IDBDatabase,
    tables: { [key: string]: IDBObjectStore }
  ) {
    this.tables = {};

    Object.keys(tables).map((name) => {
      this.tables[name] = new IndexedDbTable(this.db, name);
    });
  }

  public getTable(name: string) {
    if (!this.db.objectStoreNames.contains(name)) {
      throw new Error(`Table ${name} is not found in database`);
    }

    if (!this.tables[name])
      this.tables[name] = new IndexedDbTable(this.db, name);
      
    return this.tables[name];
  }
}

export default IndexedDbSdk;
