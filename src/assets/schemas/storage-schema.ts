export const storageSchema = {
    databaseName: 'storageDb',
    toVersion: 1,
    statements: [
        `CREATE TABLE IF NOT EXISTS storage (
            keyName varchar(256) NOT NULL PRIMARY KEY,
            value varchar(16383)
        );`,
    ]
};