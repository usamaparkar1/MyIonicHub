import { CachingService } from '../caching/caching.service';
import { ApiService } from '../api/api.service';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

	constructor(private _apiService: ApiService, private _cachingService: CachingService) {}

  	async getUserData(hasInternetAccess: boolean): Promise<UserModel> {
    	return await new Promise(async (resolve) => {
			let user: UserModel = new UserModel();

			if (hasInternetAccess) {
				const response = await firstValueFrom(await this._apiService.get(UserHelpers.usersApiRoute));

				if (response?.uid) {
					user.userGuid = response.uid;
					await this._cachingService.cacheRequest(UserHelpers.userDataKey, user)
				}

				if (!user.userGuid) {
					user = await this._cachingService.getCachedRequest(UserHelpers.userDataKey);  
				}
			} else {
				user = await this._cachingService.getCachedRequest(UserHelpers.userDataKey);
			}

			resolve(user);
    	});
  	}
}

export class UserModel implements IUserModel {
  userGuid: string | undefined;

  constructor(userModel?: UserModel) {
    this.userGuid = undefined;
  }
}

export interface IUserModel {
  userGuid: string | undefined;
}

const UserHelpers = {
  userDataKey: "userDataKey",
  usersApiRoute: 'users'
}
