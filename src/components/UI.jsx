// src/components/UI.jsx
import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

export const MagneticButton = ({ children, className, href }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a href={href} ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} animate={{ x: position.x, y: position.y }} transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }} className={`inline-block ${className}`}>
      {children}
    </motion.a>
  );
};

export const SpotlightCard = ({ exp, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div className="relative group rounded-2xl border border-slate-800 bg-slate-900/40 p-8 overflow-hidden h-full flex flex-col backdrop-blur-sm hover:border-slate-700 transition-colors" onMouseMove={handleMouseMove} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: index * 0.1, type: "spring", stiffness: 100 }}>
      <motion.div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(96, 165, 250, 0.1), transparent 80%)` }} />
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-slate-800/80 ring-1 ring-slate-700/50 group-hover:ring-blue-500/50 transition-all duration-500 group-hover:scale-110 shadow-lg group-hover:shadow-blue-500/20">
          {exp.icon}
        </div>
        <h4 className="text-2xl font-bold text-slate-100 mb-2 tracking-tight">{exp.cargo}</h4>
        <p className="text-blue-400 font-mono text-sm mb-6 flex items-center gap-2">
          {exp.empresa} <span className="text-slate-600">•</span> <span className="text-slate-400">{exp.data}</span>
        </p>
        <p className="text-slate-400 text-base leading-relaxed flex-grow">{exp.desc}</p>
      </div>
    </motion.div>
  );
};

export const ProjectCard3D = ({ project, index }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(event) {
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ perspective: 1000 }} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: index * 0.2 }} className="h-full">
      <motion.div style={{ rotateX, rotateY }} className="group relative h-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-colors duration-300">
        <div className="h-64 w-full bg-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10"></div>
          <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100" />
        </div>
        <div className="relative z-20 p-8 -mt-20 flex flex-col h-[calc(100%-11rem)]">
          <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, i) => <span key={i} className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 bg-emerald-900/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-emerald-800/50">{tag}</span>)}
          </div>
          <h4 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{project.title}</h4>
          <p className="text-slate-400 mb-8 leading-relaxed line-clamp-3 flex-grow">{project.desc}</p>
          <div className="flex gap-6 mt-auto">
              <a href="#" className="text-slate-300 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all hover:translate-x-1"><Github size={18}/> Código</a>
              <a href="#" className="text-slate-300 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all hover:translate-x-1"><ExternalLink size={18}/> Demo</a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group rounded-2xl border border-slate-800 bg-slate-900/30 p-6 overflow-hidden flex flex-col transition-colors hover:border-slate-700/50"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{ background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, ${cat.glowColor}, transparent 80%)` }}
      />
      <div className={`mb-4 p-3 bg-slate-900/80 rounded-xl w-fit border border-slate-800/50 shadow-sm group-hover:-translate-y-1 transition-transform duration-500`}>
        {cat.icon}
      </div>
      <h4 className="text-lg font-bold text-white mb-4 tracking-tight relative z-10">{cat.titulo}</h4>
      <div className="flex flex-wrap gap-2 mt-auto relative z-10">
        {cat.skills.map((skill, i) => (
          <span key={i} className="px-2.5 py-1 bg-slate-800/50 backdrop-blur-md text-slate-300 text-xs font-medium font-mono rounded-md border border-slate-700/30 hover:border-slate-500 hover:text-white hover:bg-slate-700/50 transition-all cursor-default">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};