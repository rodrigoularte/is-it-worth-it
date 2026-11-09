import { useCallback, useEffect, useRef, useState } from "react";

import { buildAIPrompt } from "@/data/aiPrompt";
import { getInsight, type InsightData } from "@/services/aiService";

import { useSimulationStorage } from "./useSimulationStorage";

export const useInsight = (id: string) => {
  const isRequestPending = useRef(false);

  const [insight, setInsight] = useState<InsightData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { getFormData } = useSimulationStorage();

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
        return data;
      } catch {
        setError("Erro ao gerar a simulação. Tente novamente.");
      } finally {
        isRequestPending.current = false;
        setIsLoading(false);
      }
    },
    [getFormData],
  );

  useEffect(() => {
    if (insight || isLoading || error || isRequestPending.current) {
      return;
    }

    fetchInsight(id);
  }, [id, insight, isLoading, error, fetchInsight]);

  return { insight, isLoading, error, fetchInsight };
};
