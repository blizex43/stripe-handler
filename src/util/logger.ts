import { ConsoleTransport, LogLayer, StructuredTransport } from "loglayer";
import { serializeError } from "serialize-error";

export const logger = new LogLayer({
  errorSerializer: serializeError,
  transport: new ConsoleTransport({
    logger: console,
  }),
  prefix: "[stripe-app]",
});

export const logger_runner = logger.withPrefix("[i]");

export const detailed_logger = new LogLayer({
  errorSerializer: serializeError,
  transport: new StructuredTransport({
    logger: console,
  }),
  prefix: "[run]",
  metadataFieldName: "meta",
  contextFieldName: "context",
});
