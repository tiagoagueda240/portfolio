import { collection, doc, onSnapshot, query } from "firebase/firestore";
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  ExternalLink,
  FolderOpen,
  GraduationCap,
  RefreshCw,
  Settings2,
  User,
  Wifi,
  WifiOff,
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
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    key: "experiencias",
    label: "Experiências",
    icon: Briefcase,
    to: "/admin/experiencia",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    key: "educacao",
    label: "Educação",
    icon: GraduationCap,
    to: "/admin/educacao",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    key: "skills",
    label: "Skills",
    icon: Wrench,
    to: "/admin/skills",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
];

const NAV_CARDS = [
  {
    label: "Perfil & Identidade",
    icon: User,
    to: "/admin/perfil",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    desc: "Nome, foto, tagline, CV, parágrafos, redes sociais",
  },
  {
    label: "Projetos",
    icon: FolderOpen,
    to: "/admin/projetos",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    desc: "Adicionar, editar e remover projetos do portfólio",
  },
  {
    label: "Experiência",
    icon: Briefcase,
    to: "/admin/experiencia",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    desc: "Histórico profissional com responsabilidades e stack",
  },
  {
    label: "Educação",
    icon: GraduationCap,
    to: "/admin/educacao",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    desc: "Formação académica, cursos e certificações",
  },
  {
    label: "Skills",
    icon: Wrench,
    to: "/admin/skills",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    desc: "Categorias de tecnologias e ferramentas",
  },
  {
    label: "Configuração do Site",
    icon: Settings2,
    to: "/admin/config",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    desc: "Ativar/desativar e reordenar secções do portfólio",
  },
];

