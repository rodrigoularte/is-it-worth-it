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
    <div className="flex w-full flex-col gap-2">
      <p className="text-primary text-sm sm:text-base">
        Passo {currentStep} de {totalSteps}
      </p>
      <div className="bg-primary/20 h-2 w-full rounded-full">
        <div
          className="bg-primary h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
