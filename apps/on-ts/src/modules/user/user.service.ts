import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entitties/user.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  getHello(): string {
    return "Hello World!";
  }

  async create(user: CreateUserDto): Promise<UserEntity | Error> {
    const usernameToLowerCase = user.username.toLowerCase();

    // Проверка на существование такого пользователя
    const _isExist = await this.findByUsername(usernameToLowerCase);

    if (_isExist)
      return new BadRequestException(
        `Такой пользователь (${usernameToLowerCase}) уже существует.`
      );

    // Сохранение
    return await this.userRepository.save({
      username: usernameToLowerCase,
    });
  }

  async update(user: UpdateUserDto): Promise<UserEntity | Error> {
    const usernameToLowerCase = user.username.toLowerCase();

    // Проверка на существование такого ID
    const _isExist = await this.userRepository.findOne({
      where: { id: user.id },
    });
    if (!_isExist)
      return new BadRequestException(
        `Пользователя с ID ${user.id} не существует.`
      );

    // Проверка на существование такого Username
    const _isUsernameExist = await this.findByUsername(usernameToLowerCase);

    if (_isUsernameExist)
      return new BadRequestException(
        `Такой пользователь (${usernameToLowerCase}) уже существует.`
      );

    // Сохранение
    return await this.userRepository.save({
      id: user.id,
      username: usernameToLowerCase,
    });
  }

  async getAllUsers(): Promise<UserEntity[] | Error> {
    return await this.userRepository.find({
      order: {
        id: "ASC",
      },
    });
  }

  private async findByUsername(username: string) {
    return await this.userRepository.findOne({
      where: { username: username },
    });
  }
}
