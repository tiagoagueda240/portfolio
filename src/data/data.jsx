// src/data.jsx
import {
  Code2,
  Globe,
  Layout,
  PenTool,
  Server,
  Smartphone,
  Terminal,
} from "lucide-react";
import villageFoto from "../assets/iscte-village.png";
import qeFoto from "../assets/quinta-da-escola.png";
import santaMartaFoto from "../assets/santa-marta.png";
import tfcFoto from "../assets/tfc.png";

export const experiencias = [
  {
    id: "nttdata",
    empresa: "NTTDATA",
    cargo: "Software Engineer",
    data: "Set 2025 - Presente",
    desc: "Desenvolvimento de plataforma unificada de atendimento em Angular. Implementação de automatismos para geração de Leads comerciais e migração de código legado com foco em performance.",
    icon: (
      <Globe
        className="text-blue-400 group-hover:text-blue-300 transition-colors"
        size={24}
      />
    ),
    detalhes: {
      responsabilidades: [
        "Desenvolvimento de plataforma unificada de atendimento ao cliente em Angular e TypeScript",
        "Implementação de automatismos para geração e qualificação de Leads comerciais",
        "Migração de módulos de código legado com foco em performance e manutenibilidade",
        "Code reviews e definição de padrões de qualidade de código com a equipa",
      ],
      stack: [
        "Angular",
        "TypeScript",
        "RxJS",
        "HTML/SCSS",
        "Java",
        "Spring Boot",
        "Git",
        "Jira",
      ],
      conquistas: [
        "Automatização do processo de geração de Leads, eliminando workflows manuais",
        "Redução significativa de bugs após migração e refatoração do código legado",
      ],
    },
  },
  {
    id: "aeiscte",
    empresa: "AEISCTE",
    cargo: "Coordenador de IT",
    data: "Nov 2023 - Jun 2025",
    desc: "Liderança da equipa de desenvolvimento e definição de roadmap. Desenvolvimento Full-stack dos portais da associação, digitalizando processos internos vitais.",
    icon: (
      <Terminal
        className="text-yellow-400 group-hover:text-yellow-300 transition-colors"
        size={24}
      />
    ),
    detalhes: {
      responsabilidades: [
        "Liderança técnica de uma equipa de 4 developers e definição do roadmap técnico",
        "Desenvolvimento Full-stack de portais internos e externos da associação de estudantes",
        "Digitalização de processos: inscrições, gestão de eventos e logística académica",
        "Implementação de autenticação segura e gestão de permissões por roles",
      ],
      stack: [
        "Angular",
        "TypeScript",
        "Node.js",
        "Firebase",
        "Firestore",
        "Firebase Hosting",
        "Git",
      ],
      conquistas: [
        "Digitalização completa dos processos de inscrição e gestão de eventos académicos",
        "Sistema de gestão de viagem para +300 estudantes sem falhas operacionais",
      ],
    },
  },
  {
    id: "xpandit",
    empresa: "Xpand IT",
    cargo: "Software Engineer",
    data: "Jul 2022 - Jul 2023",
    desc: "Desenvolvimento de módulo de digitalização documental para instituição bancária internacional usando Swift e Kotlin, garantindo alta performance no processamento de imagem.",
    icon: (
      <Smartphone
        className="text-emerald-400 group-hover:text-emerald-300 transition-colors"
        size={24}
      />
    ),
    detalhes: {
      responsabilidades: [
        "Desenvolvimento de módulo de digitalização documental em Swift (iOS) e Kotlin (Android)",
        "Integração com APIs bancárias para processamento seguro de documentos sensíveis",
        "Otimização de algoritmos de processamento e análise de imagem",
        "Implementação seguindo normas de segurança bancária (PCI-DSS e ISO 27001)",
      ],
      stack: [
        "Swift",
        "UIKit",
        "Kotlin",
        "Android SDK",
        "Java",
        "CI/CD",
        "Bitbucket",
      ],
      conquistas: [
        "Módulo integrado em produção em instituição bancária com mais de 1 milhão de clientes",
        "Performance de processamento de imagem superior ao módulo legado anterior",
      ],
    },
  },
  {
    id: "digitalxperience",
    empresa: "Digital Xperience",
    cargo: "Software Engineer",
    data: "Abr 2020 - Jul 2022",
    desc: "Arquitetura e desenvolvimento Full-stack de plataformas E-Commerce. Responsável pelo ciclo completo (End-to-End), integrando pagamentos e gerindo dados transacionais.",
    icon: (
      <Code2
        className="text-purple-400 group-hover:text-purple-300 transition-colors"
        size={24}
      />
    ),
    detalhes: {
      responsabilidades: [
        "Arquitetura e desenvolvimento End-to-End de plataformas E-Commerce para múltiplos clientes",
        "Integração de sistemas de pagamento (Stripe, Multibanco, MB Way)",
        "Gestão de bases de dados transacionais e otimização de queries SQL",
        "Desenvolvimento de dashboards de analytics e gestão para administradores",
      ],
      stack: [
        "Angular",
        "Node.js",
        "Express",
        "MySQL",
        "Stripe API",
        "Docker",
        "cPanel",
      ],
      conquistas: [
        "Entrega de múltiplas plataformas E-Commerce em produção com alto volume de transações",
        "Sistema de pagamentos multi-método com 99.9% de uptime garantido",
      ],
    },
  },
];

