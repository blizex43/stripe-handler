import { ZeroDecimalCurrencies } from "../enums/stripe.enum.js";

export const stripeCurrencyFormat = (amount: number, currency: string) => {
  const isZeroDecimal = ZeroDecimalCurrencies.has(currency.toUpperCase());

  return new Intl.NumberFormat("en-US", {
    currency,
    style: "currency",
  }).format(isZeroDecimal ? amount : amount / 100);
};
