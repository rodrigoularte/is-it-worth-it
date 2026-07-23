import SimulationForm from "@/components/simulation/SimulationForm";
import SimulationHero from "@/components/simulation/SimulationHero";

export default function SimulationFormPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <SimulationHero />
      <SimulationForm />
    </main>
  );
}
