import { CbUserRights } from "../projects/contract-booker/enums/cb-user-rights";
import { UserRights } from "src/app/enum/user-rights";

export class UserModel implements IUserModel {
    accountId: string;
    username: string;
    password: string;
    salt: string;
    rights: Rights[];

    constructor(userModel: UserModel) {
        this.accountId = userModel.accountId;
        this.username = userModel.username;
        this.password = userModel.password;
        this.salt = userModel.salt;
        this.rights = userModel.rights;
    }
}

export interface IUserModel {
    accountId: string;
    username: string;
    password: string;
    salt: string;
    rights: Rights[];
}

export type Rights = UserRights | CbUserRights;