import { ChartLine, Clock, Sun, Wallet } from "lucide-react";
import { Link } from "react-router";

import Button from "./Button";

export default function Header() {
  return (
    <header className="border-border w-full border-b px-3 py-4 sm:px-6">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full">
            <Wallet size={20} className="text-primary-foreground" />
          </div>
          <span className="text-foreground hidden text-lg font-bold sm:inline">
            Vale a Pena?
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex gap-2 pr-1">
            <Button variant="secondary" icon={ChartLine}>
              <Link to="/">Nova Simulação</Link>
            </Button>
            <Button variant="ghost" icon={Clock}>
              <Link to="/history">Histórico</Link>
            </Button>
          </div>
          <div className="border-l-border border-l pl-1">
            <Button variant="ghost" icon={Sun} />
          </div>
        </div>
      </nav>
    </header>
  );
}
