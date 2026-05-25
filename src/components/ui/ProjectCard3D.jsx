import { motion, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useRef } from "react";

export const ProjectCard3D = ({ project, index, onClick }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(event) {
    const rect = cardRef.current.getBoundingClientRect();
    x.set(event.clientX - (rect.left + rect.width / 2));
    y.set(event.clientY - (rect.top + rect.height / 2));
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ perspective: 1000 }}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="h-full"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="group relative h-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-colors duration-300"
      >
        <div className="h-64 w-full bg-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100"
          />
        </div>
        <div className="relative z-20 p-8 -mt-20 flex flex-col h-[calc(100%-11rem)]">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 bg-emerald-900/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-emerald-800/50"
              >
                {tag}
              </span>
            ))}
          </div>
          <h4 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
            {project.title}
          </h4>
          <p className="text-slate-400 mb-8 leading-relaxed flex-grow">
            {project.desc}
          </p>

          <div className="flex gap-6 mt-auto">
            {/* RENDERIZAÇÃO CONDICIONAL: Só aparece se project.github existir e não for vazio */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-slate-300 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all hover:translate-x-1"
              >
                <Github size={18} /> Código
              </a>
            )}

            {/* RENDERIZAÇÃO CONDICIONAL: Só aparece se project.demo existir e não for vazio */}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-slate-300 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all hover:translate-x-1"
              >
                <ExternalLink size={18} /> Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
