import { Module } from "@nestjs/common";
import { AppController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entitties/user.entity";
import { UserHistoryService } from "../user-history/user-history.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), HttpModule],
  controllers: [AppController],
  providers: [UserService, UserHistoryService],
})
export class UserModule {}
