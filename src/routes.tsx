import { Route, Routes } from "react-router";

import Root from "./components/layout/Root";
import SimulationFormPage from "./pages/SimulationFormPage";
import SimulationHistoryPage from "./pages/SimulationHistoryPage";
import SimulationResultPage from "./pages/SimulationResultPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<SimulationFormPage />} />
        <Route path="/result/:id" element={<SimulationResultPage />} />
        <Route path="/history" element={<SimulationHistoryPage />} />
      </Route>
    </Routes>
  );
}
