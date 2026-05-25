import { motion } from "framer-motion";
import { useState } from "react";
import { experiencias } from "../../data/data";
import { DetailDrawer } from "../ui/DetailDrawer";
import { SpotlightCard } from "../ui/SpotlightCard";

export const ExperienceSection = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="experiência" className="py-32">
      <motion.div
        className="flex items-center gap-6 mb-16"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Experiência.
        </h3>
        <div className="h-px bg-slate-800 flex-grow"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {experiencias.map((exp, index) => (
          <SpotlightCard
            key={exp.id}
            exp={exp}
            index={index}
            onClick={() => setSelected(exp)}
          />
        ))}
      </div>

      <DetailDrawer item={selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <div className="flex items-start gap-4 mb-8">
              <div className="mt-1 h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-xl bg-slate-800 border border-slate-700/50">
                {selected.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white leading-tight">
                  {selected.cargo}
                </h2>
                <p className="text-blue-400 font-mono text-sm mt-0.5">
                  {selected.empresa} <span className="text-slate-600">•</span>{" "}
                  {selected.data}
                </p>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed mb-10">
              {selected.desc}
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
                  Responsabilidades
                </h3>
                <ul className="space-y-3">
                  {selected.detalhes.responsabilidades.map((r, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
                    >
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
                  Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selected.detalhes.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-mono rounded-md border border-slate-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">
                  Conquistas
                </h3>
                <ul className="space-y-3">
                  {selected.detalhes.conquistas.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
                    >
                      <span className="text-emerald-400 mt-0.5 flex-shrink-0">
                        ✓
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </DetailDrawer>
    </section>
  );
};
