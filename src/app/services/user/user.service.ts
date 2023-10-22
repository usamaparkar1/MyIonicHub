import { CachingService } from 'src/app/services/caching/caching.service';
import { UserLoginData } from '../authentication/authentication.service';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { ApiService } from 'src/app/services/api/api.service';
import { userSchema } from 'src/assets/schemas/user-schema';
import { UserHelpers } from 'src/app/helpers/user-helpers';
import { SqliteService } from '../sqlite/sqlite.service';
import { DbService } from '../db/db.service';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs'
import { v4 as uuidv4 } from 'uuid';
import CryptoES from 'crypto-es';

@Injectable({
  providedIn: 'root'
})

export class UserService {

	private _userDbConnection!: SQLiteDBConnection;

	constructor(
		private _dbService: DbService,
		private _apiService: ApiService,
		private _sqliteService: SqliteService,
		private _cachingService: CachingService
	) {}

  	async getUserData(hasInternetAccess: boolean): Promise<UserModel> {
    	return await new Promise(async (resolve) => {
			let user: UserModel = new UserModel();

			if (hasInternetAccess) {
				const response = await firstValueFrom(await this._apiService.get(UserHelpers.usersApiRoute));

				if (response?.uid) {
					user.accountId = response.uid;
					await this._cachingService.cacheRequest(UserHelpers.userDataKey, user)
				}

				if (!user.accountId) {
					user = await this._cachingService.getCachedRequest(UserHelpers.userDataKey);  
				}
			} else {
				user = await this._cachingService.getCachedRequest(UserHelpers.userDataKey);
			}

			resolve(user);
    	});
  	}

	async initializeUserDatabase() {
		// create upgrade statements
        await this._sqliteService.addUpgradeStatement(userSchema.databaseName, userSchema.toVersion, userSchema.statements);

        // create and/or open the database
        await this.openDatabase();

        this._dbService.set(userSchema.databaseName, userSchema.toVersion);
        
        if (this._sqliteService.isWeb) {
            await this._sqliteService.sqliteConnection.saveToStore(userSchema.databaseName);
        }
	}

	async openDatabase(): Promise<void> {
        return await new Promise(async (resolve) => {
            if (this._sqliteService.isNative) {
                const isInConfigEncryption =(await this._sqliteService.isInConfigEncryption())?.result;
                const isDatabaseEncrypted = (await this._sqliteService.isDatabaseEncrypted(userSchema.databaseName))?.result;

                if (isInConfigEncryption && isDatabaseEncrypted) {
                    this._userDbConnection = await this._sqliteService.openDatabase(userSchema.databaseName, true, "secret", userSchema.toVersion, false);
                } else {
                    this._userDbConnection = await this._sqliteService.openDatabase(userSchema.databaseName, false, "no-encryption", userSchema.toVersion, false);
                }
            } else {
                this._userDbConnection = await this._sqliteService.openDatabase(userSchema.databaseName, false, "no-encryption", userSchema.toVersion, false);
            }

            resolve();
        });
    }

	async doesUserExists(userLoginData: UserLoginData): Promise<boolean> {
        return await new Promise(async (resolve) => {
			const query: string = `SELECT ${UserHelpers.Columns.Username.Name} from ${UserHelpers.UserTable} WHERE ${UserHelpers.Columns.Username.Name}="${userLoginData.username}"`;
            let queryValues = (await this._userDbConnection.query(query))?.values;

			if (queryValues!.length === 0) {
				resolve(false);
			}

			resolve(true);
        });
    }

	async isPasswordValid(password: string): Promise<boolean> {
        return await new Promise(async (resolve) => {
			const hashedPassword: string = this._createHashPassword(password);
			const query: string = `SELECT ${UserHelpers.Columns.Password.Name} from ${UserHelpers.UserTable} WHERE ${UserHelpers.Columns.Password.Name}="${hashedPassword}"`;
            let queryValues = (await this._userDbConnection.query(query))?.values;

			if (queryValues!.length === 0) {
				resolve(false);
			}

			resolve(true);
        });
    }

	/** @deprecated To be shifted to new SignupService later */
	async createUserAccount(userLoginData: UserLoginData): Promise<boolean> {
		return await new Promise(async (resolve) => {
			const newUserAccountId = uuidv4();
			const query: string = `SELECT ${UserHelpers.Columns.AccountId.Name} FROM ${UserHelpers.UserTable} WHERE ${UserHelpers.Columns.AccountId.Name}="${newUserAccountId}"`;
            let queryValues = (await this._userDbConnection.query(query)).values;

			if (queryValues!.length === 0) {
				const newPassword: string = this._createHashPassword(userLoginData.password as string);

				const success = await this.insertNewUserInDb(newUserAccountId, userLoginData, newPassword);
				
				resolve(success);
			}

			resolve(false);
        });
	}

	/** @deprecated To be shifted to new SignupService later */
	private _createHashPassword(password: string): string {
		const salt = CryptoES.lib.WordArray.random(128/8);
		const passwordHash = CryptoES.PBKDF2(password, salt.toString(), { keySize: 128/32, iterations: 10000 });

		return passwordHash?.toString();
	}

	/** @deprecated To be shifted to new SignupService later */
	async insertNewUserInDb(newUserAccountId: string, userLoginData: UserLoginData, password: string) {
		try {
			const insertQuery: string = `INSERT INTO ${UserHelpers.UserTable} VALUES (
				"${newUserAccountId}",
				"${userLoginData.username}",
				"${password}"
			)`;

			let queryValues = (await this._userDbConnection.query(insertQuery)).values;
	
			if (this._sqliteService.isWeb) {
				await this._sqliteService.sqliteConnection.saveToStore(userSchema.databaseName);
			}
			return queryValues?.length === 0;	
		} catch (error) {
			return false;
		}
	}

	/** @deprecated To be shifted to new SignupService later */
	async getAllUsers() {
		const getQuery: string = `SELECT * FROM ${UserHelpers.UserTable};`;
        let getQueryValues = (await this._userDbConnection.query(getQuery))?.values;
	}
}

export class UserModel implements IUserModel {
  	accountId: string | undefined;
	username: string | undefined;
	password: string | undefined;

  	constructor(userModel?: UserModel) {
    	this.accountId = userModel?.accountId;
		this.username = userModel?.username;
		this.password = userModel?.password;
  	}
}

export interface IUserModel {
	accountId: string | undefined;
	username: string | undefined;
	password: string | undefined;
}
