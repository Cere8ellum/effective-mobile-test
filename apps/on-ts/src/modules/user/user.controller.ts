import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Patch,
  Post,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserEntity } from "./entitties/user.entity";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserHistoryService } from "../user-history/user-history.service";
import { EAction } from "../user-history/enums/action.enum";

@ApiTags("User")
@Controller("user")
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly userHistoryService: UserHistoryService
  ) {}

  @Post("create")
  @ApiOperation({
    summary: "Создание пользователя",
  })
  async create(@Body() userData: CreateUserDto): Promise<UserEntity | Error> {
    try {
      const _user = await this.userService.create(userData);
      if (_user instanceof Error) {
        return new HttpException(
          _user.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      } else {
        const actionObj = this.generateActionObject(_user.id, EAction.CREATE);
        const _userHistory = await this.userHistoryService.create({
          ...actionObj,
        });

        return _user;
      }
    } catch (e: any) {
      if (e.response) {
        return new InternalServerErrorException(e.response.data);
      } else {
        return new InternalServerErrorException(
          e instanceof Error ? e.message : "Произошла непредвиденная ошибка."
        );
      }
    }
  }

  @Patch("update")
  @ApiOperation({
    summary: "Изменение пользователя",
  })
  async update(@Body() userData: UpdateUserDto): Promise<UserEntity | Error> {
    try {
      const _updatedUser = await this.userService.update(userData);
      if (_updatedUser instanceof Error) {
        return new HttpException(
          _updatedUser.message,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      } else {
        const actionObj = this.generateActionObject(
          _updatedUser.id,
          EAction.UPDATE
        );
        const _userHistory = await this.userHistoryService.create({
          ...actionObj,
        });

        return _updatedUser;
      }
    } catch (e: any) {
      if (e.response) {
        return new InternalServerErrorException(e.response.data);
      } else {
        return new InternalServerErrorException(
          e instanceof Error ? e.message : "Произошла непредвиденная ошибка."
        );
      }
    }
  }

  @Get("all")
  @ApiOperation({
    summary: "Получение всех пользователей",
  })
  async getAll(): Promise<UserEntity[] | Error> {
    try {
      return await this.userService.getAllUsers();
    } catch (e: unknown) {
      return new InternalServerErrorException(
        e instanceof Error ? e.message : "Произошла непредвиденная ошибка."
      );
    }
  }

  private generateActionObject(userId: number, action: string) {
    return {
      userId,
      actionType: action,
      createdAt: new Date(),
    };
  }
}
