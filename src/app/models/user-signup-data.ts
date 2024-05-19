export class UserSignupData implements IUserSignupData {
    username: string;
    password: string;
    confirmPassword: string;

    constructor(userSignupData: UserSignupData) {
    	this.username = userSignupData.username;
        this.password = userSignupData.password;
        this.confirmPassword = userSignupData?.confirmPassword;
  	}
}

export interface IUserSignupData {
    username: string;
    password: string;
    confirmPassword: string;
}