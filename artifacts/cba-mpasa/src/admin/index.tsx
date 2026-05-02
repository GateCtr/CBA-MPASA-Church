import { AdminLogin } from "./components/AdminLogin";
import { AdminShell } from "./components/AdminShell";
import { useAdminSession } from "./hooks/useAdminSession";

export default function AdminApp({ onExit }: { onExit: () => void }) {
  const { session, login, logout } = useAdminSession();

  if (!session) {
    return <AdminLogin onLogin={login} onBack={onExit} />;
  }

  return <AdminShell user={session.user} onLogout={logout} onExit={onExit} />;
}
