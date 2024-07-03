import { User } from "@prisma/client";

export class UserEntity {
  uuid: string;
  email: string;
  password: string;
  name: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
