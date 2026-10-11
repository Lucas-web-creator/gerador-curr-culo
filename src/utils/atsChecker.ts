import { ResumeData } from '../types/resume';

export interface AtsCheckItem {
  id: string;
  title: string;
  description: string;
  passed: boolean;
  scoreImpact: number;
  tip: string;
}

export interface AtsEvaluation {
  score: number; // 0 to 100
  rating: 'Excelente' | 'Bom' | 'Atenção' | 'Crítico';
  checks: AtsCheckItem[];
  actionVerbsFound: string[];
  metricsCount: number;
}

export const ACTION_VERBS_LIST = [
  // Liderança e Gestão
  'Liderou', 'Gerenciou', 'Coordenou', 'Supervisionou', 'Direcionou', 'Capacitou', 'Mentoriou', 'Conduziu', 'Mobilizou', 'Estruturou',
  // Execução e Desenvolvimento
  'Desenvolveu', 'Implementou', 'Construiu', 'Criou', 'Projetou', 'Arquiteteu', 'Codificou', 'Executou', 'Elaborou', 'Configurou',
  // Otimização e Melhoria
  'Otimizou', 'Aumentou', 'Reduziu', 'Elevou', 'Maximizou', 'Minimizou', 'Automatizou', 'Acelerou', 'Simplificou', 'Consolidou',
  // Análise e Estratégia
  'Analisou', 'Mapeou', 'Diagnosticou', 'Avaliou', 'Modelou', 'Pesquisou', 'Identificou', 'Formulou', 'Planejou', 'Definiu',
  // Negociação e Resultados
  'Negociou', 'Alavancou', 'Conquistou', 'Entregou', 'Alcançou', 'Superou', 'Gerou', 'Economizou', 'Captou', 'Transformou'
];

export const ACTION_VERBS_CATEGORIES = [
  {
    category: 'Resultados & Métricas',
    verbs: ['Aumentou', 'Reduziu', 'Alavancou', 'Maximizou', 'Economizou', 'Superou', 'Gerou', 'Otimizou', 'Acelerou', 'Elevou'],
  },
  {
    category: 'Liderança & Gestão',
    verbs: ['Liderou', 'Gerenciou', 'Coordenou', 'Direcionou', 'Mentoriou', 'Capacitou', 'Supervisionou', 'Conduziu', 'Estruturou'],
  },
  {
    category: 'Criação & Engenharia',
    verbs: ['Desenvolveu', 'Implementou', 'Arquiteteu', 'Projetou', 'Construiu', 'Criou', 'Automatizou', 'Codificou', 'Configurou'],
  },
  {
    category: 'Estratégia & Análise',
    verbs: ['Diagnosticou', 'Analisou', 'Mapeou', 'Formulou', 'Planejou', 'Modelou', 'Identificou', 'Definiu', 'Validou'],
  },
  {
    category: 'Relacionamento & Negócios',
    verbs: ['Negociou', 'Conquistou', 'Parcerizou', 'Alinhou', 'Facilitou', 'Apresentou', 'Integrou', 'Transformou'],
  },
];

