import { container, singleton } from "tsyringe";
import { logger_runner } from "../../util/logger.js";
import type { DIService } from "../../structs/services.js";
import {
  MessagePayload,
  WebhookClient,
  type APIMessage,
  type WebhookMessageCreateOptions,
} from "discord.js";
import {
  EmbedPresets,
  EmbedPresetValues,
  WebhookPropertiesEnum,
  WebhookURLArray,
} from "../../enums/webhook.enum.js";
import type Stripe from "stripe";
@singleton()
export class WebhookService implements DIService {
  private readonly clients: WebhookClient[] = WebhookURLArray.map(
    (url) => new WebhookClient({ url }),
  );
  public constructor() {
    this.start();
  }

  public async sendWithPreset(
    preset: EmbedPresets,
    event: Stripe.Event,
  ): Promise<APIMessage[]> {
    const payload = this.giveDefaultPayload();
    return this.sendRequest({
      ...payload,
      embeds: [await EmbedPresetValues[preset](event)],
    });
  }

  public giveDefaultPayload(): WebhookMessageCreateOptions {
    return {
      avatarURL: WebhookPropertiesEnum.Avatar,
      username: WebhookPropertiesEnum.Name,
    };
  }

  public async sendRequest(
    options: string | MessagePayload | WebhookMessageCreateOptions,
  ): Promise<APIMessage[]> {
    const promises = <Promise<APIMessage>[]>[];
    for (const webclient of this.clients)
      promises.push(webclient.send(options));
    return Promise.all(promises);
  }
  public start(): void {
    logger_runner.info("Started Webhook Service!");
  }
}
container.resolve(WebhookService);
