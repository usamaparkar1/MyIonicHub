import { cbMyContractsDbHelpers } from "src/app/projects/contract-booker/helpers/cb-my-contracts-db-helpers";

export const myContractsSchema = {
    databaseName: 'myContractsDb',
    toVersion: 1,
    statements: [
        `CREATE TABLE IF NOT EXISTS ${cbMyContractsDbHelpers.tableName} (
            ${cbMyContractsDbHelpers.Columns.Id.Name} varchar(256) NOT NULL PRIMARY KEY,
            ${cbMyContractsDbHelpers.Columns.State.Name} varchar(256),
            ${cbMyContractsDbHelpers.Columns.City.Name} varchar(256),
            ${cbMyContractsDbHelpers.Columns.PostCode.Name} varchar(256),
            ${cbMyContractsDbHelpers.Columns.IsPrivateCustomer.Name} varchar(256),
            ${cbMyContractsDbHelpers.Columns.Company.Name} varchar(256),
            ${cbMyContractsDbHelpers.Columns.IsSigned.Name} boolean,
            ${cbMyContractsDbHelpers.Columns.CurrentRoute.Name} varchar(256),
            ${cbMyContractsDbHelpers.Columns.SelectedSectorId.Name} varchar(256),
            ${cbMyContractsDbHelpers.Columns.SelectedSectorName.Name} varchar(256),
            ${cbMyContractsDbHelpers.Columns.SelectedProductId.Name} varchar(256),
            ${cbMyContractsDbHelpers.Columns.SelectedProductName.Name} varchar(256),
            ${cbMyContractsDbHelpers.Columns.ConsumptionPerYearEtHt.Name} integer,
            ${cbMyContractsDbHelpers.Columns.ConsumptionPerYearNt.Name} integer,
            ${cbMyContractsDbHelpers.Columns.PricePerConsumption.Name} integer,
            ${cbMyContractsDbHelpers.Columns.ContractSignature.Name} varchar(256)
        );`,
    ]
};