import { Body, Controller, Get, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { FoodService } from "./food.service";
import { AuthGuard } from "src/auth/guard";
import { GetUser } from "src/user/decorator/user.decorator";
import { OrderFoodDto } from "./dto";

@Controller("foods")
export class FoodController {
    constructor(private foodService: FoodService) { }
    @Get()
    getFoods() {
        return this.foodService.getFoods()
    }

    @UseGuards(AuthGuard)
    @SetMetadata("role", "user")
    @Post("order")
    orderFood(@GetUser('id') userId: number, @Body() orderFoodDto: OrderFoodDto) {
        return this.foodService.orderFood(userId, orderFoodDto)
    }
}