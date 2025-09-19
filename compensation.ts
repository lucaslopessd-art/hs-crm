export type Money = number;
export type Percent = number;
export type Range = { min: number; max?: number };

export type CommissionTier = {
  range: Range;
  rate: Percent;
  label: string;
};

export type CancelBandId = 1 | 2 | 3;

export type CancelBand = {
  id: CancelBandId;
  label: string;
  range: Range; // 0..1
};

export type BonusStep = {
  rangeSales: Range;
  amount: Money;
};

export type BonusTable = Record<CancelBandId, BonusStep[]>;

export const COMMISSION_TIERS: CommissionTier[] = [
  { range: { min: 1, max: 299_999.99 },  rate: 0.035, label: "R$ 1 a 299.999,99 (3,50%)" },
  { range: { min: 300_000, max: 499_999.99 }, rate: 0.0375, label: "R$ 300.000 a 499.999,99 (3,75%)" },
  { range: { min: 500_000 },               rate: 0.04,  label: "≥ R$ 500.000 (4,00%)" },
];

export const CANCEL_BANDS: CancelBand[] = [
  { id: 1, label: "Faixa 1 (até 20%)",      range: { min: 0,       max: 0.20 } },
  { id: 2, label: "Faixa 2 (20,01% a 37%)", range: { min: 0.2001,  max: 0.37 } },
  { id: 3, label: "Faixa 3 (37,01% a 50%)", range: { min: 0.3701,  max: 0.50 } },
];

const BONUS_BASE_ALL_BANDS: BonusStep[] = [
  { rangeSales: { min: 600_000,   max: 1_199_999.99 }, amount:  720 },
  { rangeSales: { min: 1_200_000, max: 1_999_999.99 }, amount: 1440 },
  { rangeSales: { min: 2_000_000, max: 2_999_999.99 }, amount: 2400 },
  { rangeSales: { min: 3_000_000, max: 3_999_999.99 }, amount: 3600 },
  { rangeSales: { min: 4_000_000, max: 4_999_999.99 }, amount: 4800 },
];

const BONUS_BAND1_10M_29M: BonusStep[] = [
  { rangeSales: { min: 10_000_000, max: 10_999_999.99 }, amount: 18_000 },
  { rangeSales: { min: 11_000_000, max: 11_999_999.99 }, amount: 19_200 },
  { rangeSales: { min: 12_000_000, max: 12_999_999.99 }, amount: 20_400 },
  { rangeSales: { min: 13_000_000, max: 13_999_999.99 }, amount: 21_600 },
  { rangeSales: { min: 14_000_000, max: 14_999_999.99 }, amount: 22_800 },
  { rangeSales: { min: 15_000_000, max: 15_999_999.99 }, amount: 24_000 },
  { rangeSales: { min: 16_000_000, max: 16_999_999.99 }, amount: 25_200 },
  { rangeSales: { min: 17_000_000, max: 17_999_999.99 }, amount: 26_400 },
  { rangeSales: { min: 18_000_000, max: 18_999_999.99 }, amount: 27_600 },
  { rangeSales: { min: 19_000_000, max: 19_999_999.99 }, amount: 28_800 },
  { rangeSales: { min: 20_000_000, max: 20_999_999.99 }, amount: 30_000 },
  { rangeSales: { min: 21_000_000, max: 21_999_999.99 }, amount: 31_200 },
  { rangeSales: { min: 22_000_000, max: 22_999_999.99 }, amount: 32_400 },
  { rangeSales: { min: 23_000_000, max: 23_999_999.99 }, amount: 33_600 },
  { rangeSales: { min: 24_000_000, max: 24_999_999.99 }, amount: 34_800 },
];
const BONUS_BAND2_10M_29M: BonusStep[] = [
  { rangeSales: { min: 10_000_000, max: 10_999_999.99 }, amount: 15_000 },
  { rangeSales: { min: 11_000_000, max: 11_999_999.99 }, amount: 16_000 },
  { rangeSales: { min: 12_000_000, max: 12_999_999.99 }, amount: 17_000 },
  { rangeSales: { min: 13_000_000, max: 13_999_999.99 }, amount: 18_000 },
  { rangeSales: { min: 14_000_000, max: 14_999_999.99 }, amount: 19_000 },
  { rangeSales: { min: 15_000_000, max: 15_999_999.99 }, amount: 20_000 },
  { rangeSales: { min: 16_000_000, max: 16_999_999.99 }, amount: 21_000 },
  { rangeSales: { min: 17_000_000, max: 17_999_999.99 }, amount: 22_000 },
  { rangeSales: { min: 18_000_000, max: 18_999_999.99 }, amount: 23_000 },
  { rangeSales: { min: 19_000_000, max: 19_999_999.99 }, amount: 24_000 },
  { rangeSales: { min: 20_000_000, max: 20_999_999.99 }, amount: 25_000 },
  { rangeSales: { min: 21_000_000, max: 21_999_999.99 }, amount: 26_000 },
  { rangeSales: { min: 22_000_000, max: 22_999_999.99 }, amount: 27_000 },
  { rangeSales: { min: 23_000_000, max: 23_999_999.99 }, amount: 28_000 },
  { rangeSales: { min: 24_000_000, max: 24_999_999.99 }, amount: 29_000 },
];
const BONUS_BAND3_10M_29M: BonusStep[] = [
  { rangeSales: { min: 10_000_000, max: 10_999_999.99 }, amount: 7_500 },
  { rangeSales: { min: 11_000_000, max: 11_999_999.99 }, amount: 8_000 },
  { rangeSales: { min: 12_000_000, max: 12_999_999.99 }, amount: 8_500 },
  { rangeSales: { min: 13_000_000, max: 13_999_999.99 }, amount: 9_000 },
  { rangeSales: { min: 14_000_000, max: 14_999_999.99 }, amount: 9_500 },
  { rangeSales: { min: 15_000_000, max: 15_999_999.99 }, amount: 10_000 },
  { rangeSales: { min: 16_000_000, max: 16_999_999.99 }, amount: 10_500 },
  { rangeSales: { min: 17_000_000, max: 17_999_999.99 }, amount: 11_000 },
  { rangeSales: { min: 18_000_000, max: 18_999_999.99 }, amount: 11_500 },
  { rangeSales: { min: 19_000_000, max: 19_999_999.99 }, amount: 12_000 },
  { rangeSales: { min: 20_000_000, max: 20_999_999.99 }, amount: 12_500 },
  { rangeSales: { min: 21_000_000, max: 21_999_999.99 }, amount: 13_000 },
  { rangeSales: { min: 22_000_000, max: 22_999_999.99 }, amount: 13_500 },
  { rangeSales: { min: 23_000_000, max: 23_999_999.99 }, amount: 14_000 },
  { rangeSales: { min: 24_000_000, max: 24_999_999.99 }, amount: 14_500 },
];

