import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

export const SpotlightCard = ({ exp, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <motion.div 
      className="relative group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 md:p-8 overflow-hidden h-full flex flex-col backdrop-blur-sm transition-all"
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
        style={{ background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(96, 165, 250, 0.15), transparent 80%)` }} 
      />
      <div className="relative z-10">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/50 group-hover:scale-110 transition-transform">
          {exp.icon}
        </div>
        <h4 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-tight">{exp.cargo}</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono mb-4">
          <span className="text-blue-400 uppercase">{exp.empresa}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-500">{exp.data}</span>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">{exp.desc}</p>
      </div>
    </motion.div>
  );
};