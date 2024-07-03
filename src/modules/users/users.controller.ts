import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "@prisma/client";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findOne(@Query() createUserDto: Partial<User>) {
    return this.userService.findOne(createUserDto);
  }
}
