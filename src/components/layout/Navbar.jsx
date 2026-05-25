import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-blue-500 transform origin-left z-[100]" style={{ scaleX }} />
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-full px-8 py-4 flex gap-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {['Sobre', 'Experiência', 'Skills', 'Projetos'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold tracking-wide text-slate-400 hover:text-white uppercase transition-colors relative group">
            {item}
            <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </motion.nav>
    </>
  );
};