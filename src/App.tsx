import { Navigate, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { AppProvider, useApp } from "@/context/app-context";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { AuthPage } from "@/pages/AuthPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { RoutesPage } from "@/pages/RoutesPage";
import { StopsPage } from "@/pages/StopsPage";
import { CheckInPage } from "@/pages/CheckInPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { RankingPage } from "@/pages/RankingPage";
import { HistoryPage } from "@/pages/HistoryPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { BlockedAdminPage } from "@/pages/BlockedAdminPage";
import { AdminPage } from "@/pages/admin/AdminPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session } = useApp();
  if (!session) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { session } = useApp();
  if (!session) return <Navigate to="/" replace />;
  if (session.role !== "admin") return <Navigate to="/admin/blocked" replace />;
  return <>{children}</>;
}

function GuestRoute({ children }: { children: React.ReactNode }) {
  const { session } = useApp();
  if (session) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <AuthLayout />
            </GuestRoute>
          }
        >
          <Route index element={<AuthPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/stops" element={<StopsPage />} />
          <Route path="/checkin" element={<CheckInPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/admin/blocked" element={<BlockedAdminPage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppProvider>
  );
}
