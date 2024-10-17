import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class SignUpDto {
	@ApiProperty({
		description: "Nome do usuário",
		example: "João Silva",
	})
	@IsString({ message: "O nome deve ser uma string" })
	@MinLength(2, { message: "O nome deve ter pelo menos 2 caracteres" })
	name: string;

	@ApiProperty({
		description: "Email do usuário",
		example: "joao@email.com",
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
