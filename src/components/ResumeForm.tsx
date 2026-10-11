import React, { useState } from 'react';
import {
  ResumeData,
  ExperienceItem,
  EducationItem,
  SkillCategory,
  LanguageItem,
  CertificationItem,
  ProjectItem,
} from '../types/resume';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Globe2,
  Award,
  FolderGit2,
  FileText,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
} from 'lucide-react';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (updated: ResumeData) => void;
  onOpenVerbsModal: () => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
  data,
  onChange,
  onOpenVerbsModal,
}) => {
  // Accordion section state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    languages: false,
    certifications: false,
    projects: false,
  });

  const toggleSection = (sec: string) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  // Helper updates
  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], val: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: val,
      },
    });
  };

  const updateSummary = (val: string) => {
    onChange({ ...data, summary: val });
  };

  // Experiences
  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [''],
    };
    onChange({
      ...data,
      experiences: [newItem, ...data.experiences],
    });
    setOpenSections((prev) => ({ ...prev, experience: true }));
  };

  const updateExperience = (id: string, field: keyof ExperienceItem, val: any) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: val } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experiences: data.experiences.filter((exp) => exp.id !== id),
    });
  };

  const addExperienceBullet = (expId: string) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) =>
        exp.id === expId ? { ...exp, bullets: [...exp.bullets, ''] } : exp
      ),
    });
  };

  const updateExperienceBullet = (expId: string, bIdx: number, val: string) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) => {
        if (exp.id !== expId) return exp;
        const newBullets = [...exp.bullets];
        newBullets[bIdx] = val;
        return { ...exp, bullets: newBullets };
      }),
    });
  };

  const removeExperienceBullet = (expId: string, bIdx: number) => {
    onChange({
      ...data,
      experiences: data.experiences.map((exp) => {
        if (exp.id !== expId) return exp;
        const newBullets = exp.bullets.filter((_, idx) => idx !== bIdx);
        return { ...exp, bullets: newBullets.length ? newBullets : [''] };
      }),
    });
  };

  // Education
  const addEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: 'Bacharelado',
      fieldOfStudy: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      status: 'Concluído',
    };
    onChange({
      ...data,
      education: [...data.education, newItem],
    });
    setOpenSections((prev) => ({ ...prev, education: true }));
  };

  const updateEducation = (id: string, field: keyof EducationItem, val: any) => {
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: val } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  // Skills
  const addSkillCategory = () => {
    const newItem: SkillCategory = {
      id: `skill-${Date.now()}`,
      name: 'Competências Principais',
      skills: '',
    };
    onChange({
      ...data,
      skills: [...data.skills, newItem],
    });
    setOpenSections((prev) => ({ ...prev, skills: true }));
  };

  const updateSkillCategory = (id: string, field: keyof SkillCategory, val: string) => {
    onChange({
      ...data,
      skills: data.skills.map((s) => (s.id === id ? { ...s, [field]: val } : s)),
    });
  };

  const removeSkillCategory = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((s) => s.id !== id),
    });
  };

  // Languages
  const addLanguage = () => {
    const newItem: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Intermediário',
    };
    onChange({
      ...data,
      languages: [...data.languages, newItem],
    });
    setOpenSections((prev) => ({ ...prev, languages: true }));
  };

  const updateLanguage = (id: string, field: keyof LanguageItem, val: any) => {
    onChange({
      ...data,
      languages: data.languages.map((l) => (l.id === id ? { ...l, [field]: val } : l)),
    });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter((l) => l.id !== id),
    });
  };

  // Certifications
  const addCertification = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      year: new Date().getFullYear().toString(),
    };
    onChange({
      ...data,
      certifications: [...data.certifications, newItem],
    });
    setOpenSections((prev) => ({ ...prev, certifications: true }));
  };

  const updateCertification = (id: string, field: keyof CertificationItem, val: string) => {
    onChange({
      ...data,
      certifications: data.certifications.map((c) =>
        c.id === id ? { ...c, [field]: val } : c
      ),
    });
  };

  const removeCertification = (id: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter((c) => c.id !== id),
    });
  };

  // Projects
  const addProject = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      role: '',
      technologies: '',
      link: '',
      description: '',
    };
    onChange({
      ...data,
      projects: [...data.projects, newItem],
    });
    setOpenSections((prev) => ({ ...prev, projects: true }));
  };

  const updateProject = (id: string, field: keyof ProjectItem, val: string) => {
    onChange({
      ...data,
      projects: data.projects.map((p) => (p.id === id ? { ...p, [field]: val } : p)),
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    });
  };

  // Word count helper for summary
  const summaryWordCount = data.summary.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-4 pb-12">
      {/* 1. DADOS PESSOAIS */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('personal')}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-slate-50/70 hover:bg-slate-100/70 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Cabeçalho & Contato</h2>
              <p className="text-xs text-slate-500">Nome, cargo pretendido e canais de contato</p>
            </div>
          </div>
          {openSections.personal ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {openSections.personal && (
          <div className="p-5 space-y-4 border-t border-slate-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={data.personalInfo.fullName}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  placeholder="Ex: Carlos Eduardo Silveira"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Cargo Pretendido / Título Alvo *
                </label>
                <input
                  type="text"
                  value={data.personalInfo.targetRole}
                  onChange={(e) => updatePersonalInfo('targetRole', e.target.value)}
                  placeholder="Ex: Desenvolvedor Frontend Sênior | React"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  💡 Use o título exato da vaga para maximizar o score ATS.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  E-mail Profissional *
                </label>
                <input
                  type="email"
                  value={data.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="carlos.silveira@email.com"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Telefone / WhatsApp *
                </label>
                <input
                  type="text"
                  value={data.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="(11) 98765-4321"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Cidade / Estado *
                </label>
                <input
                  type="text"
                  value={data.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  placeholder="São Paulo, SP (Remoto)"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Perfil LinkedIn
                </label>
                <input
                  type="text"
                  value={data.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/seuperfil"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  GitHub
                </label>
                <input
                  type="text"
                  value={data.personalInfo.github}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  placeholder="github.com/seuperfil"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Portfólio / Site
                </label>
                <input
                  type="text"
                  value={data.personalInfo.portfolio}
                  onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                  placeholder="seusite.dev"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. RESUMO PROFISSIONAL */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => toggleSection('summary')}
          className="w-full px-5 py-4 flex items-center justify-between text-left bg-slate-50/70 hover:bg-slate-100/70 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Resumo Profissional</h2>
              <p className="text-xs text-slate-500">Síntese de impacto para capturar a atenção em 6 segundos</p>
            </div>
          </div>
          {openSections.summary ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {openSections.summary && (
          <div className="p-5 space-y-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Extensão recomendada: <strong>40 a 140 palavras</strong> ({summaryWordCount} palavras atuais)
              </span>
              <button
                type="button"
                onClick={onOpenVerbsModal}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Verbos de Ação
              </button>
            </div>

            <textarea
              rows={4}
              value={data.summary}
              onChange={(e) => updateSummary(e.target.value)}
              placeholder="Profissional com mais de X anos de experiência em... Especialista em... Histórico comprovado de... Focado em..."
              className="w-full p-3.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white leading-relaxed"
            />
            <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl text-xs text-slate-600">
              <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span>
                <strong>Dica ATS:</strong> Mencione seus anos de carreira, especialidades-chave e um grande resultado mensurável já no primeiro parágrafo.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3. EXPERIÊNCIA PROFISSIONAL */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 flex items-center justify-between bg-slate-50/70 border-b border-slate-100">
          <button
            type="button"
            onClick={() => toggleSection('experience')}
            className="flex items-center gap-3 text-left flex-1"
          >
            <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Experiências Profissionais ({data.experiences.length})
              </h2>
              <p className="text-xs text-slate-500">Tópicos orientados a resultados e verbos de ação</p>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={addExperience}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Adicionar Cargo
            </button>
          </div>
        </div>

        {openSections.experience && (
          <div className="p-5 space-y-6">
            {data.experiences.length === 0 ? (
              <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
                <p className="text-sm text-slate-500">Nenhuma experiência cadastrada.</p>
                <button
                  type="button"
                  onClick={addExperience}
                  className="mt-2 text-xs text-purple-600 font-semibold hover:underline"
                >
                  Clique para adicionar sua primeira experiência
                </button>
              </div>
            ) : (
              data.experiences.map((exp, idx) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-4 relative group"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Cargo #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remover Cargo
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Cargo / Título *
                      </label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                        placeholder="Ex: Engenheiro de Software Pleno"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nome da Empresa *
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        placeholder="Ex: Nubank / Mercado Livre"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Localização
                      </label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                        placeholder="São Paulo, SP (Remoto)"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Data de Início *
                      </label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        placeholder="Ex: Jan 2021"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          Data de Término
                        </label>
                        <label className="text-[11px] text-slate-600 flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                            className="rounded border-slate-300 text-purple-600"
                          />
                          Trabalho Atual
                        </label>
                      </div>
                      <input
                        type="text"
                        disabled={exp.current}
                        value={exp.current ? 'Presente' : exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        placeholder="Ex: Dez 2023"
                        className={`w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 ${
                          exp.current ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="space-y-2 pt-2 border-t border-slate-200/60">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Realizações & Responsabilidades (Tópicos ATS)
                      </label>
                      <button
                        type="button"
                        onClick={onOpenVerbsModal}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Verbos Recomendados
                      </button>
                    </div>

                    <div className="space-y-2">
                      {exp.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2">
                          <span className="text-slate-400 mt-2 text-xs font-mono">•</span>
                          <textarea
                            rows={2}
                            value={bullet}
                            onChange={(e) => updateExperienceBullet(exp.id, bIdx, e.target.value)}
                            placeholder="Inicie com verbo de ação. Ex: 'Otimizou o pipeline de dados, reduzindo o tempo de processamento em 40%...'"
                            className="flex-1 p-2.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                          />
                          <button
                            type="button"
                            onClick={() => removeExperienceBullet(exp.id, bIdx)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 mt-1"
                            title="Remover tópico"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => addExperienceBullet(exp.id)}
                      className="text-xs text-purple-700 hover:text-purple-900 font-semibold flex items-center gap-1 mt-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Adicionar Tópico Realização
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 4. FORMAÇÃO ACADÊMICA */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 flex items-center justify-between bg-slate-50/70 border-b border-slate-100">
          <button
            type="button"
            onClick={() => toggleSection('education')}
            className="flex items-center gap-3 text-left flex-1"
          >
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Formação Acadêmica ({data.education.length})
              </h2>
              <p className="text-xs text-slate-500">Graduação, pós-graduação e certificações acadêmicas</p>
            </div>
          </button>
          <button
            type="button"
            onClick={addEducation}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar Formação
          </button>
        </div>

        {openSections.education && (
          <div className="p-5 space-y-4">
            {data.education.length === 0 ? (
              <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
                <p className="text-sm text-slate-500">Nenhuma formação cadastrada.</p>
                <button
                  type="button"
                  onClick={addEducation}
                  className="mt-2 text-xs text-amber-600 font-semibold hover:underline"
                >
                  Adicionar graduação ou curso
                </button>
              </div>
            ) : (
              data.education.map((edu, idx) => (
                <div
                  key={edu.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Formação #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeEducation(edu.id)}
                      className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remover
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Grau / Tipo
                      </label>
                      <select
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white"
                      >
                        <option value="Bacharelado">Bacharelado</option>
                        <option value="Licenciatura">Licenciatura</option>
                        <option value="Tecnólogo">Tecnólogo</option>
                        <option value="Pós-Graduação">Pós-Graduação</option>
                        <option value="Mestrado">Mestrado</option>
                        <option value="Doutorado">Doutorado</option>
                        <option value="MBA">MBA</option>
                        <option value="Ensino Médio">Ensino Médio</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Nome do Curso *
                      </label>
                      <input
                        type="text"
                        value={edu.fieldOfStudy}
                        onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                        placeholder="Ex: Engenharia de Software ou Administração"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Instituição de Ensino *
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        placeholder="Ex: Universidade de São Paulo (USP)"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Status
                      </label>
                      <select
                        value={edu.status}
                        onChange={(e) => updateEducation(edu.id, 'status', e.target.value as any)}
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white"
                      >
                        <option value="Concluído">Concluído</option>
                        <option value="Em andamento">Em andamento</option>
                        <option value="Interrompido">Interrompido</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Ano de Início
                      </label>
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                        placeholder="2018"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Ano de Conclusão / Previsão
                      </label>
                      <input
                        type="text"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                        placeholder="2022"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 5. HABILIDADES TÉCNICAS (HARD SKILLS) */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 flex items-center justify-between bg-slate-50/70 border-b border-slate-100">
          <button
            type="button"
            onClick={() => toggleSection('skills')}
            className="flex items-center gap-3 text-left flex-1"
          >
            <div className="p-2 bg-cyan-100 text-cyan-700 rounded-xl">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Habilidades Técnicas / Hard Skills ({data.skills.length})
              </h2>
              <p className="text-xs text-slate-500">Categorizadas em texto puro (o formato preferido dos robôs)</p>
            </div>
          </button>
          <button
            type="button"
            onClick={addSkillCategory}
            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar Categoria
          </button>
        </div>

        {openSections.skills && (
          <div className="p-5 space-y-4">
            <div className="p-3 bg-cyan-50/70 rounded-xl text-xs text-cyan-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
              <span>
                <strong>Regra de Ouro ATS:</strong> Nunca use gráficos de barras (ex: &ldquo;Python 85%&rdquo;). Sistemas ATS não conseguem interpretar porcentagens subjetivas. Agrupe por categorias de texto separadas por vírgula.
              </span>
            </div>

            {data.skills.map((skill) => (
              <div
                key={skill.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkillCategory(skill.id, 'name', e.target.value)}
                    placeholder="Ex: Linguagens de Programação"
                    className="text-xs font-bold text-slate-800 bg-transparent border-b border-dashed border-slate-300 pb-0.5 focus:border-cyan-600 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => removeSkillCategory(skill.id)}
                    className="text-xs text-rose-600 hover:text-rose-800"
                    title="Remover categoria"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={skill.skills}
                  onChange={(e) => updateSkillCategory(skill.id, 'skills', e.target.value)}
                  placeholder="Ex: JavaScript, TypeScript, Python, SQL, Go"
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-200 bg-white"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. IDIOMAS */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 flex items-center justify-between bg-slate-50/70 border-b border-slate-100">
          <button
            type="button"
            onClick={() => toggleSection('languages')}
            className="flex items-center gap-3 text-left flex-1"
          >
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Idiomas ({data.languages.length})</h2>
              <p className="text-xs text-slate-500">Nível de fluência e proficiência</p>
            </div>
          </button>
          <button
            type="button"
            onClick={addLanguage}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar Idioma
          </button>
        </div>

        {openSections.languages && (
          <div className="p-5 space-y-3">
            {data.languages.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-3">Nenhum idioma adicionado.</p>
            ) : (
              data.languages.map((lang) => (
                <div key={lang.id} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={lang.language}
                    onChange={(e) => updateLanguage(lang.id, 'language', e.target.value)}
                    placeholder="Ex: Inglês"
                    className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white"
                  />
                  <select
                    value={lang.proficiency}
                    onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value as any)}
                    className="w-40 px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="Nativo">Nativo</option>
                    <option value="Fluente">Fluente</option>
                    <option value="Avançado">Avançado</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Básico">Básico</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeLanguage(lang.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 7. CERTIFICAÇÕES & CURSOS */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 flex items-center justify-between bg-slate-50/70 border-b border-slate-100">
          <button
            type="button"
            onClick={() => toggleSection('certifications')}
            className="flex items-center gap-3 text-left flex-1"
          >
            <div className="p-2 bg-rose-100 text-rose-700 rounded-xl">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Certificações & Cursos ({data.certifications.length})
              </h2>
              <p className="text-xs text-slate-500">Credenciais oficiais reconhecidas pelo mercado</p>
            </div>
          </button>
          <button
            type="button"
            onClick={addCertification}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar Certificação
          </button>
        </div>

        {openSections.certifications && (
          <div className="p-5 space-y-3">
            {data.certifications.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-3">Nenhuma certificação adicionada.</p>
            ) : (
              data.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Credencial</span>
                    <button
                      type="button"
                      onClick={() => removeCertification(cert.id)}
                      className="text-xs text-rose-600 hover:text-rose-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                      placeholder="Nome da Certificação (ex: AWS Cloud Practitioner)"
                      className="md:col-span-2 px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                    <input
                      type="text"
                      value={cert.year}
                      onChange={(e) => updateCertification(cert.id, 'year', e.target.value)}
                      placeholder="Ano (2023)"
                      className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                    placeholder="Instituição Emissora (ex: Amazon Web Services)"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* 8. PROJETOS RELEVANTES */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-4 flex items-center justify-between bg-slate-50/70 border-b border-slate-100">
          <button
            type="button"
            onClick={() => toggleSection('projects')}
            className="flex items-center gap-3 text-left flex-1"
          >
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Projetos & Iniciativas Relevantes ({data.projects.length})
              </h2>
              <p className="text-xs text-slate-500">Projetos open source, publicações ou cases de destaque</p>
            </div>
          </button>
          <button
            type="button"
            onClick={addProject}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar Projeto
          </button>
        </div>

        {openSections.projects && (
          <div className="p-5 space-y-4">
            {data.projects.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-3">Nenhum projeto adicionado.</p>
            ) : (
              data.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Projeto</span>
                    <button
                      type="button"
                      onClick={() => removeProject(proj.id)}
                      className="text-xs text-rose-600 hover:text-rose-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                      placeholder="Título do Projeto"
                      className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                    <input
                      type="text"
                      value={proj.role || ''}
                      onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                      placeholder="Seu Papel (ex: Criador & Mantenedor)"
                      className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={proj.technologies || ''}
                      onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                      placeholder="Tecnologias Utilizadas"
                      className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                    <input
                      type="text"
                      value={proj.link || ''}
                      onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                      placeholder="Link do Projeto / Repositório"
                      className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                    placeholder="Breve descrição dos resultados alcançados..."
                    className="w-full p-2.5 text-xs rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
