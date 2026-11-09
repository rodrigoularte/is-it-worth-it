import { calculatePurchaseImpact } from "@/utils/currency";

import type { SimulationRecord } from "./simulation";

const RESPONSE_SCHEMA = `{
  "feasibility": {
    "status": "safe" | "attention" | "danger",
    "content": "<Análise objetiva informando se a compra é segura para o bolso do usuário hoje ou se representa um risco de descontrole>"
  },
  "diagnosis": {
    "content": "<Um raio-x financeiro que mostra o peso real desse gasto sobre o dinheiro que efetivamente sobra no mês e o que isso representa para a saúde financeira>"
  },
  "suggestions": {
    "items": ["<Alternativas práticas e planos de ação, como planejar a compra para o mês seguinte ou buscar opções mais em conta>"]
  },
  "investment": {
    "items": ["<A demonstração do "custo de oportunidade", revelando o quanto esse dinheiro trabalharia a favor do usuário se estivesse rendendo juros, com foco em atingir a meta>"]
  },
  "motivation": {
    "content": "<Mensagem final motivacional e personalizada, que conecta o esforço de não comprar agora com a satisfação de chegar mais rápido ao seu grande sonho, citando a meta pelo nome>"
  }
}`;

export function buildAIPrompt(simulation: SimulationRecord) {
  const {
    purchase,
    purchaseValue,
    income,
    expenses,
    workHours,
    goal,
    goalValue,
    savings,
  } = simulation;

  const {
    hoursNeeded,
    invested1YearProfit,
    daysDelayed,
    percentOfIncome,
    percentOfFreeIncome,
  } = calculatePurchaseImpact(simulation);

  return `Você é um especialista em educação financeira.
    Analise os dados abaixo e gere um diagnóstico financeiro personalizado com linguagem clara, didática e reflexiva,
    voltado para pessoas que tendem a fazer compras por impulso e tendem a gastar dinheiro sem pensar se é uma boa decisão.
		O diagnóstico será exibido diretamente ao usuário no app.
		Fale sempre em segunda pessoa ("você tem...", "sua meta...").

    Dados da simulação:
		- Item que o usuário quer comprar: ${purchase}
		- Valor da compra: ${purchaseValue} reais
    - Renda mensal bruta: ${income} reais
    - Custos fixos essenciais: ${expenses} reais
		- Horas trabalhadas por semana: ${workHours}
    - Meta: ${goal}
    - Custo da meta: ${goalValue}
    - Economia mensal para alcançar a meta: ${savings} reais
		- Horas de trabalho para conseguir o valor da compra: ${hoursNeeded}
		- Quanto o valor da compra renderia em 1 ano (10% p.a. ≈ 0.8% p.m.): ${invested1YearProfit}
		- Dias de atraso para alcançar a meta: ${daysDelayed}
		- Porcentagem da compra no total da renda mensal bruta: ${percentOfIncome}
		- Porcentagem da compra no total livre que sobra no mês: ${percentOfFreeIncome}

    Retorne APENAS um JSON válido, sem texto adicional, sem blocos de código, neste formato exato:

    ${RESPONSE_SCHEMA}

    Regras:
    - Todos os textos em português do Brasil.
    - Máximo de 4 itens por lista.
    - Seja específico ao citar valores calculados.
    - Não repita informações entre seções.
    - Nunca use markdown dentro dos valores do JSON.
    - Para o campo "feasibility.status", use os seguintes critérios:
      - "safe": a compra consome menos de 30% do total livre que sobra no mês E o atraso da meta é inferior a 30 dias.
      - "attention": a compra consome entre 30% e 70% do total livre que sobra no mês OU o atraso da meta fica entre 30 e 90 dias.
      - "danger": A compra consome mais de 70% do total livre que sobra no mês OU o atraso da meta é superior a 90 dias.`;
}
