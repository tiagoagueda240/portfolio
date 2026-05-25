import { X } from "lucide-react";

/**
 * Campo de texto genérico para formulários admin.
 */
export const Field = ({ label, children }) => (
  <div>
    <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">
      {label}
    </label>
    {children}
  </div>
);

export const inputClass =
  "w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors";

export const textareaClass =
  "w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none";

/**
 * Lista dinâmica de strings (uma por linha numa textarea).
 * Converte entre array e string com \n.
 */
export const LinesInput = ({ label, value = [], onChange, placeholder }) => (
  <Field label={label}>
    <textarea
      className={textareaClass}
      rows={4}
      placeholder={placeholder || "Uma entrada por linha…"}
      value={value.join("\n")}
      onChange={(e) =>
        onChange(
          e.target.value
            .split("\n")
            .map((s) => s.trimStart())
            .filter(Boolean),
        )
      }
    />
    <p className="text-xs text-slate-600 mt-1">Uma entrada por linha</p>
  </Field>
);

/**
 * Lista dinâmica de strings como tags (separadas por vírgula).
 */
export const TagsInput = ({ label, value = [], onChange }) => {
  const remove = (i) => onChange(value.filter((_, idx) => idx !== i));

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = e.target.value.trim().replace(/,$/, "");
      if (val && !value.includes(val)) {
        onChange([...value, val]);
        e.target.value = "";
      }
    }
  };

  return (
    <Field label={label}>
      <div className="flex flex-wrap gap-1.5 p-2 bg-slate-900 border border-slate-700 rounded-xl min-h-[42px] focus-within:border-blue-500 transition-colors">
        {value.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-700 text-slate-200 text-xs rounded-full"
          >
            {tag}
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-slate-400 hover:text-white"
            >
              <X size={10} />
            </button>
          </span>
        ))}
        <input
          type="text"
          placeholder={
            value.length === 0 ? "Escreve e prime Enter ou vírgula…" : ""
          }
          className="bg-transparent text-white text-sm outline-none flex-grow min-w-[120px] placeholder:text-slate-600"
          onKeyDown={handleKeyDown}
          onBlur={(e) => {
            const val = e.target.value.trim().replace(/,$/, "");
            if (val && !value.includes(val)) {
              onChange([...value, val]);
              e.target.value = "";
            }
          }}
        />
      </div>
    </Field>
  );
};

/**
 * Editor de stack por camadas: { Frontend: ["Angular"], Backend: ["Node"] }
 */
export const StackLayersInput = ({ value = {}, onChange }) => {
  // Converte o objeto em array de { layer, techs } para edição
  const layers = Object.entries(value).map(([layer, techs]) => ({
    layer,
    techs: techs.join(", "),
  }));

  const updateLayers = (newLayers) => {
    const obj = newLayers.reduce((acc, { layer, techs }) => {
      if (layer.trim())
        acc[layer.trim()] = techs
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      return acc;
    }, {});
    onChange(obj);
  };

  const update = (idx, field, val) => {
    const copy = [...layers];
    copy[idx] = { ...copy[idx], [field]: val };
    updateLayers(copy);
  };

  const add = () => updateLayers([...layers, { layer: "", techs: "" }]);
  const remove = (idx) => updateLayers(layers.filter((_, i) => i !== idx));

  return (
    <Field label="Stack completo (por camada)">
      <div className="space-y-2">
        {layers.map((row, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              className={`${inputClass} w-28 flex-shrink-0`}
              placeholder="Camada"
              value={row.layer}
              onChange={(e) => update(i, "layer", e.target.value)}
            />
            <input
              className={inputClass}
              placeholder="Angular, TypeScript, …"
              value={row.techs}
              onChange={(e) => update(i, "techs", e.target.value)}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="flex-shrink-0 text-slate-500 hover:text-red-400 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={add}
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          + Adicionar camada
        </button>
      </div>
    </Field>
  );
};

/**
 * Editor de links: [{ label, url, tipo }]
 */
export const LinksInput = ({ value = [], onChange }) => {
  const update = (idx, field, val) => {
    const copy = [...value];
    copy[idx] = { ...copy[idx], [field]: val };
    onChange(copy);
  };
  const add = () => onChange([...value, { label: "", url: "", tipo: "demo" }]);
  const remove = (idx) => onChange(value.filter((_, i) => i !== idx));

  return (
    <Field label="Links">
      <div className="space-y-2">
        {value.map((link, i) => (
          <div key={i} className="flex gap-2 items-center">
            <select
              className={`${inputClass} w-28 flex-shrink-0`}
              value={link.tipo}
              onChange={(e) => update(i, "tipo", e.target.value)}
            >
              <option value="github">GitHub</option>
              <option value="demo">Demo / Site</option>
            </select>
            <input
              className={`${inputClass} w-24 flex-shrink-0`}
              placeholder="Label"
              value={link.label}
              onChange={(e) => update(i, "label", e.target.value)}
            />
            <input
              className={inputClass}
              placeholder="https://…"
              value={link.url}
              onChange={(e) => update(i, "url", e.target.value)}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="flex-shrink-0 text-slate-500 hover:text-red-400 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={add}
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          + Adicionar link
        </button>
      </div>
    </Field>
  );
};
