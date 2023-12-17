import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
    controllers: [AdminController],
    providers: [AdminService],
    imports: [AuthModule]
})
export class AdminModule { }