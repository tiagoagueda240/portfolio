import { motion } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";

export const AboutSection = () => {
  const { perfil } = usePortfolio();

  return (
    <section id="sobre" className="py-32">
      <motion.div
        className="flex items-center gap-6 mb-16"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          O meu perfil.
        </h3>
        <div className="h-px bg-slate-800 flex-grow"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 text-xl text-slate-400 leading-relaxed font-light"
        >
          {(perfil.sobre || []).map((paragrafo, i) => (
            <p key={i}>{paragrafo}</p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl relative"
        >
          <div className="flex gap-2 mb-6 border-b border-slate-800 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="font-mono text-sm space-y-3">
            <p>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-blue-300">perfil</span> = {"{"}
            </p>
            <p className="pl-6">
              <span className="text-slate-300">especialidade:</span>{" "}
              <span className="text-emerald-400">
                '{perfil.codeEspecialidade}'
              </span>
              ,
            </p>
            <p className="pl-6">
              <span className="text-slate-300">setores:</span> [
              {(perfil.codeSetores || []).map((s, i) => (
                <span key={i}>
                  <span className="text-emerald-400">'{s}'</span>
                  {i < perfil.codeSetores.length - 1 ? ", " : ""}
                </span>
              ))}
              ],
            </p>
            <p className="pl-6">
              <span className="text-slate-300">tecnologias:</span> [
              {(perfil.codeTecnologias || []).map((t, i) => (
                <span key={i}>
                  <span className="text-emerald-400">'{t}'</span>
                  {i < perfil.codeTecnologias.length - 1 ? ", " : ""}
                </span>
              ))}
              ],
            </p>
            <p className="pl-6">
              <span className="text-slate-300">mindset:</span>{" "}
              <span className="text-emerald-400">'{perfil.codeMindset}'</span>
            </p>
            <p>{"}"};</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
