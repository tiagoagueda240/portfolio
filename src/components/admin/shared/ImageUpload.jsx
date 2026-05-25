import { ImageIcon, Loader, X } from "lucide-react";
import { useState } from "react";
import { uploadImage } from "../../../lib/cloudinary";

/**
 * Upload de imagem única para Cloudinary.
 * Recebe o URL atual e chama onChange(newUrl) após upload.
 */
export const ImageUpload = ({
  value,
  onChange,
  folder = "portfolio",
  label = "Imagem",
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch {
      setError("Falha no upload. Verifica a configuração do Cloudinary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">
        {label}
      </label>

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-slate-700 group">
          <img src={value} alt="" className="w-full h-40 object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 h-7 w-7 flex items-center justify-center rounded-full bg-black/70 hover:bg-red-500/80 text-white transition-colors opacity-0 group-hover:opacity-100"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center gap-2 h-32 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:border-blue-500/50 transition-colors">
          {loading ? (
            <Loader size={20} className="text-blue-400 animate-spin" />
          ) : (
            <>
              <ImageIcon size={20} className="text-slate-500" />
              <span className="text-xs text-slate-500">
                Clica para carregar imagem
              </span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
            disabled={loading}
          />
        </label>
      )}

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

/**
 * Upload de múltiplas imagens (galeria).
 * Recebe array de URLs e chama onChange(newArray).
 */
export const GalleryUpload = ({
  value = [],
  onChange,
  folder = "portfolio/galeria",
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setLoading(true);
    setError("");
    try {
      const urls = await Promise.all(files.map((f) => uploadImage(f, folder)));
      onChange([...value, ...urls]);
    } catch {
      setError("Falha no upload de uma ou mais imagens.");
    } finally {
      setLoading(false);
    }
  };

  const remove = (idx) => onChange(value.filter((_, i) => i !== idx));

  return (
    <div>
      <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">
        Galeria de fotos
      </label>

      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((url, i) => (
          <div key={i} className="relative group">
            <img
              src={url}
              alt=""
              className="w-20 h-16 object-cover rounded-lg border border-slate-700"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute -top-1.5 -right-1.5 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={10} />
            </button>
          </div>
        ))}

        <label className="flex items-center justify-center w-20 h-16 border-2 border-dashed border-slate-700 rounded-lg cursor-pointer hover:border-blue-500/50 transition-colors">
          {loading ? (
            <Loader size={16} className="text-blue-400 animate-spin" />
          ) : (
            <span className="text-slate-500 text-xl leading-none">+</span>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFiles}
            disabled={loading}
          />
        </label>
      </div>

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
};
