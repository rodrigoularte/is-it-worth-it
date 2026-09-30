import type { SimulationFormData } from "@/data/simulation";

export function formatCurrencyMask(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  const number = Number(digits) / 100;

  if (isNaN(number)) {
    return "";
  }

  return number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function addCurrencySymbol(value: string): string {
  return `R$ ${value}`;
}

export function calculatePurchaseImpact(data: SimulationFormData) {
  const parseMoney = (val: string) =>
    parseFloat(val.replace(/\./g, "").replace(",", "."));

  const purchaseValue = parseMoney(data.purchaseValue);
  const income = parseMoney(data.income);
  const expenses = parseMoney(data.expenses);
  const savings = parseMoney(data.savings);
  const workHours = parseFloat(data.workHours);
  const monthlyWorkHours = workHours * 4.33;

  // Working Hours and Days
  const hourlyRate = income / monthlyWorkHours;
  const hoursNeeded = purchaseValue / hourlyRate;

  // Investment Return (10% p.a. ≈ 0.8% p.m.)
  const monthlyRate = 0.008; // 0.8%
  const invested1Year = purchaseValue * Math.pow(1 + monthlyRate, 12);

  // Goal Delay
  const monthsDelayed = savings > 0 ? purchaseValue / savings : 0;
  const daysDelayed = monthsDelayed * 30;

  // Income Percentages
  const percentOfIncome = (purchaseValue / income) * 100;
  const freeIncome = income - expenses;
  const percentOfFreeIncome =
    freeIncome > 0 ? (purchaseValue / freeIncome) * 100 : 100;

  return {
    hoursNeeded: hoursNeeded.toFixed(1),
    invested1YearProfit: (invested1Year - purchaseValue).toFixed(2),
    daysDelayed: Math.round(daysDelayed).toString(),
    monthsDelayed: monthsDelayed.toFixed(1),
    percentOfIncome: percentOfIncome.toLocaleString("pt-BR", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }),
    percentOfFreeIncome: percentOfFreeIncome.toLocaleString("pt-BR", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }),
  };
}
