import { PasswordHash } from 'src/app/models/password-hash';
import { Injectable } from '@angular/core';
import CryptoES from 'crypto-es';

@Injectable({
  providedIn: 'root'
})
export class PasswordHelperService {

    constructor() { }

    /** @description Used to create a hashed password during login and signup. If no salt is provided it will be used to create a new passowrd hash */
    createHashPassword(password: string, passwordSaltString?: string): PasswordHash {
        if (!passwordSaltString) {
            const salt = CryptoES.lib.WordArray.random(128/8);
            passwordSaltString = salt.toString();
        }

        const passwordHashString = CryptoES.PBKDF2(password, passwordSaltString, { keySize: 128/32, iterations: 10000 }).toString();
        const newPasswordHashData = new PasswordHash({ passwordHashString: passwordHashString, passwordSaltString: passwordSaltString });

		return newPasswordHashData;
	}
}