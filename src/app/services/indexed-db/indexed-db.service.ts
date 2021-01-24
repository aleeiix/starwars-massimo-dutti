import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Register } from './../../models/register.interface';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private readonly nameTableUsers = 'users';

  constructor() {}

  addUser(newUser: Register): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const connection: IDBOpenDBRequest = this.getConnection(reject);

      connection.onsuccess = (event: any) => {
        const db: IDBDatabase = event.target.result;

        this.createSchemaIfNotExist(db);

        const transaction = db.transaction(this.nameTableUsers, 'readwrite');

        const usersStore = transaction.objectStore(this.nameTableUsers);

        const requestUser = usersStore.get(newUser.email);

        requestUser.onsuccess = () => {
          if (requestUser.result) {
            reject('El email insertado ya existe');
          } else {
            const addUserRequest = usersStore.add(newUser);

            addUserRequest.onsuccess = () => {
              resolve(true);
            };

            addUserRequest.onerror = () => {
              reject('Error interno, pruebe mas tarde');
            };
          }
        };

        requestUser.onerror = () => {
          reject('Error interno, pruebe mas tarde');
        };

        db.close();
      };
    });
  }

  getUserByEmail(email: string): Promise<Register> {
    return new Promise((resolve, reject) => {
      const connection: IDBOpenDBRequest = this.getConnection(reject);

      connection.onsuccess = (event: any) => {
        const db: IDBDatabase = event.target.result;

        this.createSchemaIfNotExist(db);

        const transaction = db.transaction(this.nameTableUsers, 'readonly');

        const usersStore = transaction.objectStore(this.nameTableUsers);

        const requestUser = usersStore.get(email);

        requestUser.onsuccess = () => {
          resolve(requestUser.result);
        };

        requestUser.onerror = () => {
          reject('Error interno, pruebe mas tarde');
        };

        db.close();
      };
    });
  }

  private getConnection(reject): IDBOpenDBRequest {
    const connection = window.indexedDB.open(
      environment.local_db_name,
      environment.local_db_version
    );

    connection.onerror = () => {
      reject('Error interno, pruebe mas tarde');
    };

    connection.onupgradeneeded = (event: any) => {
      const db: IDBDatabase = event.target.result;

      this.createSchemaIfNotExist(db);
    };

    return connection;
  }

  private createSchemaIfNotExist(db: IDBDatabase): void {
    if (!db.objectStoreNames.contains(this.nameTableUsers)) {
      db.createObjectStore(this.nameTableUsers, {
        keyPath: 'email'
      });
    }
  }
}
