export interface InsightData {
  feasibility: {
    status: "safe" | "attention" | "danger";
    content: string;
  };
  diagnosis: {
    expenses: string;
    free: string;
    savings: string;
  };
  suggestions: {
    items: string[];
  };
  investment: {
    items: string[];
  };
  motivation: {
    content: string;
  };
}

export const getInsight = async (prompt: string): Promise<InsightData> => {
  const response = await fetch("/api/generate-insight", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate insight");
  }

  const data: { result: string } = await response.json();

  return JSON.parse(data.result) as InsightData;
};
