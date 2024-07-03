import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { UserPayload } from "./types/UserPayload";
import { UserToken } from "./types/UserToken";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.uuid,
      email: user.email,
      name: user.name,
    };

    const jwt_toke = this.jwtService.sign(payload);

    return {
      access_token: jwt_toke,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne({ email });

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new Error(`Email ou senha estão incorretos`);
  }
}
