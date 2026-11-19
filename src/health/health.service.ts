import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthService {
  getHealth() {
    return {
      status: "ok",
      message: "API server is running",
    };
  }
}
