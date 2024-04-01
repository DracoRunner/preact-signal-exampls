const DB_STORES = ['homeGridStore'];

class DBUtils {
  private readonly dbName = 'appDB';
  db: IDBDatabase | null;

  initialize = () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, 1);

      request.onerror = (event: any) => {
        console.error('Error opening database:', event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        DB_STORES.forEach((store) => {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store, { keyPath: 'id' });
          }
        });
      };
    });
  };
}

export default new DBUtils();
