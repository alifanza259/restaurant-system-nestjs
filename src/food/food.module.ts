import { Module } from "@nestjs/common";
import { FoodController } from "./food.controller";
import { FoodService } from "./food.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [AuthModule],
    controllers: [FoodController],
    providers: [FoodService]
})
export class FoodModule { }