import { ShoppingCart } from "lucide-react";

import { FormStep } from "./FormStep";
import ProgressBar from "./ProgressBar";

export default function SimulationForm() {
  const stepTitle = "Já coloquei no carrinho";
  const stepQuestion = "O que você quer comprar e quanto custa?";

  return (
    <div className="w-full">
      <ProgressBar currentStep={1} totalSteps={5} />
      <FormStep
        icon={ShoppingCart}
        stepTitle={stepTitle}
        stepQuestion={stepQuestion}
        inputProps={{
          type: "text",
          placeholder: "ex: Bicicleta, R$ 500,00",
        }}
      />
    </div>
  );
}
