import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private storage = new Map();

  constructor() {}

  getData<T>(key: string, id: string): T {
    const storageKey = this.storage.get(key);

    if (!storageKey) {
      return;
    }

    return storageKey[id];
  }

  saveData<T>(key: string, id: string, data: T): void {
    const storageKey = this.storage.get(key) || {};

    const newStorage = { ...storageKey, [id]: data };

    this.storage.set(key, newStorage);

    setTimeout(() => {
      this.removeData(key, id);
    }, environment.time_cache);
  }

  private removeData(key: string, id: string): void {
    const storageKey = this.storage.get(key);

    delete storageKey[id];
    this.storage.delete(key);

    if (Object.keys(storageKey).length > 0) {
      this.storage.set(key, storageKey);
    }
  }
}
