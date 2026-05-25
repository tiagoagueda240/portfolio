import React from 'react';
import { motion } from 'framer-motion';

export const AboutSection = () => (
  <section id="sobre" className="py-32">
    <motion.div 
      className="flex items-center gap-6 mb-16" 
      initial={{ opacity: 0, x: -50 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      viewport={{ once: true }}
    >
      <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white">O meu perfil.</h3>
      <div className="h-px bg-slate-800 flex-grow"></div>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <motion.div 
  initial={{ opacity: 0, y: 30 }} 
  whileInView={{ opacity: 1, y: 0 }} 
  viewport={{ once: true }} 
  className="space-y-6 text-xl text-slate-400 leading-relaxed font-light"
>
  <p>
    Sou um Engenheiro de Software focado em converter problemas complexos em produtos digitais de alta performance. Especializei-me no desenvolvimento <strong className="text-blue-400">Full-Stack</strong> de sistemas resilientes.
  </p>
  <p>
    A minha experiência na <strong className="text-white">NTT DATA</strong> e <strong className="text-white font-medium">Xpand IT</strong> foca-se no desenho de arquiteturas de missão crítica para o setor bancário, onde a precisão técnica e a segurança de dados são requisitos fundamentais.
  </p>
  <p>
    Transponho este rigor corporativo para projetos de impacto real, desde a <strong className="text-white">digitalização de ecossistemas clínicos</strong> no Hospital de Santa Marta  até à automação logística de eventos académicos de larga escala.
  </p>
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
          <p><span className="text-purple-400">const</span> <span className="text-blue-300">perfil</span> = {'{'}</p>
          <p className="pl-6"><span className="text-slate-300">especialidade:</span> <span className="text-emerald-400">'Full-Stack'</span>,</p>
          <p className="pl-6"><span className="text-slate-300">setores:</span> [<span className="text-emerald-400">'Banca'</span>, <span className="text-emerald-400">'Saúde'</span>, <span className="text-emerald-400">'Logística'</span>],</p>
          <p className="pl-6"><span className="text-slate-300">tecnologias:</span> [<span className="text-emerald-400">'Angular'</span>, <span className="text-emerald-400">'Node.js'</span>, <span className="text-emerald-400">'TypeScript'</span>],</p>
          <p className="pl-6"><span className="text-slate-300">mindset:</span> <span className="text-emerald-400">'Zero Error Policy'</span></p>
          <p>{'}'};</p>
        </div>
      </motion.div>
    </div>
  </section>
);