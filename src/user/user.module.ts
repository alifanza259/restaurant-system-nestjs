import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AuthModule } from "src/auth/auth.module";
import { AWSModule } from "src/aws/aws.module";

@Module({
    imports: [AuthModule, AWSModule],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule { }