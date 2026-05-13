import { Outlet } from "react-router-dom";
import { useApp } from "@/context/app-context";
import { classNames } from "@/lib/utils";

export function AuthLayout() {
  const { theme } = useApp();

  return (
    <main
      className={classNames(
        theme === "dark" && "dark",
        "min-h-screen overflow-hidden bg-background text-foreground",
      )}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,.24),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,.18),transparent_30%)]" />
      <Outlet />
    </main>
  );
}
