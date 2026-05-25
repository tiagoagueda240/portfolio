import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import minhaFoto from '../../assets/foto-tiago-agueda.jpg';
import meuCV from '../../assets/Curriculo_Tiago_Agueda.pdf';

export const HeroSection = () => {
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 500], [0, 80]);
  const heroPhotoY = useTransform(scrollY, [0, 500], [0, 40]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.section style={{ opacity: heroOpacity }} className="min-h-[80vh] flex flex-col justify-center items-center relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
        
        {/* LADO ESQUERDO: TEXTOS E BOTÕES (Centrado no Mobile) */}
        <motion.div style={{ y: heroTextY }} className="lg:col-span-7 order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }} className="flex flex-col items-center lg:items-start w-full">
            
            <motion.div variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-3 mb-6">
              <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span></span>
              <span className="text-emerald-400 font-mono text-xs sm:text-sm uppercase tracking-widest border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full">Disponível para desafios</span>
            </motion.div>
            
            <motion.h1 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter mb-4 text-white drop-shadow-2xl leading-none">
              Tiago Águeda<span className="text-blue-500">.</span>
            </motion.h1>
            
            <motion.h2 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-slate-400 mb-8 max-w-2xl tracking-tight leading-tight">
              Construo software <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">seguro, escalável e imersivo.</span>
            </motion.h2>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto justify-center lg:justify-start">
              <MagneticButton href="#projetos" className="group relative px-8 py-4 bg-white text-slate-950 font-black uppercase tracking-widest text-sm rounded-full overflow-hidden transition-transform w-full sm:w-auto text-center">
                <span className="relative z-10 flex items-center justify-center gap-2">Ver Projetos <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </MagneticButton>
                            <MagneticButton href={meuCV} target="_blank" className="px-8 py-4 bg-slate-900 border border-slate-700 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-slate-800 transition-colors w-full sm:w-auto text-center">
                Currículo
              </MagneticButton>
              
              <MagneticButton href="#contacto" className="px-8 py-4 bg-slate-900 border border-slate-700 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-slate-800 transition-colors w-full sm:w-auto text-center">
                Contactar
              </MagneticButton>


            </motion.div>
            
          </motion.div>
        </motion.div>

        {/* LADO DIREITO: FOTO (Bem dimensionada para Mobile) */}
        <motion.div style={{ y: heroPhotoY }} className="lg:col-span-5 relative w-full flex justify-center lg:justify-end order-1 lg:order-2">
          <motion.div initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="relative w-full max-w-[260px] sm:max-w-sm lg:max-w-md">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/40 to-emerald-400/40 rounded-[2.5rem] blur-2xl animate-pulse"></div>
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-700/50 bg-slate-900 shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent z-10 opacity-60"></div>
               <img src={minhaFoto} alt="Tiago Águeda" className="w-full h-full object-cover  hover:grayscale-0 transition-all duration-700 ease-in-out" />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
};