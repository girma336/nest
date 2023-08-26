import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    signup(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signup(authCredentialsDto)
    }

    @Post('/signin')
    signin(@Body() authCredentialsDto: AuthCredentialsDto): Promise<Object> {
        return this.authService.signin(authCredentialsDto)
    }



    @Post('forgot-password')
    async forgotPassword(@Body('email') email: string): Promise<Object> {
      return  await this.authService.sendPasswordResetEmail(email);
    }

    @Post('reset-password')
    async resetPassword(
        @Body('token') token: string,
        @Body('newPassword') newPassword: string,
    ): Promise<void> {
        await this.authService.resetPassword(token, newPassword);
    }
}
