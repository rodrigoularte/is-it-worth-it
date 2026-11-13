import { RefreshCw } from "lucide-react";

import Button from "../ui/Button";

interface Props {
  simulationId: string;
  message: string;
  onRetry: () => void;
}

export function Error({ simulationId, message, onRetry }: Props) {
  if (!simulationId || !message) {
    return (
      <div>
        <p>Ocorreu um erro inesperado</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
      <p className="text-sm text-red-500">⚠️ {message}</p>
      <Button
        variant="primary"
        className="px-6"
        icon={RefreshCw}
        onClick={onRetry}>
        Tentar novamente
      </Button>
    </div>
  );
}
