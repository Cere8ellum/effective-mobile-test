import { Module } from "@nestjs/common";
import { UserHistoryController } from "./user-history.controller";
import { UserHistoryService } from "./user-history.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [UserHistoryController],
  providers: [UserHistoryService],
})
export class UserHistoryModule {}
