import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import FloatingActionButton from "./components/FloatingActionButton";
import Layout from "./components/Layout";
import { ToastProvider } from "./components/Toast";
import Alerts from "./pages/Alerts";
import Dashboard from "./pages/Dashboard";
import FarmComparison from "./pages/FarmComparison";
import Farms from "./pages/Farms";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import "./styles.css";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/farms" element={<Layout><Farms /></Layout>} />
          <Route path="/comparison" element={<Layout><FarmComparison /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="/alerts" element={<Layout><Alerts /></Layout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <FloatingActionButton />
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;