import { Controller, Get, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
    constructor(private adminService: AdminService) { }
    @Post("signin")
    signinAdmin() {
        return this.adminService.signinAdmin()
    }
}