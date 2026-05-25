import React from 'react';
import { motion } from 'framer-motion';
import { educacao } from '../../data/data';

export const EducationSection = () => (
  <section className="py-32">
    <motion.div className="flex items-center gap-6 mb-16" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
      <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Percurso Académico.</h3>
      <div className="h-px bg-slate-800 flex-grow"></div>
    </motion.div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {educacao.map((item, index) => (
        <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex flex-col border border-slate-800 bg-slate-900/30 rounded-2xl p-8 hover:border-blue-500/30 transition-colors">
          <span className="font-mono text-blue-400 text-sm mb-2 block font-bold">{item.data}</span>
          <h4 className="font-bold text-2xl text-white mb-2">{item.curso}</h4>
          <p className="text-slate-400 text-lg">{item.escola}</p>
          {item.extra && <span className="mt-4 inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-sm rounded-full border border-blue-500/20 w-fit">{item.extra}</span>}
        </motion.div>
      ))}
    </div>
  </section>
);