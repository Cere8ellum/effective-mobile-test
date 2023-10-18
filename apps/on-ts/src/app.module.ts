import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "./modules/user/user.module";
import { UserHistoryModule } from "./modules/user-history/user-history.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Объявлен глобально, чтобы не импортировать во всех модулях, где используется
      envFilePath: `env/.${process.env.NODE_ENV}.env`, // Путь к .env
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        synchronize: false,
        autoLoadEntities: true,
        useUTC: true,
        entities: [__dirname + "modules/**/*.entity{.ts,.js}"],
      }),
    }),
    UserModule,
    UserHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
