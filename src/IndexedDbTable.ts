class IndexedDbTable {
  constructor(private table: IDBObjectStore) {}

  public insert<T>(record: T): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = this.table.add(record);

      request.onsuccess = resolve;
      request.onerror = () => reject();
    });
  }
}

export default IndexedDbTable;
