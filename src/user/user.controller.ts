import { Body, Controller, Get, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { LoginUserDto, RegisterUserDto } from "./dto";
import { GetUser } from "./decorator/user.decorator";
import { User } from "@prisma/client";
import { AuthGuard } from "src/auth/guard/auth.guard";

@Controller("users")
export class UserController {
    constructor(private userService: UserService) { }
    @UseGuards(AuthGuard)
    @SetMetadata('role', 'user')
    @Get("me")
    getMe(@GetUser() user: User) {
        return user
    }
    @Post("register")
    registerUser(@Body() registerUserDto: RegisterUserDto) {
        return this.userService.registerUser(registerUserDto)
    }
    @Post("login")
    signinUser(@Body() loginUserDto: LoginUserDto) {
        return this.userService.loginUser(loginUserDto)
    }
}