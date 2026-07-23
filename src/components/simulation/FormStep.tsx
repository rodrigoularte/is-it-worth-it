import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";

import Button from "../ui/Button";
import Input, { type InputProps } from "../ui/Input";

interface FormStepProps {
  icon: LucideIcon;
  stepTitle: string;
  stepQuestion: string;
  inputProps: InputProps;
}

export function FormStep({
  icon: Icon,
  stepTitle,
  stepQuestion,
  inputProps,
}: FormStepProps) {
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
        <form className="flex flex-col gap-10">
          <Input {...inputProps} />
          <div className="flex flex-col gap-6 sm:flex-row">
            <Button
              type="button"
              variant="ghost"
              className="order-2 flex-1 py-3 sm:order-1"
              icon={ArrowLeft}>
              Voltar
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="order-1 flex-1 py-3 sm:order-2"
              icon={ArrowRight}
              iconOnRight
              disabled>
              Próximo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