export const categoriasSkills = [
  {
    id: "mobile",
    titulo: "Mobile Nativo",
    icon: <Smartphone size={20} className="text-emerald-400" />,
    glowColor: "rgba(52, 211, 153, 0.15)",
    skills: ["Kotlin", "Swift", "Java"],
  },
  {
    id: "frontend",
    titulo: "Frontend",
    icon: <Layout size={20} className="text-blue-400" />,
    glowColor: "rgba(96, 165, 250, 0.15)",
    skills: ["Angular", "React", "TypeScript", "HTML/SCSS"],
  },
  {
    id: "backend",
    titulo: "Backend",
    icon: <Server size={20} className="text-purple-400" />,
    glowColor: "rgba(167, 139, 250, 0.15)",
    skills: ["Node.js", "Express", "NestJS", "Firebase", "SQL", "MongoDB"],
  },
  {
    id: "devops",
    titulo: "DevOps & Tools",
    icon: <PenTool size={20} className="text-yellow-400" />,
    glowColor: "rgba(250, 204, 21, 0.15)",
    skills: ["Docker", "Git", "Agile (Scrum)", "CI/CD"],
  },
];

export const projetos = [
  {
    id: "santa-marta",
    title: "Follow-up Hospital Santa Marta",
    desc: "Tese de mestrado (19 valores): Modernização do acompanhamento clínico hospitalar através de uma plataforma web que unifica a recolha de dados relatados pelos pacientes (ePROs). A solução automatiza o envio de alertas para equipas médicas sempre que parâmetros críticos são detectados, otimizando recursos e reduzindo a pressão sobre os profissionais de saúde.",
    tags: ["Angular", "Express", "MongoDB"],
    image: santaMartaFoto,
    links: [
      {
        label: "Código",
        url: "https://github.com/tiagoagueda240/Tese-Iscte",
        tipo: "github",
      },
    ],
    detalhes: {
      galeria: [santaMartaFoto],
      desafio:
        "O Hospital de Santa Marta dependia de processos manuais e fragmentados para acompanhar o estado clínico dos pacientes após cirurgia cardíaca, resultando em atrasos na deteção de complicações pós-operatórias.",
      solucao:
        "Plataforma web que digitaliza a recolha de ePROs (Electronic Patient-Reported Outcomes). Os pacientes recebem questionários automáticos e o sistema analisa as respostas, gerando alertas imediatos para equipas médicas quando parâmetros críticos são detetados.",
      impacto:
        "Tese classificada com 19 valores e validada clinicamente no hospital. Demonstrou capacidade de reduzir o tempo de resposta a complicações e otimizar a gestão de recursos das equipas de saúde.",
      stack: {
        Frontend: ["Angular", "TypeScript", "Angular Material"],
        Backend: ["Node.js", "Express.js", "JWT Auth"],
        Base_de_Dados: ["MongoDB", "MongoDB Atlas"],
        Infra: ["Heroku", "SendGrid API"],
      },
    },
  },
  {
    id: "quinta-escola",
    title: "Aplicação de Gestão de Turnos",
    desc: "Solução integrada para a modernização administrativa da Quinta da Escola. A plataforma centraliza horários, atividades e notificações, oferecendo uma gestão simplificada e segura através de uma arquitetura moderna.",
    tags: ["Angular", "PHP", "SQL"],
    image: qeFoto,
    links: [
      {
        label: "Website",
        url: "https://turnos.quintadaescola.com/",
        tipo: "demo",
      },
    ],
    detalhes: {
      galeria: [qeFoto],
      desafio:
        "A Quinta da Escola geria turnos e horários de colaboradores através de folhas de cálculo e comunicação por WhatsApp, um processo propenso a erros, conflitos de horários e difícil de escalar.",
      solucao:
        "Aplicação web full-stack de gestão de turnos com autenticação por roles (admin/colaborador), calendário interativo, notificações automáticas por email e exportação de relatórios mensais.",
      impacto:
        "Sistema em produção utilizado diariamente pela equipa. Eliminou completamente a necessidade de folhas de cálculo manuais e reduziu os conflitos de horários a zero.",
      stack: {
        Frontend: ["Angular", "TypeScript", "PrimeNG"],
        Backend: ["PHP", "MySQL"],
        Infra: ["cPanel", "Apache", "Let's Encrypt"],
      },
    },
  },
  {
    id: "lusofona",
    title: "Gestão de Salas Lusófona",
    desc: "Solução full-stack para a modernização digital da Universidade Lusófona. O projeto unifica a gestão de horários, notificações e requisições de salas num único portal intuitivo. Utilizei Angular e NestJS para criar uma experiência fluida e segura, suportada por uma infraestrutura sólida em Docker e SQL.",
    tags: ["Angular", "NestJS", "SQL", "Docker"],
    image: tfcFoto,
    links: [
      {
        label: "Código",
        url: "https://github.com/tiagoagueda240/control-panel-front-end",
        tipo: "github",
      },
      {
        label: "Vídeo Demo",
        url: "https://www.youtube.com/watch?v=WpTkZ8L7OcY",
        tipo: "demo",
      },
    ],
    detalhes: {
      galeria: [tfcFoto],
      desafio:
        "A Universidade Lusófona carecia de uma plataforma unificada para a gestão de salas, horários de aulas e processos de requisição, recorrendo a sistemas dispersos e ineficientes.",
      solucao:
        "Portal full-stack modular com painéis distintos para alunos, docentes e administradores. Permite a gestão de horários, reserva de salas, envio de notificações e geração de relatórios, suportado por uma arquitetura escalável em Docker.",
      impacto:
        "Projeto Final de Curso classificado com 18 valores. Demonstrado como solução viável para modernização dos sistemas de gestão académica da universidade.",
      stack: {
        Frontend: ["Angular", "TypeScript", "Tailwind CSS"],
        Backend: ["NestJS", "TypeORM", "PostgreSQL"],
        Infra: ["Docker", "Docker Compose", "Nginx"],
      },
    },
  },
  {
    id: "aeiscte-village",
    title: "Aplicação de logística AEISCTE",
    desc: "Gestão e inscrição da viagem a Punta Umbría da Associação de Estudantes do ISCTE. O sistema foi desenhado para substituir processos manuais por um fluxo digital automatizado, capaz de lidar com centenas de inscrições em simultâneo e gerir toda a logística do evento.",
    tags: ["Angular", "Firebase"],
    image: villageFoto,
    links: [
      {
        label: "Aplicação",
        url: "https://isctevillage.web.app/",
        tipo: "demo",
      },
    ],
    detalhes: {
      galeria: [villageFoto],
      desafio:
        "Gerir as inscrições e toda a logística de uma viagem de estudo para mais de 300 estudantes através de formulários Google e emails era ineficiente, propenso a erros e impossível de escalar.",
      solucao:
        "Aplicação web completa com sistema de inscrição em tempo real, controlo automático de vagas por tipologia, painel de administração para gestão de participantes e autenticação segura via Firebase.",
      impacto:
        "Utilizada com sucesso na edição de 2024 da viagem ISCTE Village. Processou +300 inscrições sem incidentes, automatizando todo o fluxo logístico do evento.",
      stack: {
        Frontend: ["Angular", "TypeScript", "Angular Material"],
        Backend: ["Firebase Functions", "Firestore", "Firebase Auth"],
        Infra: ["Firebase Hosting", "Firebase Storage"],
      },
    },
  },
];

