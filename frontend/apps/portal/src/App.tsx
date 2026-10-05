import { Navigate, Route, Routes } from "react-router-dom";
import { PortalShell } from "./components/layout/PortalShell";
import { Account } from "./pages/Account";
import { Announcements } from "./pages/Announcements";
import { DocumentViewer } from "./pages/DocumentViewer";
import { Documents } from "./pages/Documents";
import { Home } from "./pages/Home";
import { InvoiceDetail } from "./pages/InvoiceDetail";
import { Invoices } from "./pages/Invoices";
import { Login } from "./pages/Login";
import { RaiseTicket } from "./pages/RaiseTicket";
import { ReferFriend } from "./pages/ReferFriend";
import { TicketDetail } from "./pages/TicketDetail";
import { Tickets } from "./pages/Tickets";
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
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/new" element={<RaiseTicket />} />
        <Route path="/tickets/:id" element={<TicketDetail />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/documents/:docId" element={<DocumentViewer />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/announcements" element={<Announcements />} />
        <Route path="/account/refer" element={<ReferFriend />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
