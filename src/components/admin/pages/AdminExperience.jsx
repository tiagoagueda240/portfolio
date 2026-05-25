import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { getIcon, ICON_OPTIONS } from "../../../lib/icons";
import {
  Field,
  inputClass,
  LinesInput,
  TagsInput,
  textareaClass,
} from "../shared/AdminFields";
import { AdminPanel } from "../shared/AdminPanel";

const COLORS = [
  "text-blue-400 group-hover:text-blue-300 transition-colors",
  "text-emerald-400 group-hover:text-emerald-300 transition-colors",
  "text-yellow-400 group-hover:text-yellow-300 transition-colors",
  "text-purple-400 group-hover:text-purple-300 transition-colors",
  "text-red-400 group-hover:text-red-300 transition-colors",
];

const EMPTY = {
  empresa: "",
  cargo: "",
  data: "",
  desc: "",
  iconName: "Globe",
  iconColor: COLORS[0],
  order: 0,
  detalhes: {
    responsabilidades: [],
    stack: [],
    conquistas: [],
  },
};

export const AdminExperience = () => {
  const [items, setItems] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    return onSnapshot(query(collection(db, "experiencias")), (snap) =>
      setItems(
        snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
      ),
    );
  }, []);

  const openNew = () => {
    setForm({ ...EMPTY, order: items.length });
    setEditId(null);
    setPanelOpen(true);
  };

  const openEdit = (item) => {
    setForm({
      empresa: item.empresa || "",
      cargo: item.cargo || "",
      data: item.data || "",
      desc: item.desc || "",
      iconName: item.iconName || "Globe",
      iconColor: item.iconColor || COLORS[0],
      order: item.order ?? 0,
      detalhes: {
        responsabilidades: item.detalhes?.responsabilidades || [],
        stack: item.detalhes?.stack || [],
        conquistas: item.detalhes?.conquistas || [],
      },
    });
    setEditId(item.id);
    setPanelOpen(true);
  };

  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const setDetalhes = (key, val) =>
    setForm((f) => ({ ...f, detalhes: { ...f.detalhes, [key]: val } }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await setDoc(doc(db, "experiencias", editId), form);
      } else {
        await addDoc(collection(db, "experiencias"), form);
      }
      setPanelOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "experiencias", id));
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Experiência Profissional
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {items.length} entrada(s)
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors"
        >
          <Plus size={16} /> Nova Experiência
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl"
          >
            <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-slate-800 border border-slate-700/50">
              {getIcon(item.iconName, item.iconColor, 18)}
            </div>
            <div className="flex-grow min-w-0">
              <p className="font-semibold text-white truncate">
                {item.cargo || "(sem cargo)"}
              </p>
              <p className="text-xs text-slate-400">
                {item.empresa} · {item.data}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => openEdit(item)}
                className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <Pencil size={14} />
              </button>
              {deleteConfirm === item.id ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-xs px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="text-xs px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirm(item.id)}
                  className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-slate-500 text-sm text-center py-12">
            Nenhuma experiência. Inicializa os dados no Dashboard.
          </p>
        )}
      </div>

      <AdminPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={editId ? "Editar Experiência" : "Nova Experiência"}
      >
        <form onSubmit={handleSave} className="space-y-5">
          <Field label="Empresa">
            <input
              className={inputClass}
              value={form.empresa}
              onChange={(e) => setField("empresa", e.target.value)}
              required
              placeholder="Nome da empresa"
            />
          </Field>
          <Field label="Cargo">
            <input
              className={inputClass}
              value={form.cargo}
              onChange={(e) => setField("cargo", e.target.value)}
              required
              placeholder="Título do cargo"
            />
          </Field>
          <Field label="Período">
            <input
              className={inputClass}
              value={form.data}
              onChange={(e) => setField("data", e.target.value)}
              placeholder="Set 2025 – Presente"
            />
          </Field>
          <Field label="Descrição curta">
            <textarea
              className={textareaClass}
              rows={3}
              value={form.desc}
              onChange={(e) => setField("desc", e.target.value)}
              placeholder="Resumo da função"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Ícone">
              <select
                className={inputClass}
                value={form.iconName}
                onChange={(e) => setField("iconName", e.target.value)}
              >
                {ICON_OPTIONS.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Cor do ícone">
              <select
                className={inputClass}
                value={form.iconColor}
                onChange={(e) => setField("iconColor", e.target.value)}
              >
                {COLORS.map((c) => (
                  <option key={c} value={c}>
                    {c.split(" ")[0].replace("text-", "")}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Pré-visualização do ícone">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-800 border border-slate-700/50">
              {getIcon(form.iconName, form.iconColor, 20)}
            </div>
          </Field>

          <Field label="Ordem">
            <input
              type="number"
              className={inputClass}
              value={form.order}
              onChange={(e) => setField("order", Number(e.target.value))}
            />
          </Field>

          <div className="pt-2 border-t border-slate-800">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
              Detalhes
            </p>
            <div className="space-y-4">
              <LinesInput
                label="Responsabilidades"
                value={form.detalhes.responsabilidades}
                onChange={(v) => setDetalhes("responsabilidades", v)}
              />
              <TagsInput
                label="Stack tecnológico"
                value={form.detalhes.stack}
                onChange={(v) => setDetalhes("stack", v)}
              />
              <LinesInput
                label="Conquistas"
                value={form.detalhes.conquistas}
                onChange={(v) => setDetalhes("conquistas", v)}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-grow py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-xl transition-colors"
            >
              {saving ? "A guardar…" : "Guardar"}
            </button>
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </AdminPanel>
    </div>
  );
};
