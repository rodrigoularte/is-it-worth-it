import "react-loading-skeleton/dist/skeleton.css";

import Skeleton from "react-loading-skeleton";

import { useInsight } from "@/hooks/useInsight";

import { InsightContent } from "../Insight/Content";
import { Error } from "../Insight/Error";

interface Props {
  simulationId: string;
}

export function AIInsightCard({ simulationId }: Props) {
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId);

  return (
    <div className="order-2 col-span-1 row-span-2 h-full lg:order-1 lg:col-span-2">
      <div className="bg-card h-full rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:max-h-135">
        {isLoading ? (
          <div className="flex">
            <Skeleton
              count={10.5}
              baseColor="var(--color-skeleton-base)"
              highlightColor="var(--color-skeleton-highlight)"
              className="mb-3 flex rounded-lg"
              containerClassName="flex-1"
              inline
            />
          </div>
        ) : error ? (
          <Error
            simulationId={simulationId}
            message={error}
            onRetry={() => fetchInsight(simulationId)}
          />
        ) : (
          insight && <InsightContent insight={insight} />
        )}
      </div>
    </div>
  );
}
