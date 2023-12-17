import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { OrderFoodDto } from "./dto";

@Injectable()
export class FoodService {
    constructor(private prismaService: PrismaService) { }
    getFoods() {
        return this.prismaService.food.findMany()
    }

    async orderFood(userId: number, orderFoodDto: OrderFoodDto) {
        // TODO: create transaction/order table
        const order = orderFoodDto.order

        const foodIds = order.map(o => o.foodId)
        const foods = await this.prismaService.food.findMany({
            where: {
                id: {
                    in: foodIds
                }
            }
        });

        // Can be optimized
        let accumulativePrice = 0;
        foods.map(f => {
            const qty = order.find(o => o.foodId === f.id).qty
            const totalPrice = qty * f.price;
            accumulativePrice += totalPrice
            return {
                name: f.name,
                price: f.price,
                qty,
                totalPrice
            }
        })

        // TODO: Use orderId for payments, store order, setup webhook when payment success
        return {
            orderId: Math.floor(Math.random() * 10000),
            totalPrice: accumulativePrice
        }
    }
}