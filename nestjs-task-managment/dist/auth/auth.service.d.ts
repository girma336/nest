import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    signup(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signin(authCredentialsDto: AuthCredentialsDto): Promise<Object>;
    sendPasswordResetEmail(email: string): Promise<{
        accessToken: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<void>;
}
