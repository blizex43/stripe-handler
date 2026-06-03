import { container, delay, inject, singleton } from "tsyringe";
import { logger, logger_runner } from "../../util/logger.js";
import type { DIService } from "../../structs/services.js";
import Stripe from "stripe";
import { StripeProperties, StripeTypeCases } from "../../enums/stripe.enum.js";
import { AppService } from "./app.js";
import { Ports } from "../../enums/port.enum.js";
import type { IncomingHttpHeaders } from "http";
import { WebhookService } from "./webhook.js";
@singleton()
export class StripeService implements DIService {
  public readonly stripe = Stripe;
  public readonly secret: string = StripeProperties.EndpointSecret;
  constructor(
    @inject(delay(() => AppService)) private readonly appserv: AppService,
    @inject(delay(() => WebhookService))
    private readonly webhook: WebhookService,
  ) {
    this.start();
  }
  public async start(): Promise<void> {
    this.postAsync();
    this.stripeListen();
    logger_runner.info("Started Stripe Service!");
  }

  private postAsync() {
    this.appserv.app.post(
      "/webhook",
      this.appserv.express.raw({ type: "application/json" }),
      async (request, response) => {
        let info = <Stripe.Event>request.body;
        try {
          info = await this.extractStripeEvent(info, request.headers);
        } catch (err) {
          logger.warn(
            `Webhook event verification has ran into an error! ${err}`,
          );
          return response.sendStatus(400);
        }
        if (info.type in StripeTypeCases)
          StripeTypeCases[info.type]!(this.stripe, info, this.webhook);
        else logger.info(`Unhandled Stripe Event Found: ${info.type}`);
        return response.send();
      },
    );
  }

  private async extractStripeEvent(
    info: Stripe.Event,
    headers: IncomingHttpHeaders,
  ): Promise<Stripe.Event> {
    const signature = headers["stripe-signature"];
    if (!signature) throw new Error(`Failed To Fetch Stripe Signature.`);
    return await this.stripe.webhooks.constructEventAsync(
      <never>info,
      signature,
      this.secret,
    );
  }

  private stripeListen(): void {
    return this.appserv.listen(Ports.Stripe);
  }
}
container.resolve(StripeService);
