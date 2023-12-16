import { Controller, Post } from "@nestjs/common";

@Controller("users")
export class UserController {
    @Post("signin")
    signinUser() {
        return "Sign in User"
    }
}