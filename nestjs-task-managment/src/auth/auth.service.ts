import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService) {}

    async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { email, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.usersRepository.create({ email, password: hashedPassword })
        try {
            await this.usersRepository.save(user)

        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Username alredy exist')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    async signin(authCredentialsDto: AuthCredentialsDto): Promise<Object> {
        const { email, password } = authCredentialsDto;
        const user = await this.usersRepository.findOneBy({ email })

        if(user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { email };
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken }
        }else {
            throw new UnauthorizedException('Please check your login credential')
        }
    }

    async sendPasswordResetEmail(email: string) {
        const user = await this.usersRepository.findOneBy({ email });

        if(!user) {
            throw new NotFoundException(`User not found`)
        }

        const accessToken = await this.jwtService.sign({ userId: user.id }, { expiresIn: '1h' });

        return { accessToken }
        
    }

    async resetPassword(token: string, newPassword: string): Promise<void> {
        const decodedToken = this.jwtService.verify(token);

        console.log(decodedToken)
        const user = await this.usersRepository.findOneBy(decodedToken.id);

        console.log(user)
        if (!user) {
          throw new NotFoundException('User not found');
        }
        console.log(newPassword)
        const salt = await bcrypt.genSalt()
        
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        // Update the user's password with the new password
        console.log("hash new pass", hashedPassword, "old password", )
        user.password = hashedPassword;
        await this.usersRepository.save(user);

      }
}
