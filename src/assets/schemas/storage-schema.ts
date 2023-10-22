export const storageSchema = {
    databaseName: 'storageDb',
    toVersion: 1,
    statements: [
        `CREATE TABLE IF NOT EXISTS storage (
            key varchar(20) PRIMARY KEY NOT NULL,
            value varchar(10)
        );`,
    ]
};