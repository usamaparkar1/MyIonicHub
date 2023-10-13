import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DbService {

    private _userSqliteConnection: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
    private _dbNameVersionDict: Map<string, number> = new Map();
    private _userDb!: SQLiteDBConnection;

    constructor() { }


    set(dbName: string, version: number) {
        this._dbNameVersionDict.set(dbName, version);
    }

    getVersion(dbName: string) {
        if (this._dbNameVersionDict.has(dbName)) {
            return this._dbNameVersionDict.get(dbName);
        } else {
            return -1;
        }
    }
}
