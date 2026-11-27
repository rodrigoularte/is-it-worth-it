import type { PropsWithChildren } from "react";

import type { InsightData } from "@/services/aiService";

function Paragraph({ children }: PropsWithChildren) {
  return (
    <p className="text-muted-foreground text-sm leading-relaxed">{children}</p>
  );
}

function Badge({ type }: { type: "safe" | "attention" | "think" | "danger" }) {
  const label = {
    safe: "Ótimo",
    attention: "Atenção",
    think: "Use com sabedoria",
    danger: "Precisa de ajuste",
  };

  return (
    <span
      className={`rounded-full px-3 pt-0.5 text-xs ${
        type === "safe"
          ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
          : type === "attention"
            ? "bg-amber-100 text-amber-700 dark:bg-amber-300 dark:text-black"
            : type === "think"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100"
              : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100"
      }`}>
      {label[type]}
    </span>
  );
}

function SectionTitle({
  title,
  badgeType,
}: {
  title: string;
  badgeType?: "safe" | "attention" | "think" | "danger";
}) {
  return (
    <div className="mt-5 mb-1.5 flex items-center gap-4">
      <h3 className="text-foreground text-sm leading-relaxed font-semibold">
        {title}
      </h3>
      {badgeType && <Badge type={badgeType} />}
    </div>
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
  percentages: {
    expenses: number;
    savings: number;
  };
}

export function InsightContent({ insight, percentages }: Props) {
  const status = statusStyles[insight.feasibility.status] ?? null;

  const expensesPercentage = percentages.expenses;
  const savingsPercentage = percentages.savings;

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
        <SectionTitle
          title="🧾 Renda para gastos essenciais"
          badgeType={
            expensesPercentage <= 50
              ? "safe"
              : expensesPercentage <= 60
                ? "attention"
                : "danger"
          }
        />
        <Paragraph>{insight.diagnosis.expenses}</Paragraph>
        <SectionTitle
          title="🛍️ Renda livre para desejos e estilo de vida"
          badgeType={
            expensesPercentage <= 50 && savingsPercentage >= 20
              ? "safe"
              : "think"
          }
        />
        <Paragraph>{insight.diagnosis.free}</Paragraph>
        <SectionTitle
          title="🏦 Renda para investimentos ou poupança"
          badgeType={
            savingsPercentage >= 20
              ? "safe"
              : savingsPercentage <= 10
                ? "danger"
                : "attention"
          }
        />
        <Paragraph>{insight.diagnosis.savings}</Paragraph>
      </section>
      <section>
        <SectionTitle title="💡 Sugestões" />
        <OrderedList items={insight.suggestions.items} />
      </section>
      <section>
        <SectionTitle title="💰 Investimento" />
        <OrderedList items={insight.investment.items} />
      </section>
      <section>
        <SectionTitle title="🏁 Conclusão" />
        <Paragraph>{insight.motivation.content}</Paragraph>
      </section>
    </div>
  );
}
