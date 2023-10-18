import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("App")
@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}
}
