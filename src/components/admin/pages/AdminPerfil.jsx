import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { CheckCircle, Loader, Save, User } from "lucide-react";
import { useEffect, useState } from "react";
import { perfil as staticPerfil } from "../../../data/data";
import { db } from "../../../lib/firebase";
import {
  Field,
  inputClass,
  TagsInput,
  textareaClass,
} from "../shared/AdminFields";
import { ImageUpload } from "../shared/ImageUpload";

const EMPTY = {
  nome: staticPerfil.nome,
  tagline: staticPerfil.tagline,
  taglineDestaque: staticPerfil.taglineDestaque,
  statusLabel: staticPerfil.statusLabel,
  statusAtivo: staticPerfil.statusAtivo,
  fotoUrl: "",
  cvUrl: "",
  email: staticPerfil.email,
  linkedin: staticPerfil.linkedin,
  github: staticPerfil.github,
  sobre: [...staticPerfil.sobre],
  codeEspecialidade: staticPerfil.codeEspecialidade,
  codeSetores: [...staticPerfil.codeSetores],
  codeTecnologias: [...staticPerfil.codeTecnologias],
  codeMindset: staticPerfil.codeMindset,
};

const SectionTitle = ({ children }) => (
  <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest pt-2 pb-1 border-b border-slate-800 mb-4">
    {children}
  </h3>
);

