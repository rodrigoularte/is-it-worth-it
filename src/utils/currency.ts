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

function formatPercentage(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
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
  const debts = parseMoney(data.debts);
  const savings = parseMoney(data.savings);
  const workHours = parseFloat(data.workHours);
  const monthlyWorkHours = workHours * 4.33;

  // Working Hours and Days
  const hourlyRate = income / monthlyWorkHours;
  const hoursNeeded = purchaseValue / hourlyRate;

  // Investment Return (10% p.a. ≈ 0.8% p.m.)
  const monthlyRate = 0.008; // 0.8%
  const invested1Year = purchaseValue * Math.pow(1 + monthlyRate, 12);

  // Income Percentages
  const expensesTotal = expenses + debts;
  const freeIncome = income - (expenses + debts + savings);
  const purchaseFreeIncomePercentage =
    freeIncome > 0 ? (purchaseValue / freeIncome) * 100 : 100;
  const freeIncomePercentage = (freeIncome / income) * 100;
  const expensesPercentage = (expenses / income) * 100;
  const savingsPercentage = (savings / income) * 100;

  return {
    hoursNeeded: hoursNeeded.toFixed(1),
    invested1YearProfit: (invested1Year - purchaseValue).toFixed(2),
    expensesTotal: formatCurrencyMask(expensesTotal.toFixed(2)),
    freeIncome: formatCurrencyMask(freeIncome.toFixed(2)),
    purchaseFreeIncomePercentage: formatPercentage(
      purchaseFreeIncomePercentage,
    ),
    freeIncomePercentage,
    expensesPercentage,
    savingsPercentage,
  };
}
