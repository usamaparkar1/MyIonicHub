import { Rights } from "./user";

export class SecureUserModel implements ISecureUserModel {
    accountId: string;
    username: string;
    salt: string;
    rights: Rights[];

    constructor(secureUserModel: SecureUserModel) {
        this.accountId = secureUserModel.accountId;
        this.username = secureUserModel.username;
        this.salt = secureUserModel.salt;
        this.rights = secureUserModel.rights;
    }
}

export interface ISecureUserModel {
    accountId: string;
    username: string;
    salt: string;
    rights: Rights[];
}