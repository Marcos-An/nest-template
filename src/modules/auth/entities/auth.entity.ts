export class Auth {
  access_token: string;
  user_uuid: string;

  constructor(partial: Partial<Auth>) {
    Object.assign(this, partial);
  }
}
