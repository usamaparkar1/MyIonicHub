import { UserSignupData } from "./user-signup-data";
import { PasswordHash } from "./password-hash";

export interface UserCreationResponse {
    userSignupData: UserSignupData;
    passwordHash: PasswordHash;
    accountId: string;
    success: boolean;
}