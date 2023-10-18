import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: "integer",
    description: "Id",
    example: "1",
  })
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
