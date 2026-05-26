import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { usePortfolio } from "./context/PortfolioContext";

// Layout & UI
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";

// Sections (Corrigido para a pasta correta)
import { AboutSection } from "./components/layout/AboutSection";
import { EducationSection } from "./components/layout/EducationSection";
import { ExperienceSection } from "./components/layout/ExperienceSection";
import { HeroSection } from "./components/layout/HeroSection";
import { ProjectsSection } from "./components/layout/ProjectsSection";
import { SkillsSection } from "./components/layout/SkillsSection";

export default function App() {
  const { siteConfig } = usePortfolio();
  const sec = siteConfig?.sections ?? {};

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hasMouse, setHasMouse] = useState(false);

  const cursorXSpring = useSpring(cursorX, {
    damping: 25,
    stiffness: 300,
    mass: 0.5,
  });
  const cursorYSpring = useSpring(cursorY, {
    damping: 25,
    stiffness: 300,
    mass: 0.5,
  });

  useEffect(() => {
    // Só ativa o cursor magnético se for um dispositivo com rato (evita bugs no mobile)
    if (window.matchMedia("(pointer: fine)").matches) {
      setHasMouse(true);
      const moveCursor = (e) => {
        cursorX.set(e.clientX - 16);
        cursorY.set(e.clientY - 16);
      };
      window.addEventListener("mousemove", moveCursor);
      document.body.style.cursor = "none";

      return () => {
        window.removeEventListener("mousemove", moveCursor);
        document.body.style.cursor = "auto";
      };
    }
  }, [cursorX, cursorY]);

  return (
    <div className="bg-[#030303] min-h-screen text-slate-200 font-sans relative overflow-x-hidden selection:bg-blue-500/30">
      <Navbar />

      {/* Efeito Cursor - Apenas Desktop */}
      {hasMouse && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 w-8 h-8 border border-blue-500/40 rounded-full z-[100] mix-blend-screen"
          style={{ x: cursorXSpring, y: cursorYSpring }}
        >
          <div className="w-1 h-1 bg-blue-400 rounded-full m-auto absolute inset-0"></div>
        </motion.div>
      )}

      {/* Luzes de Fundo Ambientais e Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[100vw] md:w-[50vw] h-[100vw] md:h-[50vw] rounded-full bg-blue-900/10 blur-[120px]"
          animate={{ x: [0, 50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      {/* MAIN CONTAINER: Agora sem a restrição do CSS antigo, usamos as bordas do ecrã! */}
      <main className="relative z-10 max-w-7xl mx-auto pt-24 pb-32 px-4 sm:px-8 md:px-12 space-y-24 md:space-y-40">
        {sec.hero?.visible !== false && <HeroSection />}
        {sec.sobre?.visible !== false && <AboutSection />}
        {sec.experiencia?.visible !== false && <ExperienceSection />}
        {sec.skills?.visible !== false && <SkillsSection />}
        {sec.projetos?.visible !== false && <ProjectsSection />}
        {sec.educacao?.visible !== false && <EducationSection />}
      </main>

      <Footer />
    </div>
  );
}
