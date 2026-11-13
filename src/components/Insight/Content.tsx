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
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  attention: {
    label: "Pense um pouco mais",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  danger: {
    label: "Não vale a pena",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
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
          <span className="text-foreground text-sm font-semibold">
            Vale a pena?
          </span>
          {status && (
            <span
              className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.className}`}>
              {status.label}
            </span>
          )}
        </div>
        <Paragraph>{insight.feasibility.content}</Paragraph>
      </section>
      <section>
        <SectionTitle>📊 Raio-X Financeiro</SectionTitle>
        <Paragraph>{insight.diagnosis.content}</Paragraph>
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
