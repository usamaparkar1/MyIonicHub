export const storageSchema = {
    databaseName: 'storageDb',
    toVersion: 1,
    statements: [
        `CREATE TABLE IF NOT EXISTS storage (
            keyName varchar(20) NOT NULL PRIMARY KEY,
            value varchar(255)
        );`,
    ]
};