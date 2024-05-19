import { UserHelpers } from "src/app/helpers/user-helpers";

export const userSchema = {
    databaseName: 'UserDatabase',
    toVersion: 1,
    statements: [
        `CREATE TABLE IF NOT EXISTS ${UserHelpers.UserTable} (
            ${UserHelpers.Columns.AccountId.Name} varchar(20) NOT NULL PRIMARY KEY,
            ${UserHelpers.Columns.Username.Name} varchar(20) UNIQUE NOT NULL,
            ${UserHelpers.Columns.Password.Name} varchar(512) NOT NULL,
            ${UserHelpers.Columns.Salt.Name} varchar(32) NOT NULL,
            ${UserHelpers.Columns.Rights.Name} varchar(512) NOT NULL
        );`,
    ]
};