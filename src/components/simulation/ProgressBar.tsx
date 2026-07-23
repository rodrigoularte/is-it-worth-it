interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}
export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-6 flex w-full flex-col gap-2">
      <p className="text-primary text-sm sm:text-base">
        Passo {currentStep} de {totalSteps}
      </p>
      <div
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Passo ${currentStep} de ${totalSteps}`}
        className="bg-primary/20 h-2 w-full overflow-hidden rounded-full">
        <div
          className="bg-primary h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
