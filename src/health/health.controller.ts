import { Controller, Get } from "@nestjs/common";
import { HealthService } from "./health.service.js";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Health")
@Controller("api/health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth() {
    return this.healthService.getHealth();
  }
}
