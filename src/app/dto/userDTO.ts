export class UserDto {
    email: String;
    password: String;

    constructor(username: string, password: string) {
        this.email = username;
        this.password = password;
    }
}
