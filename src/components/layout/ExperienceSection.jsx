import React from 'react';
import { motion } from 'framer-motion';
import { experiencias } from '../../data/data';
import { SpotlightCard } from '../ui/SpotlightCard';

export const ExperienceSection = () => (
  <section id="experiência" className="py-32">
    <motion.div className="flex items-center gap-6 mb-16" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
      <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Experiência.</h3>
      <div className="h-px bg-slate-800 flex-grow"></div>
    </motion.div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {experiencias.map((exp, index) => <SpotlightCard key={index} exp={exp} index={index} />)}
    </div>
  </section>
);