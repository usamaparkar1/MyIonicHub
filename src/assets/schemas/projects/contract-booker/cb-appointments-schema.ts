import { cbAppointmentsDbHelpers } from "src/app/projects/contract-booker/helpers/cb-appointments-db-helpers";

export const cbAppointmentsSchemas = {
    databaseName: 'appointmentsDb',
    toVersion: 1,
    statements: [
        `CREATE TABLE IF NOT EXISTS ${cbAppointmentsDbHelpers.tableName} (
            ${cbAppointmentsDbHelpers.Columns.Id.Name} varchar(256) NOT NULL PRIMARY KEY,
            ${cbAppointmentsDbHelpers.Columns.Title.Name} varchar(256),
            ${cbAppointmentsDbHelpers.Columns.Description.Name} varchar(256),
            ${cbAppointmentsDbHelpers.Columns.Date.Name} varchar(256),
            ${cbAppointmentsDbHelpers.Columns.Time.Name} varchar(256),
            ${cbAppointmentsDbHelpers.Columns.State.Name} varchar(256),
            ${cbAppointmentsDbHelpers.Columns.City.Name} varchar(256),
            ${cbAppointmentsDbHelpers.Columns.PostCode.Name} varchar(256)
        );`,
    ]
};