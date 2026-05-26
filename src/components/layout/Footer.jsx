import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import { MagneticButton } from "../ui/MagneticButton";

export const Footer = () => {
  const { perfil } = usePortfolio();
  return (
    <footer
      id="contacto"
      className="relative border-t border-slate-800/50 bg-[#020202] pt-32 pb-16 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center p-4 bg-blue-500/10 rounded-full mb-8"
        >
          <Mail size={40} className="text-blue-400" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-white"
        >
          Vamos trabalhar{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            juntos?
          </span>
        </motion.h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Seja para uma nova oportunidade ou um projeto desafiante, a minha
          caixa de entrada está aberta.
        </p>
        <MagneticButton
          href={`mailto:${perfil.email}`}
          className="inline-flex items-center gap-3 bg-white text-slate-950 font-black tracking-widest uppercase text-sm px-12 py-6 rounded-full transition-colors mb-32 hover:bg-slate-200"
        >
          Entrar em contacto <Send size={18} />
        </MagneticButton>
        <div className="flex justify-between items-center border-t border-slate-800 pt-8 flex-col-reverse md:flex-row gap-6">
          <p className="text-slate-500 text-sm font-mono">
            © {new Date().getFullYear()} Desenvolvido por Tiago Águeda.
          </p>
          <div className="flex gap-6">
            <a
              href={perfil.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={perfil.github}
              target="_blank"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Github size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
