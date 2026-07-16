import { Route, Routes } from "react-router";

import App from "./App";
import Root from "./components/layout/Root";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<App />} />
      </Route>
    </Routes>
  );
}
