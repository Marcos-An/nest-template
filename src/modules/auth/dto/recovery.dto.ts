import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class RecoverPasswordDto {
	@IsEmail()
	@ApiProperty({
		example: "usuario@exemplo.com",
		description: "Email do usuário",
	})
	email: string;
}
