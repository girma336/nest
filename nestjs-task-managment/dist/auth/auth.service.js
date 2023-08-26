"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
let AuthService = exports.AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async signup(authCredentialsDto) {
        const { email, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.usersRepository.create({ email, password: hashedPassword });
        try {
            await this.usersRepository.save(user);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Username alredy exist');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async signin(authCredentialsDto) {
        const { email, password } = authCredentialsDto;
        const user = await this.usersRepository.findOneBy({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { email };
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken };
        }
        else {
            throw new common_1.UnauthorizedException('Please check your login credential');
        }
    }
    async sendPasswordResetEmail(email) {
        const user = await this.usersRepository.findOneBy({ email });
        if (!user) {
            throw new common_1.NotFoundException(`User not found`);
        }
        const accessToken = await this.jwtService.sign({ userId: user.id }, { expiresIn: '1h' });
        return { accessToken };
    }
    async resetPassword(token, newPassword) {
        const decodedToken = this.jwtService.verify(token);
        console.log(decodedToken);
        const user = await this.usersRepository.findOneBy(decodedToken.id);
        console.log(user);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        console.log(newPassword);
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        console.log("hash new pass", hashedPassword, "old password");
        user.password = hashedPassword;
        await this.usersRepository.save(user);
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map