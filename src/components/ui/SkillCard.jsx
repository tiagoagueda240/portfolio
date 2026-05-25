import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export const SkillCard = ({ cat, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group rounded-2xl border border-slate-800 bg-slate-900/30 p-5 sm:p-6 overflow-hidden flex flex-col transition-colors hover:border-slate-700/50"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100 hidden md:block"
        style={{
          background: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, ${cat.glowColor}, transparent 80%)`,
        }}
      />
      <div className="mb-4 p-2.5 bg-slate-900/80 rounded-xl w-fit border border-slate-800/50 shadow-sm group-hover:-translate-y-1 transition-transform duration-500">
        {cat.icon}
      </div>
      <h4 className="text-base sm:text-lg font-bold text-white mb-3 tracking-tight relative z-10">
        {cat.titulo}
      </h4>
      <div className="flex flex-wrap gap-1.5 mt-auto relative z-10">
        {cat.skills.map((skill, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-slate-800/50 backdrop-blur-md text-slate-300 text-[10px] sm:text-xs font-medium font-mono rounded border border-slate-700/30 hover:border-slate-500 hover:text-white hover:bg-slate-700/50 transition-all cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
