# IndexedDB SDK

**[This is currently in beta version]**

This is a wrapper around indexedDB as indexedDB api is not trivial to use and for the most part we do not need full control of what the API provides.

If you are looking for a solution with a simple & intuitive API to use indexedDB then this is the right place.

## Usage

```
yarn add indexed-db-sdk
```

or 

```
npm add --save indexed-db-sdk
```

**Code Usage**

```
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

```
