import { User } from "@prisma/client";

export class UserEntity {
  uuid: string;
  email: string;
  name: string;
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
