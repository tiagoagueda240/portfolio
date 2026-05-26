import { doc, onSnapshot, setDoc } from "firebase/firestore";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle,
  Eye,
  EyeOff,
  Loader,
  Save,
  Settings2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig as staticConfig } from "../../../data/data";
import { db } from "../../../lib/firebase";

// Secções na ordem padrão
const DEFAULT_ORDER = [
  "hero",
  "sobre",
  "experiencia",
  "skills",
  "projetos",
  "educacao",
];

const SECTION_META = {
  hero: { icon: "🏠", desc: "Apresentação principal com foto, nome e tagline" },
  sobre: {
    icon: "👤",
    desc: "Secção 'O meu perfil' com parágrafos e code snippet",
  },
  experiencia: { icon: "💼", desc: "Histórico de experiência profissional" },
  skills: { icon: "🛠️", desc: "Categorias de tecnologias e skills" },
  projetos: {
    icon: "📁",
    desc: "Portfólio de projetos com galeria e detalhes",
  },
  educacao: { icon: "🎓", desc: "Formação académica e certificações" },
};

const buildSections = (data) => {
  const src = data?.sections ?? staticConfig.sections;
  return DEFAULT_ORDER.map((key, i) => ({
    key,
    label: src[key]?.label ?? staticConfig.sections[key]?.label ?? key,
    visible: src[key]?.visible ?? true,
    order: src[key]?.order ?? i,
  })).sort((a, b) => a.order - b.order);
};

export const AdminSiteConfig = () => {
  const [sections, setSections] = useState(() => buildSections(null));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    return onSnapshot(
      doc(db, "siteConfig", "main"),
      (snap) => {
        if (snap.exists()) setSections(buildSections(snap.data()));
      },
      () => {},
    );
  }, []);

  const toggle = (key) =>
    setSections((prev) =>
      prev.map((s) => (s.key === key ? { ...s, visible: !s.visible } : s)),
    );

  const move = (idx, dir) => {
    const next = [...sections];
    const swap = idx + dir;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    setSections(next.map((s, i) => ({ ...s, order: i })));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const sectionsObj = {};
      sections.forEach((s, i) => {
        sectionsObj[s.key] = { visible: s.visible, label: s.label, order: i };
      });
      await setDoc(doc(db, "siteConfig", "main"), { sections: sectionsObj });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  const visibleCount = sections.filter((s) => s.visible).length;

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings2 size={20} className="text-purple-400" />
            Configuração do Site
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Ativa/desativa secções e define a ordem de apresentação
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white rounded-xl text-sm font-bold transition-colors"
        >
          {saving ? (
            <Loader size={16} className="animate-spin" />
          ) : saved ? (
            <CheckCircle size={16} className="text-emerald-400" />
          ) : (
            <Save size={16} />
          )}
          {saved ? "Guardado!" : "Guardar"}
        </button>
      </div>

      {/* Info pill */}
      <div className="flex items-center gap-3 mb-6 px-4 py-3 bg-slate-900/60 border border-slate-800 rounded-xl">
        <span className="text-slate-400 text-sm">
          <span className="text-white font-semibold">{visibleCount}</span> de{" "}
          <span className="text-white font-semibold">{sections.length}</span>{" "}
          secções visíveis
        </span>
        <span className="ml-auto text-xs text-slate-600 font-mono">
          Arrasta ou usa as setas para reordenar
        </span>
      </div>

      {/* Section list */}
      <div className="space-y-3">
        {sections.map((section, idx) => {
          const meta = SECTION_META[section.key] ?? { icon: "📄", desc: "" };
          return (
            <div
              key={section.key}
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                section.visible
                  ? "bg-slate-900/60 border-slate-700/60"
                  : "bg-slate-900/30 border-slate-800/40 opacity-60"
              }`}
            >
              {/* Ícone e info */}
              <span className="text-xl w-8 text-center flex-shrink-0">
                {meta.icon}
              </span>
              <div className="flex-grow min-w-0">
                <p className="text-sm font-semibold text-white">
                  {section.label}
                </p>
                <p className="text-xs text-slate-500 truncate">{meta.desc}</p>
              </div>

              {/* Estado */}
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded-full flex-shrink-0 ${
                  section.visible
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                    : "bg-slate-800 text-slate-500 border border-slate-700"
                }`}
              >
                {section.visible ? "visível" : "oculta"}
              </span>

              {/* Toggle visibilidade */}
              <button
                onClick={() => toggle(section.key)}
                title={section.visible ? "Ocultar secção" : "Mostrar secção"}
                className={`h-9 w-9 flex items-center justify-center rounded-xl border flex-shrink-0 transition-colors ${
                  section.visible
                    ? "bg-blue-600/20 border-blue-500/30 text-blue-400 hover:bg-blue-600/30"
                    : "bg-slate-800 border-slate-700 text-slate-500 hover:text-white"
                }`}
              >
                {section.visible ? <Eye size={15} /> : <EyeOff size={15} />}
              </button>

              {/* Reordenar */}
              <div className="flex flex-col gap-1 flex-shrink-0">
                <button
                  onClick={() => move(idx, -1)}
                  disabled={idx === 0}
                  className="h-6 w-7 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white disabled:opacity-25 transition-colors"
                >
                  <ArrowUp size={12} />
                </button>
                <button
                  onClick={() => move(idx, 1)}
                  disabled={idx === sections.length - 1}
                  className="h-6 w-7 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white disabled:opacity-25 transition-colors"
                >
                  <ArrowDown size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-600 mt-6 text-center">
        Alterações são guardadas no Firestore e refletidas no portfolio em tempo
        real.
      </p>
    </div>
  );
};
