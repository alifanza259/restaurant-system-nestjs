import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AuthModule } from "src/auth/auth.module";
import { AWSModule } from "src/aws/aws.module";

@Module({
    controllers: [AdminController],
    providers: [AdminService],
    imports: [AuthModule, AWSModule]
})
export class AdminModule { }