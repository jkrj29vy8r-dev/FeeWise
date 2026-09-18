export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: 'What is the difference between Gross, Net, and the Processing fee?',
    answer:
      'Gross is the total amount charged to the payer. The Processing fee is the cut the payment processor (Stripe or PayPal) keeps. Net is what actually lands in your account, calculated as Gross minus the Processing fee. FeeWise always shows all three figures so you can see exactly where the money goes.',
  },
  {
    question: 'How is the Stripe processing fee calculated for US domestic cards?',
    answer:
      "Stripe's standard US domestic rate is 2.9% of the transaction plus a fixed $0.30 per charge: Fee = (Gross × 0.029) + $0.30. For example, a $100.00 charge incurs a $3.20 fee ($100 × 0.029 = $2.90, plus $0.30), leaving a $96.80 net.",
  },
  {
    question: 'What formula does FeeWise use for "I want to receive" mode?',
    answer:
      'To gross up a target Net payout so the fee is covered on top, the formula is Gross = (Target Net + Fixed Fee) / (1 − Fee Rate). For Stripe US domestic (2.9% + $0.30) and a $1,000 target net, that works out to Gross = ($1,000 + $0.30) / (1 − 0.029) = $1,030.18, with a $30.18 processing fee — so the $1,000 you wanted lands exactly as net.',
  },
  {
    question: "Why can't I just add the fee percentage straight to my target amount?",
    answer:
      "Because the percentage fee is calculated on the Gross amount you charge, not on the Net amount you want to keep — so simply adding 2.9% of your target Net undercharges every time. Solving Gross = (Net + Fixed Fee) / (1 − Rate) accounts for the fact that the fee itself grows as the gross amount grows, which is why the formula divides by (1 − Rate) instead of just adding the rate on top.",
  },
  {
    question: 'What is the Stripe fee for international cards?',
    answer:
      "Stripe's international card rate is 3.9% plus $0.30 per charge — a full percentage point higher than the 2.9% US domestic rate — to cover the additional cross-border interchange, currency-conversion, and fraud-risk costs of accepting a card issued outside your home country.",
  },
  {
    question: 'How does Stripe ACH bank transfer pricing work?',
    answer:
      "Stripe's ACH debit fee is 0.8% of the transaction amount, with no fixed per-charge fee, but it is floored at $0.30 and capped at $5.00 per transaction. That cap is why ACH becomes dramatically cheaper than card payments for large invoices: a $10,000 ACH transfer costs $5.00 in fees (capped), versus roughly $290+ on a card.",
  },
  {
    question: "How do PayPal's fees compare to Stripe's?",
    answer:
      "PayPal's US domestic rate is 2.89% + $0.30, essentially in line with Stripe's 2.9% + $0.30. Internationally, PayPal charges 3.49% + $0.49, versus Stripe's 3.9% + $0.30 — which one is cheaper depends on your typical transaction size, since PayPal's higher fixed fee costs more on small charges while its lower percentage can win out on larger ones.",
  },
  {
    question: 'How is Wise different from Stripe or PayPal?',
    answer:
      "Wise is primarily an international money-transfer and multi-currency account service, not a card-payment processor, so it does not use a single published \"percentage + fixed fee\" schedule the way Stripe and PayPal do. Its fee for a given transfer depends on the currency corridor, payout method, and amount — commonly in the rough range of 0.4%–2% with a small or no fixed fee — so always check wise.com/pricing for your exact route before relying on an estimate.",
  },
  {
    question: 'Why are fees different by country?',
    answer:
      'Card networks and payment processors charge more for cross-border and currency-conversion transactions to cover fraud risk, interchange fees charged by card-issuing banks, and the cost of handling foreign-exchange conversion, so international rates run higher than domestic ones across every major processor.',
  },
  {
    question: 'Can I negotiate processor fees?',
    answer:
      'High-volume merchants can sometimes negotiate custom (interchange-plus) pricing directly with Stripe or PayPal, or qualify for volume discounts. Most small and early-stage accounts are on the fixed, published rates used in this calculator — negotiated rates typically only become available once monthly processing volume reaches the tens of thousands of dollars.',
  },
  {
    question: 'What is the difference between "I want to receive" and "If I charge this amount"?',
    answer:
      '"I want to receive" works backward from a target payout: you tell FeeWise the Net amount you want to keep, and it grosses up the charge so the fee is covered on top. "If I charge this amount" works forward from a sticker price: you tell FeeWise the Gross amount you plan to charge, and it shows what actually lands in your account after the processor takes its fee.',
  },
  {
    question: 'Does FeeWise store or share the amounts I enter?',
    answer:
      'No. FeeWise does not process real payments or transactions. Every calculation runs entirely in your browser using the formulas above — the amounts and currency you enter are never sent to or stored on our servers. See our Privacy Policy for details.',
  },
];
