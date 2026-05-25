import { motion } from "framer-motion";
import { ExternalLink, Github, Images } from "lucide-react";
import { useEffect } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { DetailDrawer } from "../ui/DetailDrawer";
import { ProjectCard3D } from "../ui/ProjectCard3D";

export const ProjectsSection = () => {
  const { projetos } = usePortfolio();

  useEffect(() => {
    setActiveImg(0);
  }, [selected]);

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
            {/* Galeria */}
            {selected.detalhes.galeria?.length > 0 && (
              <div className="-mx-6 md:-mx-10 -mt-2 mb-6">
                <div className="relative h-52 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080810] to-transparent z-10" />
                  <img
                    key={activeImg}
                    src={selected.detalhes.galeria[activeImg]}
                    alt={`${selected.title} - imagem ${activeImg + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selected.detalhes.galeria.length > 1 && (
                    <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Images size={12} className="text-slate-400" />
                      <span className="text-xs text-slate-400 font-mono">
                        {activeImg + 1}/{selected.detalhes.galeria.length}
                      </span>
                    </div>
                  )}
                </div>
                {selected.detalhes.galeria.length > 1 && (
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
    </section>
  );
};
