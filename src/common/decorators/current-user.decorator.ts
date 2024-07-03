import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "src/modules/users/entities/user-entity";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    return request.user;
  },
);
