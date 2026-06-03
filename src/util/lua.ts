import { sleep } from "@nut-tree-fork/nut-js";
import { secondsToMilliseconds } from "./time.js";

export class task {
  /**
   * From the TaskScheduler Library
   * @example
   * ```typescript
   *    logger.info("hello from a few seconds ago!")
   * 	task.wait(2)
   *    logger.info("hello now!")
   * ```
   *  @param duration wait time in seconds
   */
  public static async wait(duration: number = 0.03): Promise<void> {
    return await sleep(secondsToMilliseconds(duration));
  }
  /** Delays the passed thread or function until the given duration has elapsed. Resumes on engine Heartbeat. */
  public static delay(duration: number = 0.03, func: Callback): number {
    return setTimeout(func, secondsToMilliseconds(duration));
  }
}
export function pairs<T extends object>(object: T): [keyof T, T[keyof T]][] {
  return <ReturnType<typeof pairs>>(<unknown>Object.entries(object));
}
