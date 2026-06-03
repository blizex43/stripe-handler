# StripeHandler

A high-performance Stripe webhook listener and notification system that sends rich, detailed payment alerts to Discord.

## 🚀 Features

- **Real-time Monitoring**: Instant notifications when Stripe events occur.
- **Rich Discord Embeds**: Beautifully formatted alerts containing customer details, payment amounts, and transaction status.
- **Multi-Webhook Support**: Send notifications to multiple Discord channels simultaneously.
- **Extensible Architecture**: Easily add new Stripe event handlers by modifying the `StripeTypeCases` mapping.
- **Built with Bun**: Leverages the speed and efficiency of the Bun runtime.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: Windows Installer)
- [Bun](https://bun.sh/) (The project runtime)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- A Stripe Account (Test or Live mode)
- A Discord Server with Webhook permissions

## 📦 Installation

1. **Prepare the Project**:
   Extract the project files to your preferred directory.

2. **Install Stripe CLI**:
   Open your terminal as Administrator and run:
   ```bash
   npm i -g @stripe/cli
   ```

3. **Install Dependencies**:
   Navigate to the project root and run:
   ```bash
   bun install
   ```

## ⚙️ Configuration

### 1. Stripe Authentication
Login to your Stripe account via the CLI:
```bash
stripe login
```
Follow the on-screen instructions to authorize access in your browser.

### 2. Set Up the Webhook Listener
Start the Stripe CLI to forward events to your local server:
```bash
stripe listen --forward-to localhost:4242/webhook
```
**Important:** Keep this terminal window open while the application is running.

### 3. Configure the Endpoint Secret
From the output of the `stripe listen` command, copy the `SIGNINGSECRET` (starts with `whsec_`).
Open `src/enums/stripe.enum.ts` and update the `EndpointSecret` value:
```typescript
export const enum StripeProperties {
  EndpointSecret = "your_signing_secret_here",
}
```

### 4. Configure Discord Webhooks
Get the webhook URL from your Discord channel settings.
Open `src/enums/webhook.enum.ts` and add your URL(s) to the `WebhookURLArray`:
```typescript
export const WebhookURLArray = [
  "https://discord.com/api/webhooks/your-webhook-url-1",
  "https://discord.com/api/webhooks/your-webhook-url-2",
];
```

## 🏃 Usage

### Starting the Application
Run the project using Bun:
```bash
bun run src/server/index.ts
```

### Testing Events
You can simulate Stripe events to verify your setup using the Stripe CLI:
```bash
stripe trigger payment_intent.succeeded
```
Or for general help with triggers:
```bash
stripe trigger --help
```

## 📁 Project Structure

- `src/server/services/stripe.ts`: Handles the Express server and webhook verification.
- `src/enums/stripe.enum.ts`: Contains the endpoint secret and the logic for mapping Stripe events to actions.
- `src/enums/webhook.enum.ts`: Manages Discord webhook URLs and the visual templates (Embeds) for notifications.
- `src/util/stripeutil.ts`: Helper functions for currency formatting.

## 📜 License

This project is licensed under the ISC License.G