import type Stripe from "stripe";
import { logger } from "../util/logger.js";
import type { WebhookService } from "../server/services/webhook.js";
import { EmbedPresets } from "./webhook.enum.js";
import { stripeCurrencyFormat } from "../util/stripeutil.js";

export const enum StripeProperties {
  EndpointSecret = "your_signing_secret_here",
}

export const StripeTypeCases: Partial<
  Record<
    Stripe.Event.Type,
    (
      stripe: typeof Stripe,
      event: Stripe.Event,
      webhook: WebhookService,
    ) => void
  >
> = {
  "payment_intent.succeeded": (_, event, webhook) => {
    const intent = (<Stripe.PaymentIntentSucceededEvent>event).data.object;
    webhook.sendWithPreset(EmbedPresets.Succeeded, event);
    logger.info(
      `Payment for ${stripeCurrencyFormat(intent.amount, intent.currency)} was successful!`,
    );
  },

  "charge.succeeded": (_, event, webhook) => {
    webhook.sendWithPreset(EmbedPresets.Completed, event);
    logger.info(`Transaction Processing!`);
  },
};

export const ZeroDecimalCurrencies = new Set([
  "BIF",
  "CLP",
  "DJF",
  "GNF",
  "JPY",
  "KMF",
  "KRW",
  "MGA",
  "PYG",
  "RWF",
  "UGX",
  "VND",
  "VUV",
  "XAF",
  "XOF",
  "XPF",
  "UGX",
]);
