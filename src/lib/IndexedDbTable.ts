class IndexedDbTable {
  constructor(private db: IDBDatabase, private name: string) {}

  public insert<T>(records: T | Array<T>): Promise<(e: Event) => any> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.name], 'readwrite');

      const r = Array.isArray(records) ? records : [records];

      const objectStore = (transaction as IDBTransaction).objectStore(
        this.name
      );

      r.forEach((record) => objectStore.put(record));

      // @ts-ignore
      transaction.oncomplete = (t: IDBTransaction, e: Event) => {
        // @ts-ignore
        resolve(e);
      };
      transaction.onabort = reject;
      transaction.onerror = reject;
    });
  }
}

export default IndexedDbTable;