const BONUS_BAND1_30M_99M: BonusStep[] = [
  { rangeSales: { min: 30_000_000, max: 34_999_999.99 }, amount: 36_000 },
  { rangeSales: { min: 35_000_000, max: 39_999_999.99 }, amount: 42_000 },
  { rangeSales: { min: 40_000_000, max: 44_999_999.99 }, amount: 48_000 },
  { rangeSales: { min: 45_000_000, max: 49_999_999.99 }, amount: 54_000 },
  { rangeSales: { min: 50_000_000, max: 54_999_999.99 }, amount: 60_000 },
  { rangeSales: { min: 55_000_000, max: 59_999_999.99 }, amount: 66_000 },
  { rangeSales: { min: 60_000_000, max: 69_999_999.99 }, amount: 72_000 },
  { rangeSales: { min: 70_000_000, max: 79_999_999.99 }, amount: 84_000 },
  { rangeSales: { min: 80_000_000, max: 89_999_999.99 }, amount: 96_000 },
  { rangeSales: { min: 90_000_000, max: 99_999_999.99 }, amount: 96_000 },
];
const BONUS_BAND2_30M_99M: BonusStep[] = BONUS_BAND1_30M_99M.map(s => ({ ...s, amount: Math.round(s.amount * 0.83) }));
const BONUS_BAND3_30M_99M: BonusStep[] = BONUS_BAND1_30M_99M.map(s => ({ ...s, amount: Math.round(s.amount * 0.50) }));

export const BONUS_TABLE: BonusTable = {
  1: [...BONUS_BASE_ALL_BANDS, ...BONUS_BAND1_10M_29M, ...BONUS_BAND1_30M_99M],
  2: [...BONUS_BASE_ALL_BANDS, ...BONUS_BAND2_10M_29M, ...BONUS_BAND2_30M_99M],
  3: [...BONUS_BASE_ALL_BANDS, ...BONUS_BAND3_10M_29M, ...BONUS_BAND3_30M_99M],
};

export function calcCommission(saleValue: number): Money {
  const tier = COMMISSION_TIERS.find(t =>
    saleValue >= t.range.min && (t.range.max === undefined || saleValue <= t.range.max)
  );
  return tier ? saleValue * tier.rate : 0;
}

export function pickCancelBand(cancelRate: number): CancelBand {
  const band = CANCEL_BANDS.find(b =>
    cancelRate >= b.range.min && (b.range.max === undefined || cancelRate <= b.range.max!)
  );
  return band ?? CANCEL_BANDS[CANCEL_BANDS.length - 1];
}

export function calcMonthlyBonus(totalSales: number, cancelRate: number): Money {
  const band = pickCancelBand(cancelRate);
  const rows = BONUS_TABLE[band.id];

  const row = rows.find(r =>
    totalSales >= r.rangeSales.min && (r.rangeSales.max === undefined || totalSales <= r.rangeSales.max)
  );
  return row ? row.amount : 0;
}

export const ESTORNO_OBS =
  "Para não ocorrer estorno, o cliente deve ter 8 parcelas pagas antes da exclusão.";
