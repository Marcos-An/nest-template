import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/services/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user-entity";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return new UserEntity(createdUser);
  }

  async findOne(
    where: Partial<User>,
  ): Promise<Partial<UserEntity | undefined>> {
    const user = await this.prisma.user.findFirst({ where });

    if (!user) {
      throw new HttpException("Usuário não encontrado", HttpStatus.NOT_FOUND);
    }

    return await this.prisma.user.findFirst({ where });
  }

  async findAll(): Promise<Partial<UserEntity>[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => ({
      ...new UserEntity(user),
      password: undefined,
    }));
  }
}