export const AdminDashboard = () => {
  const [counts, setCounts] = useState({});
  const [perfilOk, setPerfilOk] = useState(false);
  const [configOk, setConfigOk] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubs = COLLECTIONS.map(({ key }) =>
      onSnapshot(query(collection(db, key)), (snap) =>
        setCounts((c) => ({ ...c, [key]: snap.size })),
      ),
    );
    // Check singletons
    unsubs.push(
      onSnapshot(doc(db, "perfil", "main"), (s) => setPerfilOk(s.exists())),
    );
    unsubs.push(
      onSnapshot(doc(db, "siteConfig", "main"), (s) => setConfigOk(s.exists())),
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
      setSeedMsg("ok");
    } catch (e) {
      setSeedMsg(`err:${e.message}`);
    } finally {
      setSeeding(false);
    }
  };

  const totalItems =
    (counts.projetos ?? 0) +
    (counts.experiencias ?? 0) +
    (counts.educacao ?? 0) +
    (counts.skills ?? 0);

  const firestoreOk = totalItems > 0;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Bom dia" : hour < 19 ? "Boa tarde" : "Boa noite";

  return (
    <div className="space-y-8 max-w-5xl">
      {/* ── CABEÇALHO ────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 p-8">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-600/10 blur-2xl" />
        <div className="relative">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-1">
            Portfolio Admin
          </p>
          <h1 className="text-3xl font-black text-white mb-2">
            {greeting}! 👋
          </h1>
          <p className="text-slate-400 text-sm max-w-xl">
            Gere todo o conteúdo do teu portfólio a partir daqui. As alterações
            são guardadas no Firestore e refletidas em tempo real.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm rounded-xl transition-colors"
            >
              <ExternalLink size={14} />
              Ver portfólio
            </a>
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-sm rounded-xl transition-colors disabled:opacity-50"
            >
              <RefreshCw size={14} className={seeding ? "animate-spin" : ""} />
              {seeding ? "A inicializar…" : "Inicializar Firestore"}
            </button>
            {seedMsg && (
              <span
                className={`inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl ${
                  seedMsg === "ok"
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/15 text-red-400 border border-red-500/20"
                }`}
              >
                {seedMsg === "ok"
                  ? "✓ Dados inicializados!"
                  : seedMsg.replace("err:", "")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── STATUS FIRESTORE ──────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {COLLECTIONS.map(
          ({ key, label, icon: Icon, to, color, bg, border }) => (
            <button
              key={key}
              onClick={() => navigate(to)}
              className={`flex flex-col gap-2 p-4 rounded-2xl border ${bg} ${border} hover:brightness-110 transition-all text-left group`}
            >
              <Icon size={16} className={color} />
              <p className={`text-2xl font-black ${color}`}>
                {counts[key] ?? "·"}
              </p>
              <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors leading-tight">
                {label}
              </p>
            </button>
          ),
        )}
        {/* Perfil status */}
        <div
          className={`flex flex-col gap-2 p-4 rounded-2xl border ${perfilOk ? "bg-emerald-500/10 border-emerald-500/20" : "bg-slate-800/50 border-slate-700"} transition-all`}
        >
          {perfilOk ? (
            <Wifi size={16} className="text-emerald-400" />
          ) : (
            <WifiOff size={16} className="text-slate-500" />
          )}
          <p
            className={`text-xs font-semibold ${perfilOk ? "text-emerald-400" : "text-slate-500"}`}
          >
            {perfilOk ? "Perfil ok" : "Sem perfil"}
          </p>
          <p className="text-xs text-slate-500 leading-tight">
            {perfilOk ? "Firestore ativo" : "Clica em Inicializar"}
          </p>
        </div>
        {/* Config status */}
        <div
          className={`flex flex-col gap-2 p-4 rounded-2xl border ${configOk ? "bg-purple-500/10 border-purple-500/20" : "bg-slate-800/50 border-slate-700"} transition-all`}
        >
          {configOk ? (
            <CheckCircle size={16} className="text-purple-400" />
          ) : (
            <Settings2 size={16} className="text-slate-500" />
          )}
          <p
            className={`text-xs font-semibold ${configOk ? "text-purple-400" : "text-slate-500"}`}
          >
            {configOk ? "Config ok" : "Sem config"}
          </p>
          <p className="text-xs text-slate-500 leading-tight">
            {configOk ? "Secções ativas" : "Clica em Inicializar"}
          </p>
        </div>
      </div>

      {/* ── NAVEGAÇÃO RÁPIDA ──────────────────────────────── */}
      <div>
        <h2 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-4">
          Gestão de conteúdo
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {NAV_CARDS.map(
            ({ label, icon: Icon, to, color, bg, border, desc }) => (
              <button
                key={to}
                onClick={() => navigate(to)}
                className={`group flex items-start gap-4 p-5 rounded-2xl border ${bg} ${border} hover:brightness-110 transition-all text-left`}
              >
                <div
                  className={`p-2.5 rounded-xl bg-black/20 ${color} flex-shrink-0 mt-0.5`}
                >
                  <Icon size={16} />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-semibold text-white mb-1">
                    {label}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {desc}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="flex-shrink-0 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all mt-1"
                />
              </button>
            ),
          )}
        </div>
      </div>

      {/* ── CHECKLIST DE CONFIGURAÇÃO ────────────────────── */}
      <div className="border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-4">
          Checklist de configuração
        </h2>
        <div className="space-y-2.5">
          {[
            { label: "Perfil inicializado no Firestore", ok: perfilOk },
            { label: "Configuração do site no Firestore", ok: configOk },
            { label: "Projetos carregados", ok: (counts.projetos ?? 0) > 0 },
            {
              label: "Experiência carregada",
              ok: (counts.experiencias ?? 0) > 0,
            },
            { label: "Educação carregada", ok: (counts.educacao ?? 0) > 0 },
            { label: "Skills carregadas", ok: (counts.skills ?? 0) > 0 },
          ].map(({ label, ok }) => (
            <div key={label} className="flex items-center gap-3">
              <div
                className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  ok ? "bg-emerald-500/20" : "bg-slate-800"
                }`}
              >
                {ok ? (
                  <CheckCircle size={12} className="text-emerald-400" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-slate-600" />
                )}
              </div>
              <span
                className={`text-sm ${ok ? "text-slate-300" : "text-slate-500"}`}
              >
                {label}
              </span>
              {!ok && (
                <span className="ml-auto text-xs text-slate-600 font-mono">
                  pendente
                </span>
              )}
            </div>
          ))}
        </div>
        {!firestoreOk && (
          <div className="mt-5 pt-5 border-t border-slate-800 flex items-center gap-3">
            <p className="text-xs text-slate-500 flex-grow">
              Clica em{" "}
              <strong className="text-slate-300">Inicializar Firestore</strong>{" "}
              no topo para popular todas as coleções com os dados estáticos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

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
