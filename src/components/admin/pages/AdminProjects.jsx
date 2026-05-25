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
  LinksInput,
  StackLayersInput,
  TagsInput,
  inputClass,
  textareaClass,
} from "../shared/AdminFields";
import { AdminPanel } from "../shared/AdminPanel";
import { GalleryUpload, ImageUpload } from "../shared/ImageUpload";

const EMPTY = {
  title: "",
  desc: "",
  tags: [],
  imageUrl: "",
  links: [],
  order: 0,
  detalhes: {
    galeria: [],
    desafio: "",
    solucao: "",
    impacto: "",
    stack: {},
  },
};

export const AdminProjects = () => {
  const [items, setItems] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "projetos"));
    return onSnapshot(q, (snap) => {
      setItems(
        snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
      );
    });
  }, []);

  const openNew = () => {
    setForm({ ...EMPTY, order: items.length });
    setEditId(null);
    setPanelOpen(true);
  };

  const openEdit = (item) => {
    setForm({
      title: item.title || "",
      desc: item.desc || "",
      tags: item.tags || [],
      imageUrl: item.imageUrl || "",
      links: item.links || [],
      order: item.order ?? 0,
      detalhes: {
        galeria: item.detalhes?.galeria || [],
        desafio: item.detalhes?.desafio || "",
        solucao: item.detalhes?.solucao || "",
        impacto: item.detalhes?.impacto || "",
        stack: item.detalhes?.stack || {},
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
        await setDoc(doc(db, "projetos", editId), form);
      } else {
        await addDoc(collection(db, "projetos"), form);
      }
      setPanelOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "projetos", id));
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Projetos</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {items.length} projeto(s)
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors"
        >
          <Plus size={16} /> Novo Projeto
        </button>
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl"
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt=""
                className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
              />
            ) : (
              <div className="w-16 h-12 rounded-lg bg-slate-800 flex-shrink-0" />
            )}
            <div className="flex-grow min-w-0">
              <p className="font-semibold text-white truncate">
                {item.title || "(sem título)"}
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {(item.tags || []).slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono text-emerald-300 bg-emerald-900/40 px-2 py-0.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
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
            Nenhum projeto. Clica em "Novo Projeto" ou inicializa os dados no
            Dashboard.
          </p>
        )}
      </div>

      {/* Painel de edição */}
      <AdminPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={editId ? "Editar Projeto" : "Novo Projeto"}
      >
        <form onSubmit={handleSave} className="space-y-5">
          <Field label="Título">
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              required
              placeholder="Nome do projeto"
            />
          </Field>

          <Field label="Descrição">
            <textarea
              className={textareaClass}
              rows={4}
              value={form.desc}
              onChange={(e) => setField("desc", e.target.value)}
              placeholder="Descrição do projeto"
            />
          </Field>

          <TagsInput
            label="Tags"
            value={form.tags}
            onChange={(v) => setField("tags", v)}
          />

          <Field label="Ordem (número)">
            <input
              type="number"
              className={inputClass}
              value={form.order}
              onChange={(e) => setField("order", Number(e.target.value))}
            />
          </Field>

          <ImageUpload
            label="Imagem de capa"
            value={form.imageUrl}
            onChange={(v) => setField("imageUrl", v)}
            folder="portfolio/projetos"
          />

          <GalleryUpload
            value={form.detalhes.galeria}
            onChange={(v) => setDetalhes("galeria", v)}
            folder="portfolio/galeria"
          />

          <LinksInput
            value={form.links}
            onChange={(v) => setField("links", v)}
          />

          <div className="pt-2 border-t border-slate-800">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
              Detalhes
            </p>
            <div className="space-y-4">
              <Field label="O Desafio">
                <textarea
                  className={textareaClass}
                  rows={3}
                  value={form.detalhes.desafio}
                  onChange={(e) => setDetalhes("desafio", e.target.value)}
                />
              </Field>
              <Field label="A Solução">
                <textarea
                  className={textareaClass}
                  rows={3}
                  value={form.detalhes.solucao}
                  onChange={(e) => setDetalhes("solucao", e.target.value)}
                />
              </Field>
              <Field label="Impacto">
                <textarea
                  className={textareaClass}
                  rows={3}
                  value={form.detalhes.impacto}
                  onChange={(e) => setDetalhes("impacto", e.target.value)}
                />
              </Field>
              <StackLayersInput
                value={form.detalhes.stack}
                onChange={(v) => setDetalhes("stack", v)}
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
