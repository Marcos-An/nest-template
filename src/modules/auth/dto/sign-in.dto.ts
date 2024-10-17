import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class SignInDto {
	@ApiProperty({
		description: "Email do usuário",
		example: "usuario@email.com",
	})
	@IsEmail({}, { message: "Forneça um email válido" })
	email: string;

	@ApiProperty({
		description: "Senha do usuário",
		example: "senha123",
	})
	@IsString({ message: "A senha deve ser uma string" })
	@MinLength(6, { message: "A senha deve ter pelo menos 6 caracteres" })
	password: string;
}
