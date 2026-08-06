import { useState } from "react";

import { formSteps } from "@/data/simulation";

import { FormStep } from "./FormStep";
import ProgressBar from "./ProgressBar";

export default function SimulationForm() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const totalSteps = formSteps.length;
  const currentStep = formSteps[currentStepIndex];

  const handleNextStep = () => {
    if (currentStepIndex + 1 > totalSteps - 1) {
      return;
    }

    setCurrentStepIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousStep = () => {
    if (currentStepIndex === 0) {
      return;
    }

    setCurrentStepIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <div className="w-full">
      <ProgressBar currentStep={currentStepIndex + 1} totalSteps={totalSteps} />
      <FormStep
        key={currentStep.id}
        {...currentStep}
        onBack={handlePreviousStep}
        onNext={handleNextStep}
        hideBackButton={currentStepIndex === 0}
      />
    </div>
  );
}
