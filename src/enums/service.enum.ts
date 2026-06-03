import { AppService } from "../server/services/app.js";
import { ProcessService } from "../server/services/process.js";
import { StripeService } from "../server/services/stripe.js";

export const Services = <const>[ProcessService, StripeService, AppService];
