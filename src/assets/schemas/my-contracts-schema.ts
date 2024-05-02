import { myContractsDbHelpers } from "src/app/helpers/my-contracts-db-helpers";

export const myContractsSchema = {
    databaseName: 'myContractsDb',
    toVersion: 1,
    statements: [
        `CREATE TABLE IF NOT EXISTS ${myContractsDbHelpers.tableName} (
            ${myContractsDbHelpers.Columns.Id.Name} varchar(256) NOT NULL PRIMARY KEY,
            ${myContractsDbHelpers.Columns.State.Name} varchar(256),
            ${myContractsDbHelpers.Columns.City.Name} varchar(256),
            ${myContractsDbHelpers.Columns.PostCode.Name} varchar(256),
            ${myContractsDbHelpers.Columns.IsPrivateCustomer.Name} varchar(256),
            ${myContractsDbHelpers.Columns.Company.Name} varchar(256),
            ${myContractsDbHelpers.Columns.IsSigned.Name} boolean,
            ${myContractsDbHelpers.Columns.CurrentRoute.Name} varchar(256),
            ${myContractsDbHelpers.Columns.SelectedSectorId.Name} varchar(256),
            ${myContractsDbHelpers.Columns.SelectedProductId.Name} varchar(256),
            ${myContractsDbHelpers.Columns.ConsumptionPerYearEtHt.Name} integer,
            ${myContractsDbHelpers.Columns.ConsumptionPerYearNt.Name} integer,
            ${myContractsDbHelpers.Columns.PricePerConsumption.Name} integer,
            ${myContractsDbHelpers.Columns.ContractSignature.Name} varchar(256)
        );`,
    ]
};