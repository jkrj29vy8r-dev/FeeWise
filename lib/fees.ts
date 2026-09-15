export const STRIPE_US_FEE_RATE = 0.029; // 2.9%
export const STRIPE_US_FIXED_FEE = 0.3; // $0.30

export interface FeeBreakdown {
  gross: number;
  fee: number;
  net: number;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * "I want to receive" mode: solve for the Gross amount that must be charged
 * so that, after Stripe's fee, the target Net lands in the account.
 * Gross = (Target Net + Fixed Fee) / (1 - Fee Rate)
 *
 * Fee is derived as Gross - Net (both already rounded to cents) rather than
 * rounded independently, so the three figures always reconcile exactly.
 */
export function calculateGrossFromNet(
  targetNet: number,
  feeRate: number = STRIPE_US_FEE_RATE,
  fixedFee: number = STRIPE_US_FIXED_FEE,
): FeeBreakdown {
  const net = round2(targetNet);
  const gross = round2((net + fixedFee) / (1 - feeRate));
  const fee = round2(gross - net);
  return { gross, fee, net };
}

/**
 * "I want to charge" mode: solve for the Net amount received after Stripe's
 * fee is deducted from a known Gross charge.
 * Fee = Gross * Fee Rate + Fixed Fee
 */
export function calculateNetFromGross(
  grossAmount: number,
  feeRate: number = STRIPE_US_FEE_RATE,
  fixedFee: number = STRIPE_US_FIXED_FEE,
): FeeBreakdown {
  const gross = round2(grossAmount);
  const fee = round2(gross * feeRate + fixedFee);
  const net = round2(gross - fee);
  return { gross, fee, net };
}
