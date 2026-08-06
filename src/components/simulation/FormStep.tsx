import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";
import { useState } from "react";

import Button from "../ui/Button";
import Input, { type InputProps } from "../ui/Input";

export interface FormStepProps {
  id: string;
  icon: LucideIcon;
  stepTitle: string;
  stepQuestion: string;
  inputProps: InputProps;
  submitButtonProps?: {
    label: string;
    Icon: LucideIcon;
  };
}

interface ActionButtonProps {
  hideBackButton: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function FormStep({
  icon: Icon,
  stepTitle,
  stepQuestion,
  inputProps,
  submitButtonProps,
  hideBackButton,
  onBack,
  onNext,
}: FormStepProps & ActionButtonProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue) {
      return;
    }

    onNext();
  };

  return (
    <div className="bg-card rounded-[22px] p-10 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <div className="bg-primary mb-4 flex h-15 w-15 items-center justify-center rounded-2xl">
        <Icon size={40} className="text-primary-foreground" />
      </div>
      <div>
        <h2 className="text-primary mb-3 text-sm font-semibold uppercase sm:text-[16px]">
          {stepTitle}
        </h2>
        <h3 className="text-foreground mb-7 text-xl font-semibold sm:text-[22px]">
          {stepQuestion}
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <Input
            {...inputProps}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="flex flex-col gap-6 sm:flex-row">
            {!hideBackButton && (
              <Button
                type="button"
                variant="ghost"
                className="order-2 flex-1 py-3 sm:order-1"
                icon={ArrowLeft}
                onClick={onBack}>
                Voltar
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              className="order-1 flex-1 py-3 sm:order-2"
              icon={submitButtonProps?.Icon || ArrowRight}
              iconOnRight
              disabled={!inputValue}>
              {submitButtonProps?.label || "Próximo"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
