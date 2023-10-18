import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    type: "number",
    description: "ID пользователя, pk",
  })
  id: number;

  @Column({ type: "varchar", nullable: false })
  @ApiProperty({
    type: "varchar",
    description: "Имя пользователя",
    default: "superman",
  })
  username: string;
}
