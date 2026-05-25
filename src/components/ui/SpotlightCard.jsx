import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { getIcon } from "../../lib/icons";

export const SpotlightCard = ({ exp, index, onClick }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <motion.div
      className="relative group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 md:p-8 overflow-hidden h-full flex flex-col backdrop-blur-sm transition-all cursor-pointer"
      onClick={onClick}
      onMouseMove={(e) => {
        let { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100 hidden md:block"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(96, 165, 250, 0.15), transparent 80%)`,
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/50 group-hover:scale-110 transition-transform">
          {getIcon(exp.iconName, exp.iconColor)}
        </div>
        <h4 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">
          {exp.cargo}
        </h4>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-4">
          <span className="text-blue-400 uppercase">{exp.empresa}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-500">{exp.data}</span>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
          {exp.desc}
        </p>
        <div className="mt-auto pt-4 flex items-center gap-1 text-xs font-mono text-slate-600 group-hover:text-blue-400 transition-colors">
          <span>Ver detalhes</span>
          <span className="group-hover:translate-x-1 transition-transform inline-block">
            →
          </span>
        </div>
      </div>
    </motion.div>
  );
};
