import { Injectable } from "@nestjs/common";
import { CreateUserHistoryDto } from "./dtos/create-user-history.dto";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";

@Injectable()
export class UserHistoryService {
  private HISTORY_SERVER;

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.HISTORY_SERVER = `${this.configService.get(
      "ON_JS_SERVER"
    )}${this.configService.get("ON_JS_PORT")}${this.configService.get(
      "ON_JS_ENDPOINT"
    )}`;
  }

  async create(data: CreateUserHistoryDto): Promise<AxiosResponse<[]>> {
    const result = await this.httpService.axiosRef.post(
      `${this.HISTORY_SERVER}/create`,
      data
    );
    return result;
  }

  async findAllByUserId(userId: number): Promise<AxiosResponse<[]>> {
    const result = await this.httpService.axiosRef.get(
      `${this.HISTORY_SERVER}/${userId}`
    );
    return result;
  }

  async getAll(): Promise<AxiosResponse<string>> {
    const result = await this.httpService.axiosRef.get(
      `${this.HISTORY_SERVER}`
    );
    return result;
  }
}
