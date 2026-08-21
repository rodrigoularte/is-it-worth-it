import { useState } from "react";
import { useNavigate } from "react-router";

import { formSteps, type SimulationFormData } from "@/data/simulation";
import { useSimulationStorage } from "@/hooks/useSimulationStorage";

import { FormStep } from "./FormStep";
import ProgressBar from "./ProgressBar";

export default function SimulationForm() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<SimulationFormData>({});

  const navigate = useNavigate();
  const { saveFormData } = useSimulationStorage();

  const totalSteps = formSteps.length;
  const currentStep = formSteps[currentStepIndex];

  const handleNextStep = (value: string) => {
    const updatedFormData = { ...formData, [currentStep.id]: value };

    setFormData(updatedFormData);

    if (currentStepIndex + 1 > totalSteps - 1) {
      saveFormData(updatedFormData);
      void navigate("/result");
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
        currentValue={formData[currentStep.id]}
        onBack={handlePreviousStep}
        onNext={handleNextStep}
        hideBackButton={currentStepIndex === 0}
      />
    </div>
  );
}
