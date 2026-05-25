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
import {
  Field,
  LinesInput,
  inputClass,
  textareaClass,
} from "../shared/AdminFields";
import { AdminPanel } from "../shared/AdminPanel";

const EMPTY = {
  curso: "",
  escola: "",
  data: "",
  extra: "",
  order: 0,
  detalhes: {
    descricao: "",
    destaques: [],
  },
};

export const AdminEducation = () => {
  const [items, setItems] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    return onSnapshot(query(collection(db, "educacao")), (snap) =>
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
      curso: item.curso || "",
      escola: item.escola || "",
      data: item.data || "",
      extra: item.extra || "",
      order: item.order ?? 0,
      detalhes: {
        descricao: item.detalhes?.descricao || "",
        destaques: item.detalhes?.destaques || [],
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
        await setDoc(doc(db, "educacao", editId), form);
      } else {
        await addDoc(collection(db, "educacao"), form);
      }
      setPanelOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "educacao", id));
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Percurso Académico</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {items.length} entrada(s)
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors"
        >
          <Plus size={16} /> Nova Entrada
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl"
          >
            <div className="flex-grow min-w-0">
              <p className="font-semibold text-white truncate">
                {item.curso || "(sem título)"}
              </p>
              <p className="text-xs text-slate-400">
                {item.escola} · {item.data}
              </p>
              {item.extra && (
                <span className="inline-block mt-1 text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                  {item.extra}
                </span>
              )}
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
            Nenhuma entrada académica. Inicializa os dados no Dashboard.
          </p>
        )}
      </div>

      <AdminPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={editId ? "Editar Entrada" : "Nova Entrada"}
      >
        <form onSubmit={handleSave} className="space-y-5">
          <Field label="Curso / Grau">
            <input
              className={inputClass}
              value={form.curso}
              onChange={(e) => setField("curso", e.target.value)}
              required
              placeholder="Mestrado em Engenharia Informática"
            />
          </Field>
          <Field label="Escola / Instituição">
            <input
              className={inputClass}
              value={form.escola}
              onChange={(e) => setField("escola", e.target.value)}
              placeholder="ISCTE"
            />
          </Field>
          <Field label="Período">
            <input
              className={inputClass}
              value={form.data}
              onChange={(e) => setField("data", e.target.value)}
              placeholder="2023 – 2025"
            />
          </Field>
          <Field label="Extra (badge opcional)">
            <input
              className={inputClass}
              value={form.extra}
              onChange={(e) => setField("extra", e.target.value)}
              placeholder="Tese (19 Valores)"
            />
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
              <Field label="Descrição">
                <textarea
                  className={textareaClass}
                  rows={4}
                  value={form.detalhes.descricao}
                  onChange={(e) => setDetalhes("descricao", e.target.value)}
                  placeholder="Descrição do percurso…"
                />
              </Field>
              <LinesInput
                label="Destaques"
                value={form.detalhes.destaques}
                onChange={(v) => setDetalhes("destaques", v)}
                placeholder="Um destaque por linha…"
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
