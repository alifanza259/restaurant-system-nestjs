import { Controller, Get, Post } from "@nestjs/common";

@Controller("foods")
export class FoodController {
    constructor() { }
    @Get()
    getFoods() {

    }

    @Post("order")
    orderFood() {

    }
}