export class PasswordHash implements IPasswordHash {
    passwordHashString: string;
    passwordSaltString: string;

    constructor(passwordHash: PasswordHash) {
        this.passwordHashString = passwordHash.passwordHashString;
        this.passwordSaltString = passwordHash.passwordSaltString;
    }
}

export interface IPasswordHash {
    passwordHashString: string;
    passwordSaltString: string;
}