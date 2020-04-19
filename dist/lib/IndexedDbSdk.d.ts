import IndexedDbTable from './IndexedDbTable';
declare class IndexedDbSdk {
    private idb;
    private db;
    private tables;
    constructor(idb: IDBFactory, db: IDBDatabase, tables: {
        [key: string]: IDBObjectStore;
    });
    getTable(name: string): IndexedDbTable;
    delete(): void;
}
export default IndexedDbSdk;
