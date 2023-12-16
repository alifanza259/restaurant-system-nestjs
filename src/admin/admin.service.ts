import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AdminService {
    constructor(private prismaService: PrismaService) { }
    async signinAdmin() {
        const test = await this.prismaService.user.findMany()
        console.log(test)
        return "OKJ"
    }
}