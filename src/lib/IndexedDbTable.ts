class IndexedDbTable {
  constructor(private db: IDBDatabase, private name: string) {}

  private getObjectStoreAndTransaction(): {
    transaction: IDBTransaction;
    objectStore: IDBObjectStore;
  } {
    const transaction = this.db.transaction([this.name], 'readwrite');
    const objectStore = (transaction as IDBTransaction).objectStore(this.name);
    return { transaction, objectStore };
  }
  public insert<T>(records: T | Array<T>): Promise<void> {
    return new Promise((resolve, reject) => {
      const { transaction, objectStore } = this.getObjectStoreAndTransaction();
      const r = Array.isArray(records) ? records : [records];

      r.forEach((record) => objectStore.put(record));

      transaction.oncomplete = () => {
        resolve();
      };
      transaction.onabort = reject;
      transaction.onerror = reject;
    });
  }

  public update<T>(records: T | Array<T>): Promise<void> {
    return this.insert(records);
  }

  public remove(key: string) {
    return new Promise((resolve, reject) => {
      const { objectStore } = this.getObjectStoreAndTransaction();

      const request = objectStore.delete(key);
      request.onsuccess = () => {
        resolve();
      };
      request.onerror = () => {
        reject();
      };
    });
  }

  public get<T>(key?: string): Promise<T | object | Array<T> | Array<object>> {
    return new Promise((resolve, reject) => {
      const { objectStore } = this.getObjectStoreAndTransaction();

      const request = key ? objectStore.get(key) : objectStore.getAll();

      request.onerror = () => {
        reject();
      };
      request.onsuccess = (e) => {
        // @ts-ignore
        resolve(e.target.result);
      };
    });
  }
}

export default IndexedDbTable;
