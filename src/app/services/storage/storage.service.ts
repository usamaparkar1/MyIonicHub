import { storageHelpers } from 'src/app/helpers/storageHelpers';
import { localHelpers } from 'src/app/helpers/local-helpers';
import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

    constructor(private _storage: Storage) {}

    async getCurrentStorageDriver(): Promise<string | null> {
        return await this._storage.driver;
    }

    async setupStorage() {
        try {
            await this._storage.create();
        } catch (error) {
            console.error(error);
        }
    }

    async get(key: string): Promise<any> {
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

    async isAppSetup(): Promise<boolean> {
        return (await this.get(localHelpers.isAppSetup)) === 'true';
    }

    async hasSeenIntro(): Promise<boolean> {
        return (await this.get(storageHelpers.introSeen)) === 'true';
    }
}
