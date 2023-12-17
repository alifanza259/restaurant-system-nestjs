import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private configService: ConfigService) { }
    createAccessToken(payload: { sub: number, iss: string }, secret: string) {
        return this.jwtService.signAsync(payload, {
            secret,
            expiresIn: this.configService.get("JWT_TOKEN_EXPIRES")
        })
    }
}