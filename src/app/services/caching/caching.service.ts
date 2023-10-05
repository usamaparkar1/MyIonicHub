import { localHelpers } from 'src/app/helpers/local-helpers';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

// Expire time in seconds
const TTL = localHelpers.apiCacheExpiryTime * 60;
// Key to identify only cached API data
const CACHE_KEY = localHelpers.cacheKey+environment.server;

@Injectable({
    providedIn: 'root'
})

export class CachingService {

    constructor(private storage: Storage) { }

    // Store request data
    cacheRequest(url: string, data: any): Promise<any> {
        const validUntil = (new Date().getTime()) + TTL * 1000;
        url = `${CACHE_KEY}${url}`;

        return this.storage.set(url, {validUntil, data});
    }

    // Try to load cached data
    async getCachedRequest(url: string): Promise<any> {
        const currentTime = new Date().getTime();
        url = `${CACHE_KEY}${url}`;

        const storedValue = await this.storage.get(url);


        if (!storedValue) {
            return null;
        } else if (storedValue.validUntil < currentTime) {
            await this.storage.remove(url);
            return null;
        } else {
            return storedValue.data;
        }
    }

    // Remove all cached data & files
    async clearCachedData() {
        const keys = await this.storage.keys();

        keys.map(async key => {
        if (key.startsWith(CACHE_KEY)) {
            await this.storage.remove(key);
        }
        });
    }

    // Example to remove one cached URL
    async invalidateCacheEntry(url: string) {
        url = `${CACHE_KEY}${url}`;
        await this.storage.remove(url);
    }
}