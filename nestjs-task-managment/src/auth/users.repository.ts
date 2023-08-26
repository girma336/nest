import { DataSource, EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager())
    }
    async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { email, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = this.create({ email, password: hashedPassword })
        try {
            await this.save(user)

        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Username alredy exist')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }
}