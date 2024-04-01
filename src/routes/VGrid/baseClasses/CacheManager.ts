import DBUtils from './DBUtils';

export default class CacheManager {
  private readonly objectStoreName = 'homeGridStore';

  set = (key: string, value: any): void => {
    if (!DBUtils.db) return;
    const transaction = DBUtils.db.transaction(this.objectStoreName, 'readwrite');
    const store = transaction.objectStore(this.objectStoreName);
    store.put({ id: key, data: value });
  };

  get = async (key: string): Promise<unknown> => {
    if (!DBUtils.db) return null;
    const transaction = DBUtils.db.transaction(this.objectStoreName, 'readonly');
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
