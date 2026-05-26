import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Images, Maximize2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePortfolio } from "../../context/PortfolioContext";
import { DetailDrawer } from "../ui/DetailDrawer";
import { ProjectCard3D } from "../ui/ProjectCard3D";

export const ProjectsSection = () => {
  const { projetos } = usePortfolio();
  const [selected, setSelected] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    setActiveImg(0);
  }, [selected]);

  // ESC fecha o lightbox sem fechar o drawer
  useEffect(() => {
    if (!lightboxImg) return;
    const handleKey = (e) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        setLightboxImg(null);
      }
    };
    document.addEventListener("keydown", handleKey, true);
    return () => document.removeEventListener("keydown", handleKey, true);
  }, [lightboxImg]);

  return (
    <section id="projetos" className="py-32">
      <motion.div
        className="flex items-center gap-6 mb-16"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Trabalho Destacado.
        </h3>
        <div className="h-px bg-slate-800 flex-grow"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projetos.map((projeto, index) => (
          <ProjectCard3D
            key={projeto.id}
            project={projeto}
            index={index}
            onClick={() => setSelected(projeto)}
          />
        ))}
      </div>

      <DetailDrawer item={selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            {/* Galeria / Imagem de capa com fallback e fullscreen */}
            {(selected.detalhes?.galeria?.length > 0 || selected.image) && (
              <div className="-mx-6 md:-mx-10 -mt-2 mb-6">
                <div
                  className="relative h-52 overflow-hidden cursor-zoom-in group/img"
                  onClick={() => {
                    const src =
                      selected.detalhes?.galeria?.length > 0
                        ? selected.detalhes.galeria[activeImg]
                        : selected.image;
                    if (src) setLightboxImg(src);
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080810] to-transparent z-10" />
                  <img
                    key={activeImg}
                    src={
                      selected.detalhes?.galeria?.length > 0
                        ? selected.detalhes.galeria[activeImg]
                        : selected.image
                    }
                    alt={selected.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                  />
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity">
                    <Maximize2 size={12} className="text-white" />
                    <span className="text-xs text-white font-mono">
                      Ampliar
                    </span>
                  </div>
                  {selected.detalhes?.galeria?.length > 1 && (
                    <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Images size={12} className="text-slate-400" />
                      <span className="text-xs text-slate-400 font-mono">
                        {activeImg + 1}/{selected.detalhes.galeria.length}
                      </span>
                    </div>
                  )}
                </div>
                {selected.detalhes?.galeria?.length > 1 && (
                  <div className="flex gap-2 px-6 md:px-10 mt-2 overflow-x-auto pb-1">
                    {selected.detalhes.galeria.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className={`flex-shrink-0 h-14 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                          i === activeImg
                            ? "border-blue-500 opacity-100"
                            : "border-slate-700/50 opacity-50 hover:opacity-80"
                        }`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              {selected.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 bg-emerald-900/40 px-3 py-1 rounded-full border border-emerald-800/50"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-white mb-8">
              {selected.title}
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
                  O Desafio
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selected.detalhes.desafio}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
                  A Solução
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selected.detalhes.solucao}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
                  Impacto
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selected.detalhes.impacto}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
                  Stack Completo
                </h3>
                <div className="space-y-3">
                  {Object.entries(selected.detalhes.stack).map(
                    ([layer, techs]) => (
                      <div key={layer} className="flex items-start gap-3">
                        <span className="text-xs font-mono text-slate-500 w-24 mt-1 flex-shrink-0 capitalize">
                          {layer.replace(/_/g, " ")}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {techs.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-xs font-mono rounded border border-slate-700/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-10 pt-8 border-t border-slate-800 flex-wrap">
              {selected.links?.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-5 py-2.5 text-white text-sm font-bold rounded-xl transition-colors ${
                    link.tipo === "github"
                      ? "bg-slate-800 hover:bg-slate-700 border border-slate-700/50"
                      : "bg-blue-600 hover:bg-blue-500"
                  }`}
                >
                  {link.tipo === "github" ? (
                    <Github size={16} />
                  ) : (
                    <ExternalLink size={16} />
                  )}
                  {link.label}
                </a>
              ))}
            </div>
          </>
        )}
      </DetailDrawer>

      {/* Lightbox fullscreen */}
      {createPortal(
        <AnimatePresence>
          {lightboxImg && (
            <motion.div
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 cursor-zoom-out"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImg(null)}
            >
              <motion.img
                src={lightboxImg}
                alt=""
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-5 right-5 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
};
