import { calculatePurchaseImpact } from "@/utils/currency";

import type { SimulationRecord } from "./simulation";

const RESPONSE_SCHEMA = `{
  "feasibility": {
    "status": "safe" | "attention" | "danger",
    "content": "<
      Deve:
      1. Apresentar um diagnóstico direto sobre a viabilidade da compra hoje.
      2. Citar os valores e percentuais mais relevantes para justificar a classificação.
      3. Explicar como a compra afetaria sua organização financeira e sua capacidade de poupança.
      4. Citar quantas horas de trabalho a compra representaria para o usuário.
    >"
  },
  "diagnosis": {
    "expenses": "<Análise da porcentagem das despesas sobre a renda. Se for até 50% da renda mensal, a análise deve ser positiva. Se for entre 50% e 60%, a análise deve indicar que é necessário uma atenção maior com os gastos. Se for acima de 60%, a análise deve indicar preocupação com o equilíbrio financeiro.>",
    "free": "<Análise dos gastos livres. Analisar se com uma parte do valor da renda livre é possível economizar/investir mais ou então se dá para utilizar para o pagamento de parcelas, empréstimos e financiamentos.>",
    "savings": "<Análise da porcentagem da economia na renda. Se for 20% da renda mensal ou mais, a análise deve ser positiva. Se for entre 10% e 19%, a análise deve indicar que o usuário deve economizar mais para chegar a pelo menos 20%. Se for menor do que 10%, a análise deve indicar o quanto isso pode prejudicar o futuro e o alcance das metas.>"
  },
  "suggestions": {
    "items": ["<
    - Se o status for safe, forneça sugestões práticas sobre como o usuário pode aproveitar a sua compra.
    - Se o status for attention, forneça alternativas práticas e planos de ação, como planejar a compra para o mês seguinte ou buscar opções mais em conta. Também sugira o valor ideal para parcelar a compra se o valor da parcela for menor do que 30% da renda livre.
    - Se o status for danger, forneça sugestões de melhoria em cima da necessidade real do usuário (melhorar o orçamento, reduzir gastos desnecessários, etc.).
    >"]
  },
  "investment": {
    "items": ["<
    Mostre o quanto o valor da compra trabalharia a favor do usuário se estivesse rendendo juros e também sugestões sobre como o usuário pode usar o dinheiro que decidiu poupar para investir e maximizar o potencial de crescimento financeiro.
    >"]
  },
  "motivation": {
    "content": "<
    Conclusão final de acordo com o status:
    - safe: parabeniza o usuário por ter feito uma escolha responsável e por ter se comprometido com suas metas financeiras.
    - attention: mostre que o usuário deve pensar melhor antes de fazer a compra e que deve tomar cuidado com os gastos.
    - danger: incentive o usuário a se comprometer com a sua segurança financeira, mostrando que uma vida financeira saudável é fundamental para o bem-estar.
    >"
  }
}`;

export function buildAIPrompt(simulation: SimulationRecord) {
  const {
    purchase,
    purchaseValue,
    income,
    expenses,
    debts,
    workHours,
    savings,
  } = simulation;

  const {
    hoursNeeded,
    freeIncome,
    invested1YearProfit,
    purchaseFreeIncomePercentage,
    freeIncomePercentage,
    expensesPercentage,
    savingsPercentage,
  } = calculatePurchaseImpact(simulation);

  return `Você é um especialista em educação financeira.
    Analise os dados abaixo e gere um diagnóstico financeiro personalizado com linguagem clara, didática e reflexiva,
    voltado para pessoas que querem saber se a compra que querem fazer é uma boa decisão.
		O diagnóstico será exibido diretamente ao usuário no app.
		Fale sempre em segunda pessoa ("você tem...", "sua meta...").

    Dados da simulação:
		- Item que o usuário quer comprar: ${purchase}
		- Valor da compra: ${purchaseValue} reais
    - Renda mensal bruta: ${income} reais
		- Horas trabalhadas por semana: ${workHours}
    - Renda livre que representa o valor que sobra após descontar despesas essenciais,
  dívidas e economia mensal: ${freeIncome}
    - Custos fixos essenciais: ${expenses} reais
    - Renda comprometida com pagamento de parcelas, empréstimos e financiamentos : ${debts} reais
    - Economia mensal: ${savings} reais
		- Horas de trabalho para conseguir o valor da compra: ${hoursNeeded}
		- Quanto o valor da compra renderia em 1 ano (10% p.a. ≈ 0.8% p.m.): ${invested1YearProfit}
		- Porcentagem da compra sobre o total da renda livre que sobra no mês: ${purchaseFreeIncomePercentage}
    - Porcentagem da renda livre: ${freeIncomePercentage}
    - Porcentagem das despesas na renda: ${expensesPercentage}
    - Porcentagem da economia na renda: ${savingsPercentage}

    Retorne APENAS um JSON válido, sem texto adicional, sem blocos de código, neste formato exato:

    ${RESPONSE_SCHEMA}

    Regras:
    - Todos os textos em português do Brasil.
    - Máximo de 4 itens por lista.
    - Seja específico ao citar valores calculados.
    - Não repita informações entre seções.
    - Nunca use markdown dentro dos valores do JSON.
    - Para o campo "feasibility.status", avalie a viabilidade financeira da compra considerando dois aspectos: o impacto da compra sobre sua renda livre e a saúde financeira geral.
      1. Utilize o método 50/30/20 como referência:
        - 50% da renda para custos fixos essenciais.
        - 30% da renda para desejos e estilo de vida.
        - 20% da renda para economia.
      2. Classifique utilizando os seguintes critérios:
        - "safe": a compra consome até 30% da renda livre mensal, suas despesas essenciais estão próximas ou abaixo de 50% da renda e o usuário consegue manter uma economia mensal de pelo menos 20%. Então vale a pena.
        - "attention": a compra consome entre 31% e 70% da renda livre, OU sua economia mensal está menor que 20%, OU suas despesas essenciais ultrapassam 50% da renda. A compra pode ser viável, mas é necessário pensar mais. Deve-se priorizar o ajuste no(s) índice(s) que fez/fizeram essa classificação ser a escolhida.
        - "danger": a compra consome mais de 71% da renda livre, OU sua economia mensal está abaixo de 10%, OU suas despesas essenciais ultrapassam 60% da renda. A compra não vale a pena.
      3. Em caso de conflito entre os critérios, sempre prevalece a classificação mais preocupante.
      `;
}
