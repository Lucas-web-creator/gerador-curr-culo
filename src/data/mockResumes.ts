import { ResumeData, ResumeStyleConfig } from '../types/resume';

export const defaultResumeStyles: ResumeStyleConfig = {
  fontFamily: 'Calibri',
  fontSize: 'normal',
  lineSpacing: 'normal',
  pageMargins: 'normal',
  sectionDivider: 'line',
  headerAlign: 'center',
  paperSize: 'a4',
};

export const emptyResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    targetRole: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    github: '',
  },
  summary: '',
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
  styles: { ...defaultResumeStyles },
};

export const mockTechResume: ResumeData = {
  personalInfo: {
    fullName: 'Lucas Padroni Alves',
    targetRole: 'Desenvolvedor Frontend Sênior | Especialista React & TypeScript',
    email: 'lucas.padroni@email.com',
    phone: '(11) 98765-4321',
    location: 'São Paulo, SP (Disponível para Remoto)',
    linkedin: 'linkedin.com/in/lucaspadroni',
    portfolio: 'lucaspadroni.dev',
    github: 'github.com/lucaspadroni',
  },
  summary:
    'Desenvolvedor Frontend Sênior com mais de 7 anos de experiência na concepção e escala de aplicações web de alto tráfego com React, TypeScript e Next.js. Histórico comprovado de liderança técnica de equipes ágeis, redução de 40% no tempo de carregamento de páginas críticas (Core Web Vitals) e implementação de Design Systems com 100% de cobertura de acessibilidade WCAG. Focado em arquitetura escalável, performance e excelência em UX.',
  experiences: [
    {
      id: 'exp-1',
      role: 'Desenvolvedor Frontend Sênior & Tech Lead',
      company: 'TechFin Soluções Digitais',
      location: 'São Paulo, SP',
      startDate: 'Março 2022',
      endDate: 'Presente',
      current: true,
      bullets: [
        'Liderou tecnicamente squad multidisciplinar de 8 engenheiros na reformulação da esteira de pagamentos em React e TypeScript, processando mais de R$ 50M mensais.',
        'Otimizou os indicadores Core Web Vitals (LCP de 3.8s para 1.1s e INP abaixo de 100ms), resultando em aumento de 18% na taxa de conversão do checkout.',
        'Arquiteteu biblioteca de componentes reutilizáveis (Design System) adotada por 5 produtos distintos, diminuindo o tempo de entrega de novas features em 35%.',
        'Implementou suíte de testes automatizados com Jest, React Testing Library e Cypress, elevando a cobertura de código crítico de 45% para 88%.',
      ],
    },
    {
      id: 'exp-2',
      role: 'Desenvolvedor Frontend Pleno',
      company: 'Nexus Software & Inovação',
      location: 'Campinas, SP (Remoto)',
      startDate: 'Janeiro 2019',
      endDate: 'Fevereiro 2022',
      current: false,
      bullets: [
        'Desenvolveu mais de 15 módulos de painel SaaS analítico utilizando React, Redux Toolkit e Tailwind CSS para mais de 120 mil usuários ativos mensais.',
        'Integrou APIs RESTful e WebSockets para visualização de dashboards financeiros em tempo real com latência inferior a 150ms.',
        'Reduziu o bundle size da aplicação em 42% por meio de code-splitting, tree-shaking e lazy loading de rotas.',
        'Colaborou diretamente com designers de produto e POs no refinamento de fluxos e validações de usabilidade.',
      ],
    },
    {
      id: 'exp-3',
      role: 'Desenvolvedor Web Júnior',
      company: 'Agência Alpha Digital',
      location: 'São Paulo, SP',
      startDate: 'Julho 2017',
      endDate: 'Dezembro 2018',
      current: false,
      bullets: [
        'Construiu landing pages responsivas e e-commerces integrados garantindo compatibilidade cross-browser e SEO técnico.',
        'Automatizou pipelines de deploy e integração contínua (CI/CD) utilizando GitHub Actions.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Bacharelado',
      fieldOfStudy: 'Ciência da Computação',
      institution: 'Universidade de São Paulo (USP)',
      location: 'São Paulo, SP',
      startDate: '2015',
      endDate: '2019',
      status: 'Concluído',
    },
    {
      id: 'edu-2',
      degree: 'Pós-Graduação Lato Sensu',
      fieldOfStudy: 'Arquitetura de Software e Soluções Cloud',
      institution: 'FIAP',
      location: 'São Paulo, SP',
      startDate: '2020',
      endDate: '2021',
      status: 'Concluído',
    },
  ],
  skills: [
    {
      id: 'skill-1',
      name: 'Linguagens & Tecnologias Principais',
      skills: 'TypeScript, JavaScript (ES6+), React 19, Next.js, HTML5 Semântico, CSS3 Moderno',
    },
    {
      id: 'skill-2',
      name: 'Estilização & Estado',
      skills: 'Tailwind CSS, CSS Modules, Styled Components, Redux Toolkit, Zustand, React Query',
    },
    {
      id: 'skill-3',
      name: 'Qualidade & Testes',
      skills: 'Jest, React Testing Library, Cypress, Vitest, Storybook, WCAG Acessibilidade',
    },
    {
      id: 'skill-4',
      name: 'Ferramentas & DevOps',
      skills: 'Git, GitHub Actions, Docker, Webpack, Vite, Node.js, REST APIs, GraphQL',
    },
  ],
  languages: [
    {
      id: 'lang-1',
      language: 'Português',
      proficiency: 'Nativo',
    },
    {
      id: 'lang-2',
      language: 'Inglês',
      proficiency: 'Avançado',
    },
    {
      id: 'lang-3',
      language: 'Espanhol',
      proficiency: 'Intermediário',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services (AWS)',
      year: '2023',
    },
    {
      id: 'cert-2',
      name: 'Meta Certified Frontend Developer Professional',
      issuer: 'Meta / Coursera',
      year: '2022',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Design System Open-Source',
      role: 'Criador & Mantenedor',
      technologies: 'React, Tailwind CSS, Radix UI, TypeScript',
      link: 'github.com/lucaspadroni/ui-tokens',
      description: 'Biblioteca acessível de componentes UI com mais de 1.200 stars no GitHub e documentação interativa.',
    },
  ],
  styles: { ...defaultResumeStyles },
};

export const mockBusinessResume: ResumeData = {
  personalInfo: {
    fullName: 'Mariana Costa Oliveira',
    targetRole: 'Gerente de Produto Sênior | Product Manager (SaaS B2B)',
    email: 'mariana.costa.pm@email.com',
    phone: '(21) 97654-3210',
    location: 'Rio de Janeiro, RJ (Remoto)',
    linkedin: 'linkedin.com/in/marianacostapm',
    portfolio: 'marianacosta.product',
    github: '',
  },
  summary:
    'Product Manager Sênior com 6 anos de atuação liderando produtos digitais de alta complexidade em startups e scale-ups SaaS B2B. Especialista em descoberta de produtos (Product Discovery), definição de métricas de sucesso (OKRs/KPIs), modelagem de crescimento de receita (PLG) e priorização ágil com frameworks RICE e Kano. Histórico comprovado de lançamento de novas linhas de produto que geraram mais de R$ 12M em ARR.',
  experiences: [
    {
      id: 'exp-b1',
      role: 'Group Product Manager (GPM)',
      company: 'ScaleMetrics Cloud',
      location: 'São Paulo, SP (Remoto)',
      startDate: 'Agosto 2022',
      endDate: 'Presente',
      current: true,
      bullets: [
        'Gerenciou estratégia de produto e roadmap para 3 squads multidisciplinares (24 profissionais de engenharia, design e dados).',
        'Lançou módulo corporativo de analytics com modelo de cobrança por consumo, gerando R$ 8.4M em faturamento anual recorrente (ARR) em 12 meses.',
        'Reduziu a taxa de churn em 28% através da reformulação profunda da jornada de onboarding e suporte self-service.',
        'Instituiu cultura orientada a dados implementando experimentos A/B contínuos que elevaram a retenção D30 em 15 pontos percentuais.',
      ],
    },
    {
      id: 'exp-b2',
      role: 'Product Manager Pleno',
      company: 'FinVortex Tecnologia Financeira',
      location: 'Rio de Janeiro, RJ',
      startDate: 'Fevereiro 2020',
      endDate: 'Julho 2022',
      current: false,
      bullets: [
        'Conduziu mais de 80 entrevistas qualitativas e pesquisas de mercado quantitativas para guiar a reformulação de produto de crédito.',
        'Aumentou o Net Promoter Score (NPS) de 42 para 74 em um ciclo de 18 meses com foco em usabilidade e redução de atrito transacional.',
        'Definiu e monitorou métricas de produto em Mixpanel, Amplitude e SQL, alinhando entregas semanais diretamente com metas de negócios do C-level.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-b1',
      degree: 'Bacharelado',
      fieldOfStudy: 'Administração de Empresas',
      institution: 'Pontifícia Universidade Católica (PUC-Rio)',
      location: 'Rio de Janeiro, RJ',
      startDate: '2014',
      endDate: '2018',
      status: 'Concluído',
    },
    {
      id: 'edu-b2',
      degree: 'MBA',
      fieldOfStudy: 'Gestão de Negócios e Inovação',
      institution: 'Fundação Getulio Vargas (FGV)',
      location: 'Rio de Janeiro, RJ',
      startDate: '2019',
      endDate: '2021',
      status: 'Concluído',
    },
  ],
  skills: [
    {
      id: 'skill-b1',
      name: 'Gestão de Produto & Metodologias',
      skills: 'Product Discovery, Roadmap Estratégico, OKRs, Scrum, Kanban, Framework RICE, Product-Led Growth (PLG)',
    },
    {
      id: 'skill-b2',
      name: 'Dados & Analytics',
      skills: 'SQL básico, Amplitude, Mixpanel, Google Analytics 4, Metabase, Testes A/B, Cohort Analysis',
    },
    {
      id: 'skill-b3',
      name: 'Ferramentas de Gestão',
      skills: 'Jira, Confluence, Linear, Notion, Figma, Miro, Slack',
    },
  ],
  languages: [
    {
      id: 'lang-b1',
      language: 'Português',
      proficiency: 'Nativo',
    },
    {
      id: 'lang-b2',
      language: 'Inglês',
      proficiency: 'Fluente',
    },
  ],
  certifications: [
    {
      id: 'cert-b1',
      name: 'Certified Scrum Product Owner (CSPO)',
      issuer: 'Scrum Alliance',
      year: '2021',
    },
    {
      id: 'cert-b2',
      name: 'Product Leadership Certificate',
      issuer: 'Product School',
      year: '2022',
    },
  ],
  projects: [],
  styles: { ...defaultResumeStyles, fontFamily: 'Georgia', headerAlign: 'left' },
};
