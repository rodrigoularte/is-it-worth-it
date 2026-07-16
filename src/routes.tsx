import { Route, Routes } from "react-router";

import App from "./App";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<App />} />
      </Routes>
    </>
  );
}
