import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { LoginUserDto, RegisterUserDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt'
import { AuthService } from "src/auth/auth.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService, private authService: AuthService, private configService: ConfigService) { }
    async registerUser(registerUserDto: RegisterUserDto) {
        const existingUser = await this.prismaService.user.findFirst({
            where: {
                email: registerUserDto.email
            }
        })
        if (existingUser) throw new BadRequestException("email already used");

        const passwordHash = await bcrypt.hash(registerUserDto.password, 10)
        const user = await this.prismaService.user.create({
            data: {
                email: registerUserDto.email,
                firstName: registerUserDto.firstName,
                lastName: registerUserDto.lastName,
                passwordHash
            }
        })

        // TODO: Send Email Verification

        return user;
    }

    async loginUser(loginUserDto: LoginUserDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: loginUserDto.email
            }
        });
        if (!user) throw new ForbiddenException("invalid credentials")

        const correctPassword = await bcrypt.compare(loginUserDto.password, user.passwordHash)
        if (!correctPassword) throw new ForbiddenException("invalid credentials")

        const accessToken = await this.authService.createAccessToken({ sub: user.id, iss: "USER" }, this.configService.get("JWT_SECRET_USER"))

        delete user.passwordHash;
        return { user, accessToken }
    }
}