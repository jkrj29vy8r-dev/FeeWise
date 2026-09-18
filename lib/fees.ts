export type Processor = 'stripe' | 'paypal';

export type FeeStructureId = 'stripe_us' | 'stripe_intl' | 'stripe_ach' | 'paypal_us' | 'paypal_intl';

export interface FeeRateConfig {
  rate: number;
  fixedFee: number;
  minFee?: number;
  maxFee?: number;
}

export interface FeeStructure extends FeeRateConfig {
  id: FeeStructureId;
  processor: Processor;
  label: string;
}

export const FEE_STRUCTURES: Record<FeeStructureId, FeeStructure> = {
  stripe_us: {
    id: 'stripe_us',
    processor: 'stripe',
    label: 'US Domestic',
    rate: 0.029,
    fixedFee: 0.3,
  },
  stripe_intl: {
    id: 'stripe_intl',
    processor: 'stripe',
    label: 'International',
    rate: 0.039,
    fixedFee: 0.3,
  },
  stripe_ach: {
    id: 'stripe_ach',
    processor: 'stripe',
    label: 'ACH Bank Transfer',
    rate: 0.008,
    fixedFee: 0,
    minFee: 0.3,
    maxFee: 5,
  },
  paypal_us: {
    id: 'paypal_us',
    processor: 'paypal',
    label: 'US Domestic',
    rate: 0.0289,
    fixedFee: 0.3,
  },
  paypal_intl: {
    id: 'paypal_intl',
    processor: 'paypal',
    label: 'International',
    rate: 0.0349,
    fixedFee: 0.49,
  },
};

export const PROCESSOR_STRUCTURES: Record<Processor, FeeStructure[]> = {
  stripe: [FEE_STRUCTURES.stripe_us, FEE_STRUCTURES.stripe_intl, FEE_STRUCTURES.stripe_ach],
  paypal: [FEE_STRUCTURES.paypal_us, FEE_STRUCTURES.paypal_intl],
};

export interface FeeBreakdown {
  gross: number;
  fee: number;
  net: number;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function clampFee(rawFee: number, structure: FeeRateConfig): number {
  let fee = rawFee;
  if (structure.minFee !== undefined) fee = Math.max(fee, structure.minFee);
  if (structure.maxFee !== undefined) fee = Math.min(fee, structure.maxFee);
  return fee;
}

/**
 * "I want to charge" mode: solve for the Net amount received after the
 * processor's fee is deducted from a known Gross charge.
 * Fee = Gross * Rate + Fixed Fee (clamped to [minFee, maxFee] when set)
 */
export function calculateNetFromGross(grossAmount: number, structure: FeeRateConfig): FeeBreakdown {
  const gross = round2(grossAmount);
  const fee = round2(clampFee(gross * structure.rate + structure.fixedFee, structure));
  const net = round2(gross - fee);
  return { gross, fee, net };
}

/**
 * "I want to receive" mode: solve for the Gross amount that must be charged
 * so that, after the processor's fee, the target Net lands in the account.
 *
 * Base case (no fee floor/ceiling): Gross = (Target Net + Fixed Fee) / (1 - Rate)
 *
 * For structures with a minFee/maxFee (e.g. Stripe ACH), that base gross is
 * only correct if the fee it implies actually falls within the clamp; when it
 * doesn't, the fee is pinned to the boundary and Gross = Target Net + that
 * boundary fee instead.
 *
 * The displayed fee is always Gross - Net (both already rounded to cents),
 * so the three figures reconcile exactly.
 */
export function calculateGrossFromNet(targetNet: number, structure: FeeRateConfig): FeeBreakdown {
  const net = round2(targetNet);
  const { rate, fixedFee, minFee, maxFee } = structure;

  let gross = (net + fixedFee) / (1 - rate);

  if (minFee !== undefined || maxFee !== undefined) {
    const uncappedFee = gross * rate + fixedFee;
    if (minFee !== undefined && uncappedFee < minFee) {
      gross = net + minFee;
    } else if (maxFee !== undefined && uncappedFee > maxFee) {
      gross = net + maxFee;
    }
  }

  gross = round2(gross);
  const fee = round2(gross - net);
  return { gross, fee, net };
}