export const educacao = [
  {
    id: "mestrado",
    curso: "Mestrado em Engenharia Informática",
    escola: "ISCTE",
    data: "2023 - 2025",
    extra: "Tese (19 Valores)",
    detalhes: {
      descricao:
        "Especialização avançada em sistemas de software complexos com foco em segurança, sistemas distribuídos e desenvolvimento mobile. Culminou numa investigação aplicada em ambiente hospitalar real, resultando numa tese de 19 valores.",
      destaques: [
        "Tese aplicada no Hospital de Santa Marta — modernização do acompanhamento clínico (19 valores)",
        "UC Segurança Informática — criptografia, autenticação e normas de segurança",
        "UC Sistemas Distribuídos — arquiteturas de microserviços e comunicação assíncrona",
        "UC Computação Móvel — desenvolvimento iOS (Swift) e Android (Kotlin)",
      ],
    },
  },
  {
    id: "licenciatura",
    curso: "Licenciatura em Engenharia Informática",
    escola: "Universidade Lusófona",
    data: "2020 - 2023",
    extra: "Projeto Final (18 Valores)",
    detalhes: {
      descricao:
        "Formação base sólida em Engenharia Informática, cobrindo os fundamentos de programação, algoritmos, bases de dados e engenharia de software. Incluiu uma experiência de Erasmus e culminou num Projeto Final de 18 valores.",
      destaques: [
        "Projeto Final: Sistema de Gestão de Salas para a Universidade Lusófona (18 valores)",
        "Erasmus em Roterdão, Holanda — Rotterdam University of Applied Sciences",
        "UC Algoritmos e Estruturas de Dados, Bases de Dados Relacionais, Engenharia de Software",
        "UC Redes de Computadores e Sistemas Operativos",
      ],
    },
  },
  {
    id: "erasmus",
    curso: "Erasmus",
    escola: "Roterdão e Madrid",
    data: "Experiência Internacional",
    extra: "Inovação",
    detalhes: {
      descricao:
        "Programa de mobilidade internacional que enriqueceu a formação académica e pessoal através da exposição a diferentes culturas de trabalho e metodologias de ensino europeias.",
      destaques: [
        "Rotterdam University of Applied Sciences — Roterdão, Holanda",
        "Universidad Complutense de Madrid — Madrid, Espanha",
        "Exposição a metodologias de inovação e design thinking europeu",
        "Desenvolvimento de autonomia, comunicação intercultural e adaptabilidade",
      ],
    },
  },
  {
    id: "tecnico",
    curso: "Técnico de Multimédia",
    escola: "Escola Profissional de Imagem",
    data: "2017 - 2020",
    extra: "UI/UX",
    detalhes: {
      descricao:
        "Curso profissional de 3 anos que combinou fundamentos técnicos com criatividade visual. Formação em design, produção audiovisual e programação web que estabeleceu a base para a abordagem full-stack e sensibilidade UI/UX que aplico hoje.",
      destaques: [
        "Design Gráfico e Comunicação Visual (Photoshop, Illustrator, InDesign)",
        "Produção de vídeo, fotografia e motion graphics (Premiere, After Effects)",
        "Desenvolvimento Web: HTML, CSS e JavaScript",
        "Fundamentos de UI/UX e prototipagem de interfaces (Adobe XD)",
      ],
    },
  },
];