export function evaluateResumeForAts(data: ResumeData): AtsEvaluation {
  const checks: AtsCheckItem[] = [];

  // 1. Layout de Coluna Única (Sempre verdadeiro na nossa arquitetura ATS)
  checks.push({
    id: 'single-column',
    title: 'Layout em Coluna Única Semântica',
    description: 'Sistemas ATS (Taleo, Workday, Gupy) leem em fluxo contínuo. Colunas duplas misturam parágrafos.',
    passed: true,
    scoreImpact: 15,
    tip: 'Seu modelo já garante estrutura vertical única sem tabelas ou caixas flutuantes.',
  });

  // 2. Dados de Contato Essenciais
  const hasEmail = Boolean(data.personalInfo.email.trim());
  const hasPhone = Boolean(data.personalInfo.phone.trim());
  const hasLocation = Boolean(data.personalInfo.location.trim());
  const contactPassed = Boolean(data.personalInfo.fullName.trim()) && hasEmail && hasPhone && hasLocation;
  checks.push({
    id: 'contact-info',
    title: 'Dados de Contato Canônicos',
    description: 'Nome, E-mail, Telefone e Cidade/Estado devem estar identificáveis no topo.',
    passed: contactPassed,
    scoreImpact: 15,
    tip: 'Preencha nome completo, e-mail profissional, telefone e localização para evitar descarte automático.',
  });

  // 3. Cargo Pretendido / Título Profissional
  const hasTargetRole = Boolean(data.personalInfo.targetRole.trim());
  checks.push({
    id: 'target-role',
    title: 'Cargo Pretendido / Título no Topo',
    description: 'O algoritmo faz correspondência direta com o título da vaga cadastrada.',
    passed: hasTargetRole,
    scoreImpact: 10,
    tip: 'Adicione o cargo exato que você está buscando (ex: "Desenvolvedor Frontend Sênior").',
  });

  // 4. Resumo Profissional / Perfil
  const summaryWords = data.summary.trim().split(/\s+/).filter(Boolean).length;
  const summaryPassed = summaryWords >= 25 && summaryWords <= 160;
  checks.push({
    id: 'summary-length',
    title: 'Resumo Profissional Conciso',
    description: 'Resumo entre 30 e 150 palavras com síntese de anos de experiência e principais competências.',
    passed: summaryPassed,
    scoreImpact: 10,
    tip: summaryWords === 0
      ? 'Adicione um resumo profissional de 3 a 5 linhas.'
      : summaryWords < 25
      ? 'Seu resumo está muito curto. Adicione anos de experiência e principais resultados.'
      : summaryWords > 160
      ? 'Seu resumo está longo. Seja mais direto para manter a legibilidade do robô e do recrutador.'
      : 'Tamanho ideal do resumo atingido.',
  });

  // 5. Experiências com Bullet Points
  const experiencesCount = data.experiences.length;
  const hasBullets = data.experiences.some((exp) => exp.bullets.some((b) => b.trim().length > 10));
  const expPassed = experiencesCount > 0 && hasBullets;
  checks.push({
    id: 'experience-bullets',
    title: 'Experiências em Tópicos (Bullet Points)',
    description: 'O ATS valoriza tópicos curtos (bullets) muito mais do que blocos densos de texto.',
    passed: expPassed,
    scoreImpact: 15,
    tip: 'Divida cada experiência profissional em 3 a 5 tópicos diretos e objetivos.',
  });

  // 6. Verbos de Ação
  const fullText = [
    data.summary,
    ...data.experiences.flatMap((e) => [e.role, e.company, ...e.bullets]),
    ...data.education.flatMap((ed) => [ed.degree, ed.fieldOfStudy]),
    ...data.skills.map((s) => s.skills),
  ].join(' ');

  const foundVerbs: string[] = [];
  ACTION_VERBS_LIST.forEach((verb) => {
    const regex = new RegExp(`\\b${verb}\\b`, 'i');
    if (regex.test(fullText) && !foundVerbs.includes(verb)) {
      foundVerbs.push(verb);
    }
  });

  const verbsPassed = foundVerbs.length >= 3;
  checks.push({
    id: 'action-verbs',
    title: 'Uso de Verbos de Ação Fortes',
    description: 'Verbos fortes (ex: Liderou, Otimizou, Implementou, Reduziu) aumentam a pontuação de relevância.',
    passed: verbsPassed,
    scoreImpact: 15,
    tip: verbsPassed
      ? `Identificados ${foundVerbs.length} verbos de ação recomendados.`
      : 'Inicie os tópicos de experiência com verbos de ação no passado (ex: "Desenvolveu...", "Otimizou...").',
  });

  // 7. Presença de Métricas Quantificáveis (%, R$, $, números)
  const metricsRegex = /(\d+[\.,]?\d*[%％]|\bR\$\s*\d+|\$\s*\d+|\b\d+\s*(mil|milhões|k|anos|meses|dias|equipes|projetos|usuários|stars)\b|\b\d{2,}\b)/gi;
  const allBullets = data.experiences.flatMap((e) => e.bullets).join(' ');
  const metricsMatches = allBullets.match(metricsRegex) || [];
  const metricsCount = metricsMatches.length;
  const metricsPassed = metricsCount >= 2;
  checks.push({
    id: 'quantifiable-metrics',
    title: 'Resultados Quantificáveis (Métricas e Números)',
    description: 'Tópicos que incluem métricas (ex: "aumento de 25%", "redução de R$ 50k") têm 40% mais chances de entrevista.',
    passed: metricsPassed,
    scoreImpact: 10,
    tip: metricsPassed
      ? `Foram identificadas ${metricsCount} métricas quantificáveis nas suas experiências.`
      : 'Inclua porcentagens, valores economizados ou volumes de usuários atendidos nos tópicos de experiência.',
  });

  // 8. Habilidades Técnicas Categorizadas em Texto
  const hasSkills = data.skills.length > 0 && data.skills.some((s) => s.skills.trim().length > 3);
  checks.push({
    id: 'skills-categorized',
    title: 'Hard Skills em Texto Puro',
    description: 'Evite barras de porcentagem gráficas. O ATS lê texto simples (ex: "Linguagens: Python, SQL").',
    passed: hasSkills,
    scoreImpact: 10,
    tip: 'Categorize suas habilidades por temas para facilitar a extração automática pelo parser.',
  });

  // Calcular pontuação total
  let totalScore = 0;
  checks.forEach((c) => {
    if (c.passed) {
      totalScore += c.scoreImpact;
    }
  });

  // Trava de pontuação 0 a 100
  totalScore = Math.min(100, Math.max(0, totalScore));

  let rating: 'Excelente' | 'Bom' | 'Atenção' | 'Crítico' = 'Crítico';
  if (totalScore >= 85) rating = 'Excelente';
  else if (totalScore >= 70) rating = 'Bom';
  else if (totalScore >= 50) rating = 'Atenção';

  return {
    score: totalScore,
    rating,
    checks,
    actionVerbsFound: foundVerbs,
    metricsCount,
  };
}
