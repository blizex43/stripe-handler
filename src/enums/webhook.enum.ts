import { EmbedBuilder } from "discord.js";
import type Stripe from "stripe";
import { stripeCurrencyFormat } from "../util/stripeutil.js";

export const WebhookURLArray = [
  "https://discord.com/api/webhooks/your-webhook-url-1",
  "https://discord.com/api/webhooks/your-webhook-url-2",
];
export const enum WebhookPropertiesEnum {
  Name = "StripeHandler",
  Color = "0x000000",
  Avatar = "",
}

export const enum EmbedPresets {
  Succeeded,
  Completed,
}
export const EmbedPresetValues: Record<
  EmbedPresets,
  (event: Stripe.Event) => Promise<EmbedBuilder>
> = {
  [EmbedPresets.Succeeded]: async (event: Stripe.Event) => {
    const intent = (<Stripe.PaymentIntentSucceededEvent>event).data.object;
    const embed = new EmbedBuilder({
      title: "Payment Succeeded",
      color: 0x32cd32,
      description:
        "The Stripe checkout session has been successfully completed!",
      timestamp: new Date(),
      fields: [
        {
          name: "Customer",
          value: [
            `**ID:** \`${intent.customer}\``,
            `**Email:** \`${intent.receipt_email}\``,
          ].join("\n"),
          inline: false,
        },
        {
          name: "Payment",
          value: `**Amount:** \`${stripeCurrencyFormat(intent.amount, intent.currency)}\``,
          inline: true,
        },
        {
          name: "Tax",
          value: `**Amount:** \`${stripeCurrencyFormat(intent.amount_details?.tax?.total_tax_amount ?? 0, intent.currency)}\``,
          inline: true,
        },
        {
          name: "Event",
          value: `\`${event.type}\``,
          inline: true,
        },
      ],
      footer: {
        text: "Stripe Payment Notification",
      },
    });

    return embed;
  },

  [EmbedPresets.Completed]: async (event: Stripe.Event) => {
    const intent = (<Stripe.CheckoutSessionCompletedEvent>event).data.object;
    const embed = new EmbedBuilder({
      title: "Transaction Processing",
      color: 16764928,
      description: "Metadata of the processing transaction.",
      timestamp: new Date(),
      fields: [
        {
          name: "Customer",
          value: [
            `**Name:** \`${intent.customer_details?.name ?? intent.customer_details?.individual_name ?? intent.customer_details?.business_name}\``,
            `**Email:** \`${intent.customer_email ?? intent.customer_details?.email}\``,
          ].join("\n"),
          inline: false,
        },
        {
          name: "Currency",
          value: `**Value:** \`${intent.currency}\``,
          inline: true,
        },
        {
          name: "Payment Status",
          value: `**Status:** \`${intent.payment_status}\``,
          inline: true,
        },
        {
          name: "Event",
          value: `\`${event.type}\``,
          inline: true,
        },
      ],
      footer: {
        text: "Stripe Payment Process Notification",
      },
    });

    return embed;
  },
};
