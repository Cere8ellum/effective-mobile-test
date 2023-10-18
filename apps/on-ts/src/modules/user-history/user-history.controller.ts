import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserHistoryService } from "./user-history.service";
import { CreateUserHistoryDto } from "./dtos/create-user-history.dto";
import { Response } from "express";

@ApiTags("User History")
@Controller("user-history")
export class UserHistoryController {
  constructor(private readonly userHistoryService: UserHistoryService) {}

  @Post("/create")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: [Object],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Ошибка запроса",
  })
  @ApiOperation({
    summary: "Создание пользователя",
  })
  async create(
    @Body() userData: CreateUserHistoryDto,
    @Res() response: Response
  ) {
    try {
      const _result = await this.userHistoryService.create(userData);

      response.status(HttpStatus.OK).json(_result.data);
    } catch (e: any) {
      if (e.response) {
        response.status(HttpStatus.BAD_REQUEST).send(e.response.data);
      } else {
        response
          .status(HttpStatus.BAD_REQUEST)
          .send(
            e instanceof Error ? e.message : "Произошла непредвиденная ошибка."
          );
      }
    }
  }

  @Get("/:userid")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Success",
    type: [Object],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Ошибка запроса",
  })
  @ApiOperation({
    summary: "Получить историю пользователя",
  })
  async getAllByUserId(
    @Param("userid", ParseIntPipe) userId: number,
    @Res() response: Response
  ) {
    try {
      const _result = await this.userHistoryService.findAllByUserId(userId);
      response.status(HttpStatus.OK).json(_result.data);
    } catch (e: any) {
      if (e.response) {
        response.status(HttpStatus.BAD_REQUEST).send(e.response.data);
      } else {
        response
          .status(HttpStatus.BAD_REQUEST)
          .send(
            e instanceof Error ? e.message : "Произошла непредвиденная ошибка."
          );
      }
    }
  }

  @Get("/")
  @ApiOperation({
    summary: "Получить что-то",
  })
  async getAll(@Res() response: Response) {
    try {
      const result = await this.userHistoryService.getAll();
      return result.data;
    } catch (e: any) {
      if (e.response) {
        response.status(HttpStatus.BAD_REQUEST).send(e.response.data);
      } else {
        response
          .status(HttpStatus.BAD_REQUEST)
          .send(
            e instanceof Error ? e.message : "Произошла непредвиденная ошибка."
          );
      }
    }
  }
}
