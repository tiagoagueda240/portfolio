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
import { Field, inputClass, TagsInput } from "../shared/AdminFields";
import { AdminPanel } from "../shared/AdminPanel";

const COLORS = [
  { label: "Emerald", value: "text-emerald-400" },
  { label: "Blue", value: "text-blue-400" },
  { label: "Purple", value: "text-purple-400" },
  { label: "Yellow", value: "text-yellow-400" },
  { label: "Red", value: "text-red-400" },
];

const GLOW_COLORS = {
  "text-emerald-400": "rgba(52, 211, 153, 0.15)",
  "text-blue-400": "rgba(96, 165, 250, 0.15)",
  "text-purple-400": "rgba(167, 139, 250, 0.15)",
  "text-yellow-400": "rgba(250, 204, 21, 0.15)",
  "text-red-400": "rgba(248, 113, 113, 0.15)",
};

const EMPTY = {
  titulo: "",
  iconName: "Code2",
  iconColor: "text-blue-400",
  glowColor: "rgba(96, 165, 250, 0.15)",
  skills: [],
  order: 0,
};

export const AdminSkills = () => {
  const [items, setItems] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    return onSnapshot(query(collection(db, "skills")), (snap) =>
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
      titulo: item.titulo || "",
      iconName: item.iconName || "Code2",
      iconColor: item.iconColor || "text-blue-400",
      glowColor: item.glowColor || GLOW_COLORS["text-blue-400"],
      skills: item.skills || [],
      order: item.order ?? 0,
    });
    setEditId(item.id);
    setPanelOpen(true);
  };

  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleColorChange = (colorValue) => {
    setForm((f) => ({
      ...f,
      iconColor: colorValue,
      glowColor: GLOW_COLORS[colorValue] || f.glowColor,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await setDoc(doc(db, "skills", editId), form);
      } else {
        await addDoc(collection(db, "skills"), form);
      }
      setPanelOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "skills", id));
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Skills Técnicos</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {items.length} categoria(s)
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors"
        >
          <Plus size={16} /> Nova Categoria
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl"
          >
            <div className="h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-slate-800 border border-slate-700/50">
              {getIcon(item.iconName, item.iconColor, 16)}
            </div>
            <div className="flex-grow min-w-0">
              <p className="font-semibold text-white truncate">
                {item.titulo || "(sem título)"}
              </p>
              <p className="text-xs text-slate-400">
                {(item.skills || []).join(", ")}
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
            Nenhuma categoria. Inicializa os dados no Dashboard.
          </p>
        )}
      </div>

      <AdminPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={editId ? "Editar Categoria" : "Nova Categoria"}
      >
        <form onSubmit={handleSave} className="space-y-5">
          <Field label="Título da categoria">
            <input
              className={inputClass}
              value={form.titulo}
              onChange={(e) => setField("titulo", e.target.value)}
              required
              placeholder="Frontend"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Ícone">
              <select
                className={inputClass}
                value={form.iconName}
                onChange={(e) => setField("iconName", e.target.value)}
              >
                {ICON_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Cor">
              <select
                className={inputClass}
                value={form.iconColor}
                onChange={(e) => handleColorChange(e.target.value)}
              >
                {COLORS.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Pré-visualização">
            <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-800 border border-slate-700/50">
              {getIcon(form.iconName, form.iconColor, 18)}
            </div>
          </Field>

          <TagsInput
            label="Skills (prima Enter ou vírgula)"
            value={form.skills}
            onChange={(v) => setField("skills", v)}
          />

          <Field label="Ordem">
            <input
              type="number"
              className={inputClass}
              value={form.order}
              onChange={(e) => setField("order", Number(e.target.value))}
            />
          </Field>

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
