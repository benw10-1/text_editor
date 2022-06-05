import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const jate = await openDB('jate', 1);
  const tx = jate.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const res = await store.put({ content, id: 1 });
};

export const getDb = async () => {
  const jate = await openDB('jate', 1);
  const tx = jate.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const res = await store.get(1);

  return res?.value;
};

initdb();
