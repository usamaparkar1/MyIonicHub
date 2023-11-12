export const UserHelpers = {
    userDataKey: "userDataKey",
    MinLengthForUserName: 6,
    MaxLengthForUserName: 20,
    MinLengthForPassword: 6,
    MaxLengthForPassword: 20,
	usersApiRoute: 'users',
    UserTable: 'Users',
    Columns: {
        AccountId: {
            Name: 'accountId',
        },
        Username: {
            Name: 'username',
        },
        Password: {
            Name: 'password',
        },
        Salt: {
            Name: 'salt',
        }
    }
}