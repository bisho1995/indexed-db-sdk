// @ts-ignore
export const isIndexedDbSupported = (): boolean =>
  !!window['indexedDB'] ||
  // @ts-ignore
  !!window['mozIndexedDB'] ||
  // @ts-ignore
  !!window['webkitIndexedDB'] ||
  // @ts-ignore
  !!window['msIndexedDB'];

export const getIndexedDb = (): IDBFactory =>
  window.indexedDB ||
  // @ts-ignore
  window.mozIndexedDB ||
  // @ts-ignore
  window.webkitIndexedDB ||
  // @ts-ignore
  window.msIndexedDB;

export const getIndexedDbTransaction = () =>
  window.IDBTransaction ||
  // @ts-ignore
  window.webkitIDBTransaction ||
  // @ts-ignore
  window.msIDBTransaction;

export const getIndexedDbKeyRange = (): IDBKeyRange =>
  // @ts-ignore
  window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
