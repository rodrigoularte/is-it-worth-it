import {
  CircleDollarSign,
  Clock,
  CreditCard,
  PiggyBank,
  Receipt,
  ShoppingCart,
  Sparkles,
  Wallet,
} from "lucide-react";

import type { FormStepProps } from "@/components/simulation/FormStep";
import type { InsightData } from "@/services/aiService";

export const formSteps = [
  {
    id: "purchase",
    icon: ShoppingCart,
    stepTitle: "Já coloquei no carrinho",
    stepQuestion: "O que você quer comprar?",
    inputProps: {
      type: "text",
      placeholder: "ex: Bicicleta",
      maxLength: 100,
    },
  },
  {
    id: "purchaseValue",
    icon: CircleDollarSign,
    stepTitle: "Custo",
    stepQuestion: "Qual é o valor da compra?",
    inputProps: {
      type: "text",
      placeholder: "ex: 500,00",
      prefix: "R$",
      maxLength: 12,
      isCurrency: true,
    },
  },
  {
    id: "income",
    icon: Wallet,
    stepTitle: "Renda Mensal",
    stepQuestion: "Quanto você recebe livre na sua conta por mês?",
    inputProps: {
      type: "text",
      placeholder: "ex: 3.000,00",
      prefix: "R$",
      maxLength: 12,
      isCurrency: true,
    },
  },
  {
    id: "workHours",
    icon: Clock,
    stepTitle: "Jornada de Trabalho",
    stepQuestion: "Quantas horas você trabalha por semana?",
    inputProps: {
      type: "text",
      placeholder: "ex: 40",
      suffix: "horas",
      maxLength: 2,
    },
  },
  {
    id: "expenses",
    icon: Receipt,
    stepTitle: "Despesas Fixas",
    stepQuestion:
      "Aproximadamente quanto você gasta por mês com contas e despesas essenciais?",
    inputProps: {
      type: "text",
      placeholder: "ex: 2.000,00",
      prefix: "R$",
      maxLength: 12,
      isCurrency: true,
    },
  },
  {
    id: "debts",
    icon: CreditCard,
    stepTitle: "Renda comprometida",
    stepQuestion:
      "Quanto da renda é gasto com o pagamento de parcelas, empréstimos e financiamentos?",
    inputProps: {
      type: "text",
      placeholder: "ex: 500,00",
      prefix: "R$",
      maxLength: 12,
      isCurrency: true,
    },
  },
  {
    id: "savings",
    icon: PiggyBank,
    stepTitle: "Economia Mensal",
    stepQuestion:
      "Quanto você consegue guardar por mês para poupança ou investimento?",
    inputProps: {
      type: "text",
      placeholder: "ex: 300,00",
      prefix: "R$",
      maxLength: 12,
      isCurrency: true,
    },
    submitButtonProps: {
      label: "Gerar simulação",
      Icon: Sparkles,
    },
  },
] satisfies FormStepProps[];

export type SimulationFormData = Record<
  (typeof formSteps)[number]["id"],
  string
>;

export type SimulationRecord = SimulationFormData & {
  id: string;
  insight?: InsightData;
};
