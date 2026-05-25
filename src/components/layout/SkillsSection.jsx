import React from 'react';
import { motion } from 'framer-motion';
import { categoriasSkills } from '../../data/data';
import { SkillCard } from '../ui/SkillCard';

export const SkillsSection = () => (
  <section id="skills">
    <motion.div className="flex items-center gap-6 mb-12" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
      <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white whitespace-nowrap">Skills Técnicos.</h3>
      <div className="h-px bg-slate-800 flex-grow"></div>
    </motion.div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {categoriasSkills.map((cat, index) => <SkillCard key={index} cat={cat} index={index} />)}
    </div>
  </section>
);