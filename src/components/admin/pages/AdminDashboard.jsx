import { collection, onSnapshot, query } from "firebase/firestore";
import {
  Briefcase,
  FolderOpen,
  GraduationCap,
  RefreshCw,
  Settings2,
  User,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../lib/firebase";
import { seedFirestore } from "../../../lib/seedFirestore";

const COLLECTIONS = [
  {
    key: "projetos",
    label: "Projetos",
    icon: FolderOpen,
    to: "/admin/projetos",
    color: "text-blue-400",
  },
  {
    key: "experiencias",
    label: "Experiências",
    icon: Briefcase,
    to: "/admin/experiencia",
    color: "text-emerald-400",
  },
  {
    key: "educacao",
    label: "Educação",
    icon: GraduationCap,
    to: "/admin/educacao",
    color: "text-yellow-400",
  },
  {
    key: "skills",
    label: "Skills",
    icon: Wrench,
    to: "/admin/skills",
    color: "text-purple-400",
  },
];

const SINGLETONS = [
  {
    label: "Perfil & Identidade",
    icon: User,
    to: "/admin/perfil",
    color: "text-blue-400",
    desc: "Hero, foto, textos, CV, contactos",
  },
  {
    label: "Configuração do Site",
    icon: Settings2,
    to: "/admin/config",
    color: "text-purple-400",
    desc: "Visibilidade e ordem das secções",
  },
];

export const AdminDashboard = () => {
  const [counts, setCounts] = useState({});
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubs = COLLECTIONS.map(({ key }) =>
      onSnapshot(query(collection(db, key)), (snap) =>
        setCounts((c) => ({ ...c, [key]: snap.size })),
      ),
    );
    return () => unsubs.forEach((u) => u());
  }, []);

  const handleSeed = async () => {
    if (
      !window.confirm(
        "Isto irá sobrescrever os dados existentes no Firestore com os dados estáticos. Continuar?",
      )
    )
      return;
    setSeeding(true);
    setSeedMsg("");
    try {
      await seedFirestore();
      setSeedMsg("✓ Dados inicializados com sucesso!");
    } catch (e) {
      setSeedMsg(`Erro: ${e.message}`);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Visão geral do portfólio</p>
      </div>

      {/* Atalhos singletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {SINGLETONS.map(({ label, icon: Icon, to, color, desc }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className="flex items-center gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl text-left hover:border-slate-600 transition-colors"
          >
            <div className={`p-3 rounded-xl bg-slate-800 ${color}`}>
              <Icon size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="text-xs text-slate-500">{desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Contadores de coleções */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {COLLECTIONS.map(({ key, label, icon: Icon, to, color }) => (
          <button
            key={key}
            onClick={() => navigate(to)}
            className="flex flex-col gap-3 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl text-left hover:border-slate-600 transition-colors"
          >
            <Icon size={20} className={color} />
            <div>
              <p className="text-2xl font-bold text-white">
                {counts[key] ?? "—"}
              </p>
              <p className="text-xs text-slate-400">{label}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Inicializar dados */}
      <div className="border border-slate-800 rounded-2xl p-6 max-w-md">
        <h2 className="font-bold text-white mb-1">Inicializar dados</h2>
        <p className="text-slate-400 text-sm mb-4">
          Popula o Firestore com os dados estáticos do código. Faz isto uma
          única vez quando o Firestore estiver vazio.
        </p>
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors"
        >
          <RefreshCw size={15} className={seeding ? "animate-spin" : ""} />
          {seeding ? "A inicializar…" : "Inicializar dados do Firestore"}
        </button>
        {seedMsg && (
          <p
            className={`text-sm mt-3 ${seedMsg.startsWith("✓") ? "text-emerald-400" : "text-red-400"}`}
          >
            {seedMsg}
          </p>
        )}
      </div>
    </div>
  );
};
