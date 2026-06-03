import type { Services } from "../enums/service.enum.js";

export interface DIService {
  start(): void;
}
export type RegisteredService = (typeof Services)[number];
export type RegisteredServiceArray = readonly RegisteredService[];
