import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
