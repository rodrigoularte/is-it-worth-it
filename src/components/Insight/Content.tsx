import type { PropsWithChildren } from "react";

import type { InsightData } from "@/services/aiService";

function Paragraph({ children }: PropsWithChildren) {
  return (
    <p className="text-muted-foreground text-sm leading-relaxed">{children}</p>
  );
}

function SectionTitle({ children }: PropsWithChildren) {
  return (
    <h3 className="text-foreground mt-5 mb-1.5 text-sm leading-relaxed font-semibold">
      {children}
    </h3>
  );
}

function OrderedList({ items }: { items: string[] }) {
  return (
    <ol className="text-muted-foreground ml-6 list-decimal text-sm leading-relaxed">
      {items.map((item, index) => (
        <li key={index} className="pl-1">
          {item}
        </li>
      ))}
    </ol>
  );
}

const statusStyles = {
  safe: {
    label: "Vale a pena!",
    className: "text-green-700 dark:text-green-400",
  },
  attention: {
    label: "Pense um pouco mais",
    className: "text-amber-700 dark:text-amber-400",
  },
  danger: {
    label: "Não vale a pena",
    className: "text-red-700 dark:text-red-400",
  },
};

interface Props {
  insight: InsightData;
}

export function InsightContent({ insight }: Props) {
  const status = statusStyles[insight.feasibility.status] ?? null;
  return (
    <div className="lg:max-h-full lg:scrollbar-thin lg:[scrollbar-color:var(--border)_transparent] lg:overflow-y-auto lg:pr-2">
      <section className="flex flex-col gap-2">
        <div className="flex flex-col items-start gap-2 sm:flex-row">
          {status && (
            <h2
              className={`w-fit rounded-full py-0.5 text-2xl font-semibold ${status.className}`}>
              {status.label}
            </h2>
          )}
        </div>
        <Paragraph>{insight.feasibility.content}</Paragraph>
      </section>
      <section>
        <SectionTitle>
          🧾 Avaliação da renda para gastos essenciais
        </SectionTitle>
        <Paragraph>{insight.diagnosis.expenses}</Paragraph>
        <SectionTitle>
          🛍️ Avaliação da renda livre para desejos e estilo de vida
        </SectionTitle>
        <Paragraph>{insight.diagnosis.free}</Paragraph>
        <SectionTitle>
          🏦 Avaliação da renda para investimentos ou poupança
        </SectionTitle>
        <Paragraph>{insight.diagnosis.savings}</Paragraph>
      </section>
      <section>
        <SectionTitle>💡 Sugestões</SectionTitle>
        <OrderedList items={insight.suggestions.items} />
      </section>
      <section>
        <SectionTitle>💰 Investimento</SectionTitle>
        <OrderedList items={insight.investment.items} />
      </section>
      <section>
        <SectionTitle>🏁 Conclusão</SectionTitle>
        <Paragraph>{insight.motivation.content}</Paragraph>
      </section>
    </div>
  );
}
