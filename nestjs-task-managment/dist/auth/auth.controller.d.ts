import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signin(authCredentialsDto: AuthCredentialsDto): Promise<Object>;
    forgotPassword(email: string): Promise<Object>;
    resetPassword(token: string, newPassword: string): Promise<void>;
}
