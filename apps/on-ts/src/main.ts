import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const globalPrefix = "api";
  const BASE_ON_TS_URL = `${process.env.ON_TS_SERVER}${process.env.ON_TS_PORT}${process.env.ON_TS_ENDPOINT}`;
  const BASE_ON_JS_URL = `${process.env.ON_JS_SERVER}${process.env.ON_JS_PORT}${process.env.ON_JS_ENDPOINT}`;

  // Включить CORS
  app.enableCors({
    origin: [BASE_ON_TS_URL, BASE_ON_JS_URL],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3005;

  // Swagger
  const docConfig = new DocumentBuilder()
    .setTitle("Api")
    .setDescription("API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup("api", app, document);

  // Port
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

  // HMR
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => void app.close());
  }
}
void bootstrap();
