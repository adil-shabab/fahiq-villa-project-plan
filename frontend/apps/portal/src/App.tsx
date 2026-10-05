import { Navigate, Route, Routes } from "react-router-dom";
import { PortalShell } from "./components/layout/PortalShell";
import { Account } from "./pages/Account";
import { ComingSoon } from "./pages/ComingSoon";
import { Home } from "./pages/Home";
import { InvoiceDetail } from "./pages/InvoiceDetail";
import { Invoices } from "./pages/Invoices";
import { Login } from "./pages/Login";
import { VerifyOtp } from "./pages/VerifyOtp";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login/verify" element={<VerifyOtp />} />
      <Route element={<PortalShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/invoices/:id" element={<InvoiceDetail />} />
        <Route path="/tickets" element={<ComingSoon title="My Tickets" />} />
        <Route path="/documents" element={<ComingSoon title="Documents" />} />
        <Route path="/account" element={<Account />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
