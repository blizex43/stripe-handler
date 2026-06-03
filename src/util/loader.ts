import type { RegisteredServiceArray } from "../structs/services.js";

export async function loadServices(): Promise<RegisteredServiceArray> {
  return (await import("../enums/service.enum.js")).Services;
}
