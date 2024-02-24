export class UserDto {
    name: String;
    email: String;
    password: String;
    status: Boolean;

    constructor(
        name: string,
        username: string,
        password: string,
        status: boolean
    ) {
        this.email = username;
        this.name = name;
        this.password = password;
        this.status = status;
    }
}
