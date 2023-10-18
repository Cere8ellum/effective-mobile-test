import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: "string",
    description: "Username",
    example: "Mr.Smith",
  })
  username: string;
}
