import { Navigate, Outlet } from "react-router-dom";
import { getSessionPhone } from "../../lib/auth";
import { TabBar } from "./TabBar";

/** Logged-in layout: phone-width column + bottom tab bar. Redirects to /login without a session. */
export function PortalShell() {
  if (!getSessionPhone()) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-dvh bg-ground">
      <div className="mx-auto max-w-[480px] px-4 pt-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
        <Outlet />
      </div>
      <TabBar />
    </div>
  );
}
