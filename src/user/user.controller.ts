import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "@prisma/client";

@Controller('/api/auth')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('register')
    async register(@Body() CreateUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(CreateUserDto);
    }
}