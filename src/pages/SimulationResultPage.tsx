import {
  ChartPie,
  CircleAlert,
  Goal,
  PiggyBank,
  Receipt,
  ShoppingCart,
  Wallet,
} from "lucide-react";
import { Link, useParams } from "react-router";

import Card from "@/components/simulationResults/Card";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import { useSimulationStorage } from "@/hooks/useSimulationStorage";
import { addCurrencySymbol, calculatePurchaseImpact } from "@/utils/currency";

export default function SimulationResultPage() {
  const { id } = useParams<{ id: string }>();

  const { getFormData } = useSimulationStorage();

  const data = id ? getFormData(id) : null;

  if (!data) {
    return (
      <main className="mx-auto flex h-full w-full max-w-6xl flex-1 flex-col justify-center px-4 py-10 sm:py-12">
        <span className="text-primary mx-auto">
          <CircleAlert size={32} />
        </span>
        <p className="mx-auto mt-4 text-xl font-semibold">
          Simulação não encontrada
        </p>
        <div className="mx-auto mt-10">
          <Button variant="primary">
            <Link to="/"> Comece uma nova simulação</Link>
          </Button>
        </div>
      </main>
    );
  }

  const { percentOfFreeIncome } = calculatePurchaseImpact(data);

  return (
    <main className="mx-auto flex h-full w-full max-w-6xl flex-1 flex-col px-4 py-10 sm:py-12">
      <PageHero
        title="Resultado da sua simulação"
        subtitle="Com base no seu perfil financeiro e objetivos."
      />
      <div>
        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card
            icon={ShoppingCart}
            label="Compra"
            value={addCurrencySymbol(data.purchaseValue)}
            subtitle={data.purchase}
          />
          <Card
            icon={Goal}
            label="Objetivo atual"
            value={addCurrencySymbol(data.goalValue)}
            subtitle={data.goal}
          />
          <Card
            icon={ChartPie}
            label="Essa compra consome"
            value={`${percentOfFreeIncome}%`}
            subtitle="do que sobra no seu mês!"
            variant="primary"
          />
          <div className="order-2 col-span-1 row-span-2 h-full lg:order-1 lg:col-span-2">
            <div className="bg-card h-full rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
              <h2 className="text-foreground mb-1 text-2xl font-semibold sm:text-3xl">
                Vale a pena?
              </h2>
            </div>
          </div>
          <div className="bg-card order-1 row-span-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-2">
            <h2 className="text-foreground mb-1 text-2xl font-semibold sm:text-3xl">
              Resumo
            </h2>
            <Card
              icon={Wallet}
              label="Renda Mensal"
              value={addCurrencySymbol(data.income)}
              subtitle="Valor bruto recebido"
              variant="ghost"
            />
            <Card
              icon={Receipt}
              label="Despesas Fixas"
              value={addCurrencySymbol(data.expenses)}
              subtitle="Gastos essenciais"
              variant="ghost"
            />
            <Card
              icon={PiggyBank}
              label="Economia Mensal"
              value={addCurrencySymbol(data.savings)}
              subtitle="Quanto vai para o cofrinho"
              variant="ghost"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
