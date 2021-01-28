import { Injectable } from '@angular/core';

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
  }
}
