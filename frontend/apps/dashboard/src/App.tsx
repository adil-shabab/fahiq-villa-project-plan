import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { navItems } from "./data/nav";
import { BillingRun } from "./pages/BillingRun";
import { ComingSoon } from "./pages/ComingSoon";
import { CreditNotesList } from "./pages/CreditNotesList";
import { DashboardHome } from "./pages/DashboardHome";
import { Documents } from "./pages/Documents";
import { Finance } from "./pages/Finance";
import { InvoiceDetail } from "./pages/InvoiceDetail";
import { InvoicesList } from "./pages/InvoicesList";
import { Collections } from "./pages/Collections";
import { Leads } from "./pages/Leads";
import { Maintenance } from "./pages/Maintenance";
import { Messaging } from "./pages/Messaging";
import { OnboardingList } from "./pages/OnboardingList";
import { OnboardingWizard } from "./pages/OnboardingWizard";
import { Payments } from "./pages/Payments";
import { PropertiesList } from "./pages/PropertiesList";
import { PropertyDetail } from "./pages/PropertyDetail";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";
import { TenanciesList } from "./pages/TenanciesList";
import { TenancyDetail } from "./pages/TenancyDetail";
import { Users } from "./pages/Users";
import { WebsiteListings } from "./pages/WebsiteListings";

const builtRoutes = new Set([
  "/",
  "/listings",
  "/properties",
  "/leads",
  "/onboarding",
  "/tenancies",
  "/billing",
  "/payments",
  "/maintenance",
  "/collections",
  "/messaging",
  "/finance",
  "/reports",
  "/documents",
  "/settings",
  "/users",
]);

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/properties" element={<PropertiesList />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/listings" element={<WebsiteListings />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/onboarding" element={<OnboardingList />} />
        <Route path="/onboarding/:id" element={<OnboardingWizard />} />
        <Route path="/tenancies" element={<TenanciesList />} />
        <Route path="/tenancies/:id" element={<TenancyDetail />} />
        <Route path="/billing" element={<InvoicesList />} />
        <Route path="/billing/run" element={<BillingRun />} />
        <Route path="/billing/credit-notes" element={<CreditNotesList />} />
        <Route path="/billing/:id" element={<InvoiceDetail />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/messaging" element={<Messaging />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/users" element={<Users />} />
        {navItems
          .filter((item) => !builtRoutes.has(item.href))
          .map((item) => (
            <Route key={item.id} path={item.href} element={<ComingSoon title={item.label} />} />
          ))}
      </Routes>
    </AppShell>
  );
}

export default App;
