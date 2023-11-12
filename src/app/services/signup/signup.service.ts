import { PasswordHash, PasswordHelperService } from '../password-helper/password-helper.service';
import { UserSignupData } from '../authentication/authentication.service';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { userSchema } from 'src/assets/schemas/user-schema';
import { UserHelpers } from 'src/app/helpers/user-helpers';
import { SqliteService } from '../sqlite/sqlite.service';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class SignupService {

    private _userDbConnection!: SQLiteDBConnection;

    constructor(
        private _sqliteService: SqliteService,
        private _passwordHelperService: PasswordHelperService
    ) { }

    setUserDbConnection(dbConnection: SQLiteDBConnection) {
        this._userDbConnection = dbConnection;
    }

    async createUserAccount(userSignupData: UserSignupData): Promise<UserCreationResponse> {
		return await new Promise(async (resolve, reject) => {
            const newUserAccountId = uuidv4();
			const query: string = `SELECT ${UserHelpers.Columns.AccountId.Name} FROM ${UserHelpers.UserTable} WHERE ${UserHelpers.Columns.AccountId.Name}="${newUserAccountId}";`;
            let accountsWithSameName = (await this._userDbConnection.query(query)).values;

			if (accountsWithSameName!.length === 0) {
				const passwordHash = this._passwordHelperService.createHashPassword(userSignupData.password as string);
				const success = await this.insertNewUserInDb(newUserAccountId, userSignupData.username, passwordHash);

                if (success) {
                    const userCreationResponse = {
                        userSignupData: userSignupData,
                        accountId: newUserAccountId,
                        passwordHash: passwordHash,
                        success: success
                    }
                    
                    resolve(userCreationResponse);
                }
			}

			reject(false);
        });
	}

	async insertNewUserInDb(newUserAccountId: string, username: string, hashResponse: PasswordHash) {
		try {
			const insertQuery: string = `INSERT INTO ${UserHelpers.UserTable} VALUES (
				"${newUserAccountId}",
				"${username}",
				"${hashResponse.passwordHashString}",
                "${hashResponse.passwordSaltString}"
			);`;

			let queryValues = (await this._userDbConnection.query(insertQuery)).values;
	
			if (this._sqliteService.isWeb) {
				await this._sqliteService.sqliteConnection.saveToStore(userSchema.databaseName);
			}
			return queryValues?.length === 0;	
		} catch (error) {
			return false;
		}
	}
}


export interface UserCreationResponse {
    userSignupData: UserSignupData;
    passwordHash: PasswordHash;
    accountId: string;
    success: boolean;
}