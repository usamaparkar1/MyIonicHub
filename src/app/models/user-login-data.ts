export class UserLoginData implements IUserLoginData {
    username: string;
    password: string;

    constructor(userLoginData: UserLoginData) {
    	this.username = userLoginData.username;
        this.password = userLoginData.password;
  	}
}

export interface IUserLoginData {
    username: string;
    password: string;
}