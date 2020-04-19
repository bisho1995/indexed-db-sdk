export declare const isIndexedDbSupported: () => boolean;
export declare const getIndexedDb: () => IDBFactory;
export declare const getIndexedDbTransaction: () => {
    new (): IDBTransaction;
    prototype: IDBTransaction;
};
export declare const getIndexedDbKeyRange: () => IDBKeyRange;
