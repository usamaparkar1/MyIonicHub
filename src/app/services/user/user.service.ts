import { UserLoginData, UserSignupData } from '../authentication/authentication.service';
import { PasswordHelperService } from '../password-helper/password-helper.service';
import { CachingService } from 'src/app/services/caching/caching.service';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { ApiService } from 'src/app/services/api/api.service';
import { userSchema } from 'src/assets/schemas/user-schema';
import { UserHelpers } from 'src/app/helpers/user-helpers';
import { SqliteService } from '../sqlite/sqlite.service';
import { DbService } from '../db/db.service';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class UserService {

	private _userDbConnection!: SQLiteDBConnection;

    get getUserDbConnection(): SQLiteDBConnection {
        return this._userDbConnection;
    }
    
	constructor(
		private _dbService: DbService,
		private _apiService: ApiService,
		private _sqliteService: SqliteService,
		private _cachingService: CachingService,
        private _passwordHelperService: PasswordHelperService
	) {}

    /** @deprecated This is just a test api function for caching api responses. This will be removed/changed. */
  	async getUserData(hasInternetAccess: boolean): Promise<any> {
    	return await new Promise(async (resolve) => {
			let user = {
                accountId: null
            };

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

	async doesUserExists(userLoginData: UserLoginData | UserSignupData): Promise<boolean> {
        return await new Promise(async (resolve) => {
			const query: string = `SELECT ${UserHelpers.Columns.Username.Name} from ${UserHelpers.UserTable} WHERE ${UserHelpers.Columns.Username.Name}="${userLoginData.username}"`;
            let queryValues = (await this._userDbConnection.query(query))?.values;

			if (queryValues!.length === 0) {
				resolve(false);
			}

			resolve(true);
        });
    }

    async authenticateUser(userModel: UserModel, password: string): Promise<boolean> {
        return await new Promise(async (resolve) => {
			const hashResponse = this._passwordHelperService.createHashPassword(password, userModel.salt);
			if (hashResponse.passwordHashString === userModel.password) {
                resolve(true);
			}

            resolve(false);
        });
    }

	async getAllUsers() {
		const getQuery: string = `SELECT * FROM ${UserHelpers.UserTable};`;
        return (await this._userDbConnection.query(getQuery))?.values;
	}

    async getUserDataOffline(username: string): Promise<UserModel> {
        return await new Promise(async (resolve, reject) => {
            const query: string = `SELECT * from ${UserHelpers.UserTable} WHERE ${UserHelpers.Columns.Username.Name}="${username}";`;
            let queryValues = (await this._userDbConnection.query(query))?.values;
            if (queryValues!.length === 0) {
                reject();
            }

            resolve(queryValues![0]);
        });
    }
}

export class UserModel implements IUserModel {
  	accountId: string;
	username: string;
	password: string;
    salt: string;

  	constructor(userModel: UserModel) {
    	this.accountId = userModel.accountId;
		this.username = userModel.username;
		this.password = userModel.password;
        this.salt = userModel.salt;
  	}
}

export interface IUserModel {
	accountId: string;
	username: string;
	password: string;
    salt: string;
}
