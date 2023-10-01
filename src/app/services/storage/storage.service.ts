import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor(private _storage: Storage) {}

  async setupStorage() {
    try {
      await this._storage.create();
      return await this._storage.driver;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async get(key: string): Promise<string> {
    return await new Promise(async (resolve, reject) => {
      try {
        const data = await this._storage.get(key);
        resolve(data);
      } catch (error) {
        console.error(error);
        reject(null);
      }
    });
  }

  async set(key: string, value: any): Promise<any> {
    return await new Promise(async (resolve, reject) => {
      try {
        await this._storage.set(key, JSON.stringify(value));
        resolve(true);
      } catch (error) {
        console.error(error);
        reject(null);
      }
    });
  }
}
