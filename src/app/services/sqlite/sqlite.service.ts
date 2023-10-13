import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection, capSQLiteSet, capSQLiteChanges, capSQLiteValues, capEchoResult, capSQLiteResult, capNCDatabasePathResult, CapacitorSQLitePlugin } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SqliteService {

    private _sqlitePlugin!: CapacitorSQLitePlugin;
    private _sqliteConnection!: SQLiteConnection;
    private _isNative: boolean | undefined;
    private _platform: string | undefined;

    constructor() { }

    get platform() {
        return this._platform;
    }

    get sqliteConnection() {
        return this._sqliteConnection;
    }

    get isNative(): boolean {
        return this._platform === 'android' || this._platform === 'ios';
    }

    get isWeb(): boolean {
        return this._platform === 'web';
    }

    /**
     * Plugin Initialization
    */
    initializePlugin(): Promise<boolean> {
        return new Promise (resolve => {
            this._platform = Capacitor.getPlatform();
            this._isNative = this.isNative;

            this._sqlitePlugin = CapacitorSQLite;
            this._sqliteConnection = new SQLiteConnection(this._sqlitePlugin);
            resolve(true);
        });
    }

    /**
     * Echo a value
     * @param value 
    */
    async echo(value: string): Promise<capEchoResult> {
        if (this._sqliteConnection != null) {
            try {
                const ret = await this._sqliteConnection.echo(value);
                return Promise.resolve(ret);
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error("no connection open"));
        }
    }

    async isSecretStored(): Promise<capSQLiteResult> {
        if (!this._isNative) {
            return Promise.reject(new Error(`Not implemented for ${this._platform} platform`));
        }

        if (this._sqliteConnection != null) {
            try {
                return Promise.resolve(await this._sqliteConnection.isSecretStored());
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }
    }

    async setEncryptionSecret(passphrase: string): Promise<void> {
        if (!this._isNative) {
            return Promise.reject(new Error(`Not implemented for ${this._platform} platform`));
        }

        if (this._sqliteConnection != null) {
            try {
                return Promise.resolve(await this._sqliteConnection.setEncryptionSecret(passphrase));
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }

    }

    async changeEncryptionSecret(passphrase: string, oldpassphrase: string): Promise<void> {
        if (!this._isNative) {
            return Promise.reject(new Error(`Not implemented for ${this._platform} platform`));
        }

        if (this._sqliteConnection != null) {
            try {
                return Promise.resolve(await this._sqliteConnection.changeEncryptionSecret(passphrase, oldpassphrase));
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }

    }

    /**
     * addUpgradeStatement
     * @param database
     * @param toVersion
     * @param statements
    */
    async addUpgradeStatement(database: string, toVersion: number, statements: string[]): Promise<void> {
        if (this._sqliteConnection !== null) {
            try {
                await this._sqliteConnection.addUpgradeStatement(database, toVersion, statements);
                return Promise.resolve();
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open for ${database}`));
        }
    }

    /**
     * get a non-conformed database path
     * @param path
     * @param database
     * @returns Promise<capNCDatabasePathResult>
     * @since 3.3.3-1
    */
    async getNCDatabasePath(folderPath: string, database: string): Promise<capNCDatabasePathResult> {
        if (this._sqliteConnection != null) {
            try {
                const res: capNCDatabasePathResult = await this._sqliteConnection.getNCDatabasePath(
                                                        folderPath, database);
                return Promise.resolve(res);
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open for ${database}`));
        }

    }

    /**
     * Create a non-conformed database connection
     * @param databasePath
     * @param version
     * @returns Promise<SQLiteDBConnection>
     * @since 3.3.3-1
    */
    async createNCConnection(databasePath: string, version: number): Promise<SQLiteDBConnection> {
        if (this._sqliteConnection != null) {
            try {
                const db: SQLiteDBConnection = await this._sqliteConnection.createNCConnection(
                                databasePath, version);
                if (db != null) {
                    return Promise.resolve(db);
                } else {
                    return Promise.reject(new Error(`no db returned is null`));
                }
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open for ${databasePath}`));
        }
        
    }

    /**
     * Close a non-conformed database connection
     * @param databasePath
     * @returns Promise<void>
     * @since 3.3.3-1
    */
    async closeNCConnection(databasePath: string): Promise<void> {
        if (this._sqliteConnection != null) {
            try {
                await this._sqliteConnection.closeNCConnection(databasePath);
                return Promise.resolve();
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open for ${databasePath}`));
        }
    }

    /**
     * Check if a non-conformed databaseconnection exists
     * @param databasePath
     * @returns Promise<capSQLiteResult>
     * @since 3.3.3-1
    */
    async isNCConnection(databasePath: string): Promise<capSQLiteResult> {
        if (this._sqliteConnection != null) {
            try {
                return Promise.resolve(await this._sqliteConnection.isNCConnection(databasePath));
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }
            
    }

    /**
     * Retrieve a non-conformed database connection
     * @param databasePath
     * @returns Promise<SQLiteDBConnection>
     * @since 3.3.3-1
    */
    async retrieveNCConnection(databasePath: string): Promise<SQLiteDBConnection> {
        if (this._sqliteConnection != null) {
            try {
                return Promise.resolve(await this._sqliteConnection.retrieveNCConnection(databasePath));
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open for ${databasePath}`));
        }
    }

    /**
     * Check if a non conformed database exists
     * @param databasePath
     * @returns Promise<capSQLiteResult>
     * @since 3.3.3-1
    */
    async isNCDatabase(databasePath: string): Promise<capSQLiteResult> {
        if (this._sqliteConnection != null) {
            try {
                return Promise.resolve(await this._sqliteConnection.isNCDatabase(databasePath));
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }
    }

    /**
     * Create a connection to a database
     * @param database 
     * @param encrypted 
     * @param mode 
     * @param version 
    */
    async createConnection(database:string, encrypted: boolean,
                           mode: string, version: number
                           ): Promise<SQLiteDBConnection> {
        if (this._sqliteConnection != null) {
            try {
                /* if (encrypted) {
                    if (this._isNative) {
                        const isSet = await this._sqliteConnection.isSecretStored()
                        if (!isSet.result) {
                            return Promise.reject(new Error(`no secret phrase registered`));
                        }
                    }
                } */
               const db: SQLiteDBConnection = await this._sqliteConnection.createConnection(database, encrypted, mode, version, false);
                if (db != null) {
                    return Promise.resolve(db);
                } else {
                    return Promise.reject(new Error(`no db returned is null`));
                }
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open for ${database}`));
        }
    }

    /**
     * Close a connection to a database
     * @param database 
    */
    async closeConnection(database:string): Promise<void> {
        if (this._sqliteConnection != null) {
            try {
                await this._sqliteConnection.closeConnection(database, false);
                return Promise.resolve();
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open for ${database}`));
        }
    }

    /**
     * Retrieve an existing connection to a database
     * @param database 
    */
    async retrieveConnection(database:string): 
            Promise<SQLiteDBConnection> {
        if (this._sqliteConnection != null) {
            try {
                return Promise.resolve(await this._sqliteConnection.retrieveConnection(database, false));
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open for ${database}`));
        }
    }

    /**
     * Retrieve all existing connections
    */
    async retrieveAllConnections(): 
                    Promise<Map<string, SQLiteDBConnection>> {
        if (this._sqliteConnection != null) {
            try {
                const myConns =  await this._sqliteConnection.retrieveAllConnections();
                /* let keys = [...myConns.keys()];
                keys.forEach( (value) => {
                    "Connection:" + value;
                }); */
                return Promise.resolve(myConns);
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }               
    }

    /**
     * Close all existing connections
    */
    async closeAllConnections(): Promise<void> {
        if (this._sqliteConnection != null) {
            try {
                return Promise.resolve(await this._sqliteConnection.closeAllConnections());
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }
    }

    /**
     * Check if connection exists
     * @param database 
    */
    async isConnection(database: string): Promise<capSQLiteResult> {
        if (this._sqliteConnection != null) {
            try {
                return Promise.resolve(await this._sqliteConnection.isConnection(database, false));
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }
    }

    /**
     * Check Connections Consistency
     * @returns 
    */
    async checkConnectionsConsistency(): Promise<capSQLiteResult> {
        if (this._sqliteConnection != null) {
            try {
                const res = await this._sqliteConnection.checkConnectionsConsistency();
                return Promise.resolve(res);
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }
    }

    /**
     * Check if database exists
     * @param database 
    */
    async isDatabase(database: string): Promise<capSQLiteResult> {
        if (this._sqliteConnection != null) {
            try {
                return Promise.resolve(await this._sqliteConnection.isDatabase(database));
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }
    }

    /**
     * Get the list of databases
    */    
    async getDatabaseList() : Promise<capSQLiteValues> {
        if (this._sqliteConnection != null) {
            try {
                return Promise.resolve(await this._sqliteConnection.getDatabaseList());
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }
    }

    /**
     * Get Migratable databases List
    */    
    async getMigratableDbList(folderPath?: string): Promise<capSQLiteValues>{
        if (!this._isNative) {
            return Promise.reject(new Error(`Not implemented for ${this._platform} platform`));
        }

        if (this._sqliteConnection != null) {
            try {
                if (!folderPath || folderPath.length === 0) {
                    return Promise.reject(new Error(`You must provide a folder path`));
                }
                return Promise.resolve(await this._sqliteConnection.getMigratableDbList(folderPath));
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }
    }
    
    /**
     * Add "SQLite" suffix to old database's names
    */    
    async addSQLiteSuffix(folderPath?: string, dbNameList?: string[]): Promise<void>{
        if (!this._isNative) {
            return Promise.reject(new Error(`Not implemented for ${this._platform} platform`));
        }

        if (this._sqliteConnection != null) {
            try {
                const path: string = folderPath ? folderPath : "default";
                const dbList: string[] = dbNameList ? dbNameList : [];
                return Promise.resolve(await this._sqliteConnection.addSQLiteSuffix(path, dbList));
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }
    }

    /**
     * Delete old databases
    */    
    async deleteOldDatabases(folderPath?: string, dbNameList?: string[]): Promise<void>{
        if (!this._isNative) {
            return Promise.reject(new Error(`Not implemented for ${this._platform} platform`));
        }

        if (this._sqliteConnection != null) {
            try {
                const path: string = folderPath ? folderPath : "default";
                const dbList: string[] = dbNameList ? dbNameList : [];
                return Promise.resolve(await this._sqliteConnection.deleteOldDatabases(path, dbList));
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }
    }

    /**
     * Import from a Json Object
     * @param jsonstring 
    */
    async importFromJson(jsonstring:string): Promise<capSQLiteChanges> {
        if (this._sqliteConnection != null) {
            try {
                return Promise.resolve(await this._sqliteConnection.importFromJson(jsonstring));
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }
                    
    }

    /**
     * Is Json Object Valid
     * @param jsonstring Check the validity of a given Json Object
    */

    async isJsonValid(jsonstring:string): Promise<capSQLiteResult> {
        if (this._sqliteConnection != null) {
            try {
                return Promise.resolve(await this._sqliteConnection.isJsonValid(jsonstring));
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }

    }

    /**
     * Copy databases from public/assets/databases folder to application databases folder
    */
    async copyFromAssets(overwrite?: boolean): Promise<void> { 
        const mOverwrite: boolean = overwrite != null ? overwrite : true;
        if (this._sqliteConnection != null) {
            try {
                return Promise.resolve(await this._sqliteConnection.copyFromAssets(mOverwrite));
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }
    }

    /**
     * Initialize the Web store
     * @param database 
    */
    async initWebStore(): Promise<void> {
        if (this._platform !== 'web')  {
            return Promise.reject(new Error(`not implemented for this platform: ${this._platform}`));
        }

        if (this._sqliteConnection != null) {
            try {
                await this._sqliteConnection.initWebStore();
                return Promise.resolve();
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open`));
        }
    }

    /**
     * Save a database to store
     * @param database 
    */
    async saveToStore(database:string): Promise<void> {
        if (this._platform !== 'web')  {
            return Promise.reject(new Error(`not implemented for this platform: ${this._platform}`));
        }

        if (this._sqliteConnection != null) {
            try {
                await this._sqliteConnection.saveToStore(database);
                return Promise.resolve();
            } catch (error) {
                return Promise.reject(new Error(JSON.stringify(error)));
            }
        } else {
            return Promise.reject(new Error(`no connection open for ${database}`));
        }
    }

    async openDatabase(dbName:string, encrypted: boolean, mode: string, version: number, readonly: boolean): Promise<SQLiteDBConnection> {
        let db: SQLiteDBConnection;
        
        const retCC = (await this._sqliteConnection.checkConnectionsConsistency()).result;
        
        let isConn = (await this._sqliteConnection.isConnection(dbName, readonly)).result;
        
        if (retCC && isConn) {
            db = await this._sqliteConnection.retrieveConnection(dbName, readonly);
        } else {
            db = await this._sqliteConnection.createConnection(dbName, encrypted, mode, version, readonly);
        }

        await db.open();

        return db;
    }

    async isInConfigEncryption(): Promise<capSQLiteResult> {
        return await this.sqliteConnection.isInConfigEncryption();
    }

    async isDatabaseEncrypted(database: string): Promise<capSQLiteResult> {
        let result: capSQLiteResult = { result: false };

        const isDB = (await this.sqliteConnection.isDatabase(database)).result;
        
        if (!isDB) {
            return result;
        }
        
        return await this.sqliteConnection.isDatabaseEncrypted(database);
    }
     
    async save(mDb: SQLiteDBConnection, table: string, mObj: any, where?: any): Promise<void> {
        const isUpdate: boolean = where ? true : false;

        const keys: string[] = Object.keys(mObj);

        let stmt: string = '';

        let values: any[] = [];

        for (const key of keys) {
            values.push(mObj[key]);
        }

        if (!isUpdate) {
            // INSERT
            const qMarks: string[] = [];

            for (const key of keys) {
                qMarks.push('?');
            }
            stmt = `INSERT INTO ${table} (${keys.toString()}) VALUES (${qMarks.toString()});`;
        } else {
            // UPDATE
            const wKey: string = Object.keys(where)[0];
    
            const setString: string = await this.setNameForUpdate(keys);
            if (setString.length === 0) {
                return Promise.reject(`save: update no SET`);
            }
            
            stmt = `UPDATE ${table} SET ${setString} WHERE ${wKey}="${where[wKey]}"`;
        }

        const ret = await mDb.run(stmt,values);
        
        if (ret.changes!.changes != 1) {
            return Promise.reject(`save: insert changes != 1`);
        }
        return;
    }

    /**
    * SetNameForUpdate
    * @param names
    */
    private async setNameForUpdate(names: string[]): Promise<string> {
        let retString = '';
    
        for (const name of names) {
            retString += `${name} = ? ,`;
        }
    
        if (retString.length > 1) {
            retString = retString.slice(0, -1);
            return retString;
        } else {
            return Promise.reject('SetNameForUpdate: length = 0');
        }
    }
}
