import {
  Clock,
  CreditCard,
  HelpCircle,
  PiggyBank,
  Receipt,
  ShoppingCart,
  Sparkles,
  Target,
  Wallet,
} from "lucide-react";

import type { FormStepProps } from "@/components/simulation/FormStep";

export const formSteps: FormStepProps[] = [
  {
    id: "purchase",
    icon: ShoppingCart,
    stepTitle: "Já coloquei no carrinho",
    stepQuestion: "O que você quer comprar e quanto custa?",
    inputProps: {
      type: "text",
      placeholder: "ex: Bicicleta, R$ 500,00",
      maxLength: 100,
    },
  },
  {
    id: "payment",
    icon: CreditCard,
    stepTitle: "Pagamento",
    stepQuestion: "Como pretende pagar esta compra?",
    inputProps: {
      type: "text",
      placeholder: "ex: À vista, Parcelado em 6x",
      maxLength: 50,
    },
  },
  {
    id: "motivation",
    icon: HelpCircle,
    stepTitle: "Motivação",
    stepQuestion: "Qual a real necessidade desta compra agora?",
    inputProps: {
      type: "text",
      placeholder:
        "ex: Necessidade real, Desejo do momento, ou Estou na dúvida",
      maxLength: 50,
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
    },
  },
  {
    id: "work-hours",
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
    stepQuestion: "Qual o seu maior sonho ou meta atual e quanto ele custa?",
    inputProps: {
      type: "text",
      placeholder: "ex: Viagem para o Japão, R$ 15.000",
      maxLength: 100,
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
    },
    submitButtonProps: {
      label: "Gerar simulação",
      Icon: Sparkles,
    },
  },
];
