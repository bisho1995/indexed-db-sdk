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
declare function indexedDbSdkFactory(config: Config): Promise<IndexedDbSdk>;
export default indexedDbSdkFactory;
