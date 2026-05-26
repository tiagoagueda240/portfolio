import { signOut } from "firebase/auth";
import {
  Briefcase,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings2,
  User,
  Wrench,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";

const NAV = [
  { to: "/admin", end: true, icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/perfil", icon: User, label: "Perfil" },
  { to: "/admin/projetos", icon: FolderOpen, label: "Projetos" },
  { to: "/admin/experiencia", icon: Briefcase, label: "Experiência" },
  { to: "/admin/educacao", icon: GraduationCap, label: "Educação" },
  { to: "/admin/skills", icon: Wrench, label: "Skills" },
  { to: "/admin/config", icon: Settings2, label: "Configuração" },
];

export const AdminLayout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#050508] flex text-slate-200">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-[#080810] border-r border-slate-800/80 flex flex-col py-6 px-3">
        <div className="px-3 mb-8">
          <span className="text-sm font-bold text-white">Portfolio Admin</span>
          <p className="text-xs text-slate-500 mt-0.5">Gestão de conteúdo</p>
        </div>

        <nav className="flex-grow space-y-1">
          {NAV.map(({ to, end, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <LogOut size={16} />
          Sair
        </button>
      </aside>

      {/* Conteúdo */}
      <main className="flex-grow overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};
