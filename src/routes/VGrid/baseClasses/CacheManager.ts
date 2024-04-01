export default class CacheManager {
  private db: IDBDatabase | null = null;

  constructor(private dbName: string, private objectStoreName: string) {
    this.initialize();
  }

  private initialize = async (): Promise<void> => {
    this.db = await this.openDatabase();
  };

  private openDatabase = async (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, 1);

      request.onerror = (event: any) => {
        console.error('Error opening database:', event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = (event: any) => {
        resolve(event.target.result);
      };

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.objectStoreName)) {
          db.createObjectStore(this.objectStoreName, { keyPath: 'id' });
        }
      };
    });
  };

  set = (key: string, value: any): void => {
    if (!this.db) return;
    const transaction = this.db.transaction(this.objectStoreName, 'readwrite');
    const store = transaction.objectStore(this.objectStoreName);
    store.put({ id: key, data: value });
  };

  get = async (key: string): Promise<unknown> => {
    if (!this.db) return null;
    const transaction = this.db.transaction(this.objectStoreName, 'readonly');
    const store = transaction.objectStore(this.objectStoreName);
    const request = store.get(key);
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        const result = event.target.result;
        resolve(result ? result.data : null);
      };
      request.onerror = (event: any) => {
        reject(event.target.error);
      };
    });
  };
}
