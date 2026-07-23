import ProgressBar from "./ProgressBar";

export default function SimulationForm() {
  return (
    <div className="w-full">
      <ProgressBar currentStep={1} totalSteps={5} />
    </div>
  );
}