export const AdminPerfil = () => {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Escuta o Firestore em tempo real; se não existir usa dados estáticos
  useEffect(() => {
    return onSnapshot(
      doc(db, "perfil", "main"),
      (snap) => {
        if (snap.exists()) {
          const d = snap.data();
          setForm((prev) => ({
            ...prev,
            ...d,
            sobre: d.sobre ?? prev.sobre,
            codeSetores: d.codeSetores ?? prev.codeSetores,
            codeTecnologias: d.codeTecnologias ?? prev.codeTecnologias,
          }));
        }
      },
      () => {},
    );
  }, []);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const setSobre = (i, val) =>
    setForm((f) => {
      const s = [...f.sobre];
      s[i] = val;
      return { ...f, sobre: s };
    });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, "perfil", "main"), form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <User size={20} className="text-blue-400" />
            Perfil &amp; Identidade
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Hero, Sobre Mim, contactos e conteúdo do código animado
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

      <form onSubmit={handleSave} className="space-y-10">
        {/* ── HERO ───────────────────────────────────────────── */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-5">
          <SectionTitle>Secção Hero</SectionTitle>

          <Field label="Nome completo">
            <input
              className={inputClass}
              value={form.nome}
              onChange={(e) => set("nome", e.target.value)}
              placeholder="Tiago Águeda"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Tagline (texto normal)">
              <input
                className={inputClass}
                value={form.tagline}
                onChange={(e) => set("tagline", e.target.value)}
                placeholder="Construo software"
              />
            </Field>
            <Field label="Tagline (texto destaque gradiente)">
              <input
                className={inputClass}
                value={form.taglineDestaque}
                onChange={(e) => set("taglineDestaque", e.target.value)}
                placeholder="seguro, escalável e imersivo."
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end">
            <Field label="Badge de disponibilidade">
              <input
                className={inputClass}
                value={form.statusLabel}
                onChange={(e) => set("statusLabel", e.target.value)}
                placeholder="Disponível para desafios"
              />
            </Field>
            <Field label="Mostrar badge">
              <button
                type="button"
                onClick={() => set("statusAtivo", !form.statusAtivo)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                  form.statusAtivo
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                    : "bg-slate-800 border-slate-700 text-slate-400"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${form.statusAtivo ? "bg-emerald-400" : "bg-slate-600"}`}
                />
                {form.statusAtivo ? "Visível" : "Oculto"}
              </button>
            </Field>
          </div>
        </section>

        {/* ── FOTO & CV ────────────────────────────────────────── */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-5">
          <SectionTitle>Foto &amp; CV</SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ImageUpload
              label="Foto de Perfil"
              value={form.fotoUrl}
              onChange={(url) => set("fotoUrl", url)}
              folder="portfolio/perfil"
            />
            <div>
              <Field label="CV (PDF) — URL Cloudinary">
                <input
                  className={inputClass}
                  value={form.cvUrl}
                  onChange={(e) => set("cvUrl", e.target.value)}
                  placeholder="https://res.cloudinary.com/…/cv.pdf"
                />
              </Field>
              <p className="text-xs text-slate-600 mt-2">
                Para fazer upload do PDF usa{" "}
                <a
                  href="https://cloudinary.com/console/media_library"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Cloudinary Media Library
                </a>{" "}
                e cola aqui o URL do ficheiro.
              </p>
              {form.cvUrl && (
                <a
                  href={form.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs text-emerald-400 hover:underline"
                >
                  Ver CV atual →
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ── SOBRE MIM ────────────────────────────────────────── */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-5">
          <SectionTitle>Sobre Mim</SectionTitle>
          <p className="text-xs text-slate-500">
            Três parágrafos de apresentação mostrados na secção "O meu perfil".
          </p>

          {[0, 1, 2].map((i) => (
            <Field key={i} label={`Parágrafo ${i + 1}`}>
              <textarea
                className={textareaClass}
                rows={3}
                value={form.sobre?.[i] ?? ""}
                onChange={(e) => setSobre(i, e.target.value)}
                placeholder={`Escreve o parágrafo ${i + 1}…`}
              />
            </Field>
          ))}
        </section>

        {/* ── CÓDIGO ANIMADO ───────────────────────────────────── */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-5">
          <SectionTitle>Janela de Código (Sobre Mim)</SectionTitle>
          <p className="text-xs text-slate-500">
            Conteúdo da caixa de código animada ao lado dos parágrafos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="especialidade">
              <input
                className={inputClass}
                value={form.codeEspecialidade}
                onChange={(e) => set("codeEspecialidade", e.target.value)}
                placeholder="Full-Stack"
              />
            </Field>
            <Field label="mindset">
              <input
                className={inputClass}
                value={form.codeMindset}
                onChange={(e) => set("codeMindset", e.target.value)}
                placeholder="Zero Error Policy"
              />
            </Field>
          </div>

          <TagsInput
            label="setores (Enter ou vírgula para adicionar)"
            value={form.codeSetores ?? []}
            onChange={(v) => set("codeSetores", v)}
          />
          <TagsInput
            label="tecnologias (Enter ou vírgula para adicionar)"
            value={form.codeTecnologias ?? []}
            onChange={(v) => set("codeTecnologias", v)}
          />
        </section>

        {/* ── CONTACTO & REDES ────────────────────────────────── */}
        <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-5">
          <SectionTitle>Contacto &amp; Redes Sociais</SectionTitle>

          <Field label="Email">
            <input
              type="email"
              className={inputClass}
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="teu@email.com"
            />
          </Field>
          <Field label="LinkedIn (URL completo)">
            <input
              type="url"
              className={inputClass}
              value={form.linkedin}
              onChange={(e) => set("linkedin", e.target.value)}
              placeholder="https://www.linkedin.com/in/teu-perfil/"
            />
          </Field>
          <Field label="GitHub (URL completo)">
            <input
              type="url"
              className={inputClass}
              value={form.github}
              onChange={(e) => set("github", e.target.value)}
              placeholder="https://github.com/teu-username"
            />
          </Field>
        </section>

        {/* Botão final */}
        <div className="flex justify-end pb-8">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white rounded-xl text-sm font-bold transition-colors"
          >
            {saving ? (
              <Loader size={16} className="animate-spin" />
            ) : saved ? (
              <CheckCircle size={16} className="text-emerald-400" />
            ) : (
              <Save size={16} />
            )}
            {saved ? "Guardado com sucesso!" : "Guardar perfil"}
          </button>
        </div>
      </form>
    </div>
  );
};
