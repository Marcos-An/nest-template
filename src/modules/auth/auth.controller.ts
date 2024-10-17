import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IsPublic } from "src/common/decorators/is-public.decorator";
import { AuthenticatedRequest } from "src/common/types/AuthenticatedRequest";
import { AuthService } from "./auth.service";
import { RecoverPasswordDto } from "./dto/recovery.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@ApiTags("Autenticação")
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Autenticar usuário" })
  @ApiResponse({ status: 200, description: "Usuário autenticado com sucesso" })
  @ApiResponse({ status: 401, description: "Credenciais inválidas" })
  async signIn(@Body() signInDto: SignInDto, @Req() req: AuthenticatedRequest) {
    return this.authService.signIn(req.user);
  }

  @IsPublic()
  @Post("sign-up")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Registrar novo usuário" })
  @ApiResponse({ status: 201, description: "Usuário registrado com sucesso" })
  @ApiResponse({ status: 409, description: "Email já registrado" })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(
      signUpDto.name,
      signUpDto.email,
      signUpDto.password,
    );
  }

  @IsPublic()
  @Post("recover-password")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Solicitar recuperação de senha" })
  @ApiResponse({
    status: 200,
    description: "Email de recuperação enviado com sucesso",
  })
  @ApiResponse({ status: 404, description: "Usuário não encontrado" })
  async recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDto) {
    await this.authService.recoverPassword(recoverPasswordDto.email);
    return {
      message:
        "Se o email existir em nossa base de dados, um link de recuperação será enviado.",
    };
  }
}
