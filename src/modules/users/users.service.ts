import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { UserEntity } from "./entities/user-entity";
import { User } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return { ...createdUser, password: undefined };
  }

  async findOne(
    where: Partial<User>,
  ): Promise<Partial<UserEntity | undefined>> {
    return await this.prisma.user.findFirst({ where });
  }
}
