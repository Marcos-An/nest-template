import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
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

    const jwt_token = this.jwtService.sign(payload);

    return {
      access_token: jwt_token,
      user_uuid: user.uuid,
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

    throw new Error("Email ou senha estão incorretos");
  }

  async signUp(
    name: string,
    email: string,
    password: string,
  ): Promise<UserToken> {
    try {
      const existingUser = await this.usersService.findOne({ email });

      if (existingUser) {
        throw new ConflictException("Este email já está registrado");
      }
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
    }

    try {
      const newUser = await this.usersService.create({ name, email, password });

      const payload: UserPayload = {
        sub: newUser.uuid,
        email: newUser.email,
        name: newUser.name,
      };

      const jwt_token = this.jwtService.sign(payload);

      return {
        access_token: jwt_token,
        user_uuid: newUser.uuid,
      };
    } catch (error) {
      throw new InternalServerErrorException("Erro ao criar novo usuário");
    }
  }

  async recoverPassword(email: string) {
    const user = await this.usersService.findOne({ email });

    if (!user) {
      return;
    }

    const payload = { sub: user.uuid, email: user.email };
    const recoveryToken = this.jwtService.sign(payload, { expiresIn: "1h" });

    // aq ficaria a logica para enviar o email
    // ex:await this.emailService.sendPasswordRecoveryEmail(user.email, recoveryToken);
    console.log(`Token de recuperação para ${email}: ${recoveryToken}`);
  }
}
