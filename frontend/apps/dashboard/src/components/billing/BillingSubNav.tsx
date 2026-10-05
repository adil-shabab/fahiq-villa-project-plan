import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";

const links = [
  { to: "/billing", label: "Invoices", end: true },
  { to: "/billing/run", label: "Billing Run", end: false },
  { to: "/billing/credit-notes", label: "Credit Notes", end: false },
];

export function BillingSubNav() {
  return (
    <div className="flex gap-1 border-b border-rule">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            cn(
              "-mb-px border-b-2 px-3.5 py-2.5 text-sm font-medium",
              isActive ? "border-accent text-accent-ink" : "border-transparent text-ink-muted hover:text-ink",
            )
          }
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
}
