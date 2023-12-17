import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AddFoodDto, AdminLoginDto, UpdateFoodDto } from "./dto";
import * as bcrypt from 'bcrypt'
import { AuthService } from "src/auth/auth.service";
import { ConfigService } from "@nestjs/config";
import { AWSService } from "src/aws/aws.service";

@Injectable()
export class AdminService {
    constructor(private prismaService: PrismaService, private authService: AuthService, private configService: ConfigService, private AWSService: AWSService) { }
    async loginAdmin(adminLoginDto: AdminLoginDto) {
        const admin = await this.prismaService.admin.findUnique({
            where: {
                email: adminLoginDto.email
            }
        })
        if (!admin) throw new ForbiddenException("invalid credentials")

        const passwordMatch = await bcrypt.compare(adminLoginDto.password, admin.passwordHash)
        if (!passwordMatch) throw new ForbiddenException("invalid credentials")

        const accessToken = await this.authService.createAccessToken({ sub: admin.id, iss: "ADMIN" }, this.configService.get("JWT_SECRET_ADMIN"))

        delete admin.passwordHash
        return {
            admin,
            accessToken
        }
    }

    getFoods() {
        return this.prismaService.food.findMany()
    }

    async addFood(addFoodDto: AddFoodDto, file: Express.Multer.File | null) {
        let imageUrl: string | null = null;
        if (file) {
            const res = await this.AWSService.uploadToS3(file)
            imageUrl = res.Location
        }

        const food = await this.prismaService.food.create({
            data: {
                ...addFoodDto,
                imageUrl
            }
        })

        return food;
    }
    async updateFoodById(foodId: number, updateFoodDto: UpdateFoodDto, file: Express.Multer.File | null) {
        let imageUrl: string | null = null;
        if (file) {
            const res = await this.AWSService.uploadToS3(file)
            imageUrl = res.Location
        }

        const updatedFood = await this.prismaService.food.update({
            where: {
                id: foodId
            },
            data: {
                ...updateFoodDto,
                ...(file ? { imageUrl } : {})
            }
        })

        return updatedFood;
    }

    deleteFoodById(foodId: number) {
        return this.prismaService.food.delete({
            where: {
                id: foodId
            }
        })
    }
}