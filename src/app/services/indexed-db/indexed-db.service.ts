import { Injectable } from '@angular/core';

import Dexie from 'dexie';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService extends Dexie {
  constructor() {
    super(environment.local_db_name);
    this.version(environment.local_db_version).stores({
      [environment.local_db_tale_users]: 'email'
    });
  }
}
