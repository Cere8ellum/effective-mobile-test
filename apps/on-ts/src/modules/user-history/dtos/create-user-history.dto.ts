import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";
import { EAction } from "../enums/action.enum";
import { Timestamp } from "typeorm";

export class CreateUserHistoryDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: "integer",
    description: "Id юзера",
    example: "392",
  })
  userId: number;

  @IsString()
  @ValidateIf((o) => o.action)
  @ApiProperty({
    enum: [EAction.CREATE, EAction.UPDATE],
    type: EAction,
    description: "Вид действия",
  })
  actionType: string;

  @ApiProperty({
    type: Timestamp,
    description: "Дата создания записи",
    example: new Date("2023-10-18T12:27:40.141Z"),
  })
  @IsNotEmpty()
  createdAt: Date;
}
