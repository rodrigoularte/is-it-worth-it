import { Route, Routes } from "react-router";

import Root from "./components/layout/Root";
import SimulationFormPage from "./pages/SimulationFormPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<SimulationFormPage />} />
      </Route>
    </Routes>
  );
}
