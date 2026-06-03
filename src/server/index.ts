import "reflect-metadata";
import { logger } from "../util/logger.js";
import { loadServices } from "../util/loader.js";
logger.info("Loading Services!");
await loadServices();
