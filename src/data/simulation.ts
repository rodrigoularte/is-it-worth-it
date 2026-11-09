import {
  CircleDollarSign,
  Clock,
  PiggyBank,
  Receipt,
  ShoppingCart,
  Sparkles,
  Target,
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
  // {
  //   id: "payment",
  //   icon: CreditCard,
  //   stepTitle: "Pagamento",
  //   stepQuestion: "Como pretende pagar esta compra?",
  //   inputProps: {
  //     type: "text",
  //     placeholder: "ex: À vista, Parcelado em 6x",
  //     maxLength: 50,
  //   },
  // },
  // {
  //   id: "motivation",
  //   icon: HelpCircle,
  //   stepTitle: "Motivação",
  //   stepQuestion: "Qual a real necessidade desta compra agora?",
  //   inputProps: {
  //     type: "text",
  //     placeholder:
  //       "ex: Necessidade real, Desejo do momento, ou Estou na dúvida",
  //     maxLength: 50,
  //   },
  // },
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
    id: "goal",
    icon: Target,
    stepTitle: "Sua Meta",
    stepQuestion: "Qual o seu maior sonho ou meta atual?",
    inputProps: {
      type: "text",
      placeholder: "ex: Viagem para o Japão",
      maxLength: 100,
    },
  },
  {
    id: "goalValue",
    icon: CircleDollarSign,
    stepTitle: "Sua Meta",
    stepQuestion: "Quanto custa realizar esse sonho ou meta?",
    inputProps: {
      type: "text",
      placeholder: "ex: 15.000",
      prefix: "R$",
      maxLength: 12,
      isCurrency: true,
    },
  },
  {
    id: "savings",
    icon: PiggyBank,
    stepTitle: "Economia Mensal",
    stepQuestion: "Quanto você consegue guardar por mês para essa meta?",
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
