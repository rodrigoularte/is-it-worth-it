import { useCallback, useEffect, useRef, useState } from "react";

import { buildAIPrompt } from "@/data/aiPrompt";
import type { SimulationRecord } from "@/data/simulation";
import { getInsight, type InsightData } from "@/services/aiService";

import { useSimulationStorage } from "./useSimulationStorage";

export const useInsight = (id: string) => {
  const isRequestPending = useRef(false);
  const { getFormData, updateSimulation } = useSimulationStorage();

  const [insight, setInsight] = useState<InsightData | null>(() => {
    const simulation = getFormData(id);
    return simulation?.insight || null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormData(simulationId);

      if (!simulation) {
        setError("Simulação não encontrada");
        return;
      }

      isRequestPending.current = true;

      setIsLoading(true);
      setError(null);

      try {
        const prompt = buildAIPrompt(simulation);
        const data = await getInsight(prompt);
        setInsight(data);

        updateSimulation(simulationId, {
          ...simulation,
          insight: data,
        } as SimulationRecord);
      } catch {
        setError("Erro ao gerar a simulação. Tente novamente.");
      } finally {
        isRequestPending.current = false;
        setIsLoading(false);
      }
    },
    [getFormData, updateSimulation],
  );

  useEffect(() => {
    if (insight || isLoading || error || isRequestPending.current) {
      return;
    }

    fetchInsight(id);
  }, [id, insight, isLoading, error, fetchInsight]);

  return { insight, isLoading, error, fetchInsight };
};
