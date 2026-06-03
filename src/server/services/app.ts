import { container, singleton } from "tsyringe";
import { logger_runner } from "../../util/logger.js";
import type { DIService } from "../../structs/services.js";
import express from "express";
@singleton()
export class AppService implements DIService {
  public readonly express = express;
  public readonly app = this.express();
  constructor() {
    this.start();
  }
  public start(): void {
    logger_runner.info("Started App Service!");
  }

  public listen(port: number): void {
    return void this.app.listen(port, () =>
      logger_runner.info(`App Listening on Port ${port}`),
    );
  }
}
container.resolve(AppService);
