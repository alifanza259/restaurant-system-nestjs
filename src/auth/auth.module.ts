import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({})],
    exports: [AuthService, JwtService],
    providers: [AuthService, JwtService],
})
export class AuthModule { }