import { Outlet } from "react-router";

import Header from "../ui/Header";

export default function Root() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <Outlet />
    </div>
  );
}
