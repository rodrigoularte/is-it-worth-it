import { useInsight } from "@/hooks/useInsight";

interface Props {
  simulationId: string;
}

export function AIInsightCard({ simulationId }: Props) {
  const { insight } = useInsight(simulationId);

  return (
    <div className="order-2 col-span-1 row-span-2 h-full lg:order-1 lg:col-span-2">
      <div className="bg-card h-full rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
        <h2 className="text-foreground mb-1 text-2xl font-semibold sm:text-3xl">
          Vale a pena?
        </h2>
        <p>{insight?.feasibility.content}</p>
      </div>
    </div>
  );
}
