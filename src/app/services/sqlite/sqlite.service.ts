import { CapacitorSQLite, CapacitorSQLitePlugin, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SqliteService {

  private _sqlitePlugin!: CapacitorSQLitePlugin;
  private _sqliteConnection!: SQLiteConnection;

  constructor() { }

  getSqliteConnection(): boolean {
    return !this._sqliteConnection;
  }
  
  async initialiseSqliteApp(isWeb: boolean) {
    await this.initialisePlugin().then(async (ret) => {
      try {
        if(isWeb) {
          await this.initWebStore();
        }
      } catch (error) {
        console.error(`initializeAppError: ${error}`);
      }
    });
  }

  async initialisePlugin(): Promise<boolean> {
    try {
      this._sqlitePlugin = CapacitorSQLite;
      this._sqliteConnection = new SQLiteConnection(this._sqlitePlugin);
      return true; 
    } catch (error) {
      console.error(error);
      return false;
    }
  }


  async initWebStore(): Promise<void> {
    try {
      await this._sqliteConnection.initWebStore();
    } catch(error: any) {
      const msg = error.message ? error.message : error;
      return Promise.reject(`initWebStore: ${error}`);
    }
  }
}
