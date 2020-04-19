import indexedDbSdkFactory from './index';

const config = {
  dbName: 'NotesApp',
  dbVersion: 1,
  tables: [{ name: 'note', primaryKey: 'timestamp' }],
};

indexedDbSdkFactory(config).then((db) => {
  const noteTable = db.getTable('note');

  noteTable
    .insert({ timestamp: Date.now(), value: 'note 1' })
    .then(() => noteTable.get())
    .then(console.log);
});
