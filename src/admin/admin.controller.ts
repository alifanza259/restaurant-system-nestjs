import { Body, Controller, Delete, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Patch, Post, SetMetadata, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AddFoodDto, AdminLoginDto, UpdateFoodDto } from "./dto";
import { AuthGuard } from "src/auth/guard";
import { GetAdmin, IsPublic } from "./decorator";
import { Admin } from "@prisma/client";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileSizeValidationPipe } from "./pipe";

@UseGuards(AuthGuard)
@SetMetadata("role", "admin")
@Controller("admin")
export class AdminController {
    constructor(private adminService: AdminService) { }

    @Get("me")
    getMe(@GetAdmin() admin: Admin) {
        return admin
    }

    @Post("login")
    @IsPublic()
    loginAdmin(@Body() adminLoginDto: AdminLoginDto) {
        return this.adminService.loginAdmin(adminLoginDto)
    }

    @Get("foods")
    getFoods() {
        return this.adminService.getFoods()
    }

    @Post("foods")
    @UseInterceptors(FileInterceptor('imageUrl'))
    addFood(@Body() addFoodDto: AddFoodDto, @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File) {
        return this.adminService.addFood(addFoodDto, file)
    }

    @Patch("foods/:id")
    @UseInterceptors(FileInterceptor('imageUrl'))
    updateFoodById(@Param('id', ParseIntPipe) foodId: number, @Body() updateFoodDto: UpdateFoodDto, @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File) {
        return this.adminService.updateFoodById(foodId, updateFoodDto, file)
    }

    @Delete("foods/:id")
    deleteFoodById(@Param('id') id: number) {
        return this.adminService.deleteFoodById(id)
    }
}