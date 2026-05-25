// src/data.jsx
import React from 'react';
import { Code2, Smartphone, Globe, Terminal, Server, Layout, PenTool } from 'lucide-react';
import villageFoto from '../assets/iscte-village.png';
import qeFoto from '../assets/quinta-da-escola.png';
import santaMartaFoto from '../assets/santa-marta.png';
import tfcFoto from '../assets/tfc.png';


export const experiencias = [
  { empresa: "NTTDATA", cargo: "Software Engineer", data: "Set 2025 - Presente", desc: "Desenvolvimento de plataforma unificada de atendimento em Angular. Implementação de automatismos para geração de Leads comerciais e migração de código legado com foco em performance.", icon: <Globe className="text-blue-400 group-hover:text-blue-300 transition-colors" size={24} /> },
  { empresa: "AEISCTE", cargo: "Coordenador de IT", data: "Nov 2023 - Jun 2025", desc: "Liderança da equipa de desenvolvimento e definição de roadmap. Desenvolvimento Full-stack dos portais da associação, digitalizando processos internos vitais.", icon: <Terminal className="text-yellow-400 group-hover:text-yellow-300 transition-colors" size={24} /> },
  { empresa: "Xpand IT", cargo: "Software Engineer", data: "Jul 2022 - Jul 2023", desc: "Desenvolvimento de módulo de digitalização documental para instituição bancária internacional usando Swift e Kotlin, garantindo alta performance no processamento de imagem.", icon: <Smartphone className="text-emerald-400 group-hover:text-emerald-300 transition-colors" size={24} /> },
  { empresa: "Digital Xperience", cargo: "Software Engineer", data: "Abr 2020 - Jul 2022", desc: "Arquitetura e desenvolvimento Full-stack de plataformas E-Commerce. Responsável pelo ciclo completo (End-to-End), integrando pagamentos e gerindo dados transacionais.", icon: <Code2 className="text-purple-400 group-hover:text-purple-300 transition-colors" size={24} /> }
];

export const categoriasSkills = [
  { titulo: "Mobile Nativo", icon: <Smartphone size={20} className="text-emerald-400" />, glowColor: "rgba(52, 211, 153, 0.15)", skills: ["Kotlin", "Swift", "Java"] },
  { titulo: "Frontend", icon: <Layout size={20} className="text-blue-400" />, glowColor: "rgba(96, 165, 250, 0.15)", skills: ["Angular", "React", "TypeScript", "HTML/SCSS"] },
  { titulo: "Backend", icon: <Server size={20} className="text-purple-400" />, glowColor: "rgba(167, 139, 250, 0.15)", skills: ["Node.js", "Express", "NestJS", "Firebase", "SQL", "MongoDB"] },
  { titulo: "DevOps & Tools", icon: <PenTool size={20} className="text-yellow-400" />, glowColor: "rgba(250, 204, 21, 0.15)", skills: ["Docker", "Git", "Agile (Scrum)", "CI/CD"] }
];

export const projetos = [
  { 
    title: "Follow-up Hospital Santa Marta", 
    desc: "Tese de mestrado (19 valores): Modernização do acompanhamento clínico hospitalar através de uma plataforma web que unifica a recolha de dados relatados pelos pacientes (ePROs). A solução automatiza o envio de alertas para equipas médicas sempre que parâmetros críticos são detectados, otimizando recursos e reduzindo a pressão sobre os profissionais de saúde.", 
    tags: ["Angular", "Express", "MongoDB"], 
    image: santaMartaFoto,
    github: "https://github.com/tiagoagueda240/Tese-Iscte", // Só GitHub
  },
  { 
    title: "Aplicação de Gestão de Turnos", 
    desc: "Solução integrada para a modernização administrativa da Quinta da Escola. A plataforma centraliza horários, atividades e notificações, oferecendo uma gestão simplificada e segura através de uma arquitetura moderna.", 
    tags: ["Angular", "PHP", "SQL"], 
    image: qeFoto,
    demo: "https://turnos.quintadaescola.com/" // Só Demo
  },
  { 
    title: "Gestão de Salas Lusófona", 
    desc: "Solução full-stack para a modernização digital da Universidade Lusófona. O projeto unifica a gestão de horários, notificações e requisições de salas num único portal intuitivo. Utilizei Angular e NestJS para criar uma experiência fluida e segura, suportada por uma infraestrutura sólida em Docker e SQL.", 
    tags: ["Angular", "NestJS", "SQL", "Docker"], 
    image: tfcFoto,
    github: "https://github.com/tiagoagueda240/control-panel-front-end", 
    demo: "https://www.youtube.com/watch?v=WpTkZ8L7OcY"
  },
  { 
    title: "Aplicação de logística AEISCTE", 
    desc: "Gestão e inscrição da viagem a Punta Umbría da Associação de Estudantes do ISCTE. O sistema foi desenhado para substituir processos manuais por um fluxo digital automatizado, capaz de lidar com centenas de inscrições em simultâneo e gerir toda a logística do evento.", 
    tags: ["Angular", "Firebase"], 
    image: villageFoto,
    demo:"https://isctevillage.web.app/"
  }
];

export const educacao = [
  { curso: "Mestrado em Engenharia Informática", escola: "ISCTE", data: "2023 - 2025", extra: "Tese (19 Valores)" },
  { curso: "Licenciatura em Engenharia Informática", escola: "Universidade Lusófona", data: "2020 - 2023", extra: "Projeto Final (18 Valores)" },
  { curso: "Erasmus", escola: "Roterdão e Madrid", data: "Experiência Internacional", extra: "Inovação" },
  { curso: "Técnico de Multimédia", escola: "Escola Profissional de Imagem", data: "2017 - 2020", extra: "UI/UX" }
];