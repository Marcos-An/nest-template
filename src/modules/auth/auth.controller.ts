import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
  Req,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthenticatedRequest } from "src/common/types/AuthenticatedRequest";
import { IsPublic } from "src/common/decorators/is-public.decorator";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  async signIn(@Req() req: AuthenticatedRequest) {
    return this.authService.signIn(req.user);
  }
}
