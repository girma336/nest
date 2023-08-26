import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
export declare class UsersRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    signup(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}
