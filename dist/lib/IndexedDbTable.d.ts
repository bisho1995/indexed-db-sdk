declare class IndexedDbTable {
    private db;
    private name;
    constructor(db: IDBDatabase, name: string);
    private getObjectStoreAndTransaction;
    insert<T>(records: T | Array<T>): Promise<void>;
    update<T>(records: T | Array<T>): Promise<void>;
    remove(key: string): Promise<unknown>;
    get<T>(key?: string): Promise<T | object | Array<T> | Array<object>>;
}
export default IndexedDbTable;
