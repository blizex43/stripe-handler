import { container, singleton } from "tsyringe";
import { logger, logger_runner } from "../../util/logger.js";
import type { DIService } from "../../structs/services.js";

@singleton()
export class ProcessService implements DIService {
  private readonly name: string = `StripeHandler`;
  constructor() {
    this.start();
  }
  public start(): void {
    logger_runner.info("Started Process Service!");
    this.changeProcessName();
    this.openProcessListeners();
  }

  public manualExit() {
    return process.exit(0);
  }

  private openProcessListeners() {
    process.on("uncaughtException", (err) => {
      logger.withError(err).error("CRASH");
    });

    process.on("unhandledRejection", (err) => {
      logger.withError(err).error("PROMISE CRASH");
    });
  }

  private changeProcessName() {
    process.title = this.name;
  }
}
container.resolve(ProcessService);
