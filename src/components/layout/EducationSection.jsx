import { motion } from "framer-motion";
import { useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { DetailDrawer } from "../ui/DetailDrawer";

export const EducationSection = () => {
  const { educacao } = usePortfolio();
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-32">
      <motion.div
        className="flex items-center gap-6 mb-16"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Percurso Académico.
        </h3>
        <div className="h-px bg-slate-800 flex-grow"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {educacao.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelected(item)}
            className="cursor-pointer group flex flex-col border border-slate-800 bg-slate-900/30 rounded-2xl p-8 hover:border-blue-500/30 transition-colors"
          >
            <span className="font-mono text-blue-400 text-sm mb-2 block font-bold">
              {item.data}
            </span>
            <h4 className="font-bold text-2xl text-white mb-2">{item.curso}</h4>
            <p className="text-slate-400 text-lg mb-auto">{item.escola}</p>
            {item.extra && (
              <span className="mt-4 inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-sm rounded-full border border-blue-500/20 w-fit">
                {item.extra}
              </span>
            )}
            <div className="mt-4 flex items-center gap-1 text-xs font-mono text-slate-600 group-hover:text-blue-400 transition-colors">
              <span>Ver detalhes</span>
              <span className="group-hover:translate-x-1 transition-transform inline-block">
                →
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <DetailDrawer item={selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <div className="mb-8">
              <span className="text-blue-400 font-mono text-sm block mb-1">
                {selected.data}
              </span>
              <h2 className="text-2xl font-bold text-white mb-1">
                {selected.curso}
              </h2>
              <p className="text-slate-400 mb-4">{selected.escola}</p>
              {selected.extra && (
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-sm rounded-full border border-blue-500/20">
                  {selected.extra}
                </span>
              )}
            </div>

            <p className="text-slate-300 leading-relaxed mb-10">
              {selected.detalhes.descricao}
            </p>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
                Destaques
              </h3>
              <ul className="space-y-3">
                {selected.detalhes.destaques.map((d, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </DetailDrawer>
    </section>
  );
};
