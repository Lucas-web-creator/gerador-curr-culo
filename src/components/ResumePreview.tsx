import React from 'react';
import { ResumeData } from '../types/resume';

interface ResumePreviewProps {
  data: ResumeData;
  scale?: number;
  showPageBreakGuide?: boolean;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  scale = 1,
  showPageBreakGuide = true,
}) => {
  const {
    personalInfo,
    summary,
    experiences,
    education,
    skills,
    languages,
    certifications,
    projects,
    styles,
  } = data;

  // Font family mapping to CSS classes
  const fontClass = {
    Calibri: 'font-calibri',
    Arial: 'font-arial',
    Helvetica: 'font-helvetica',
    Georgia: 'font-georgia',
    'Times New Roman': 'font-times',
    Garamond: 'font-garamond',
  }[styles.fontFamily] || 'font-calibri';

  // Font size configuration (in standard points/rem for ATS)
  const sizeConfig = {
    compact: {
      name: 'text-[20pt] leading-[22pt]',
      role: 'text-[11pt] leading-[14pt]',
      sectionHeader: 'text-[11.5pt] leading-[15pt]',
      itemTitle: 'text-[10pt] leading-[13pt]',
      body: 'text-[9.5pt] leading-[13pt]',
      meta: 'text-[9pt] leading-[12pt]',
      sectionSpacing: 'mb-3.5',
      itemSpacing: 'mb-2.5',
      bulletSpacing: 'space-y-0.5',
    },
    normal: {
      name: 'text-[22pt] leading-[24pt]',
      role: 'text-[12pt] leading-[15pt]',
      sectionHeader: 'text-[12pt] leading-[16pt]',
      itemTitle: 'text-[10.5pt] leading-[14pt]',
      body: 'text-[10pt] leading-[14pt]',
      meta: 'text-[9.5pt] leading-[13pt]',
      sectionSpacing: 'mb-4',
      itemSpacing: 'mb-3',
      bulletSpacing: 'space-y-1',
    },
    spacious: {
      name: 'text-[24pt] leading-[26pt]',
      role: 'text-[13pt] leading-[16pt]',
      sectionHeader: 'text-[13pt] leading-[17pt]',
      itemTitle: 'text-[11.5pt] leading-[15pt]',
      body: 'text-[11pt] leading-[15pt]',
      meta: 'text-[10pt] leading-[14pt]',
      sectionSpacing: 'mb-5',
      itemSpacing: 'mb-3.5',
      bulletSpacing: 'space-y-1.5',
    },
  }[styles.fontSize] || sizeConfigNormalFallback();

  function sizeConfigNormalFallback() {
    return {
      name: 'text-[22pt] leading-[24pt]',
      role: 'text-[12pt] leading-[15pt]',
      sectionHeader: 'text-[12pt] leading-[16pt]',
      itemTitle: 'text-[10.5pt] leading-[14pt]',
      body: 'text-[10pt] leading-[14pt]',
      meta: 'text-[9.5pt] leading-[13pt]',
      sectionSpacing: 'mb-4',
      itemSpacing: 'mb-3',
      bulletSpacing: 'space-y-1',
    };
  }

  // Margin configuration (in millimeters for exact standard A4 output)
  const marginPadding = {
    compact: 'p-[15mm]',
    normal: 'p-[20mm]',
    spacious: 'p-[25mm]',
  }[styles.pageMargins] || 'p-[20mm]';

  // Section Header Divider style
  const getDividerClass = () => {
    switch (styles.sectionDivider) {
      case 'bold-line':
        return 'border-b-2 border-black pb-0.5';
      case 'line':
        return 'border-b border-black pb-0.5';
      case 'underline':
        return 'underline underline-offset-4';
      case 'minimal':
        return '';
      default:
        return 'border-b border-black pb-0.5';
    }
  };

  // Header Alignment
  const headerAlignClass = styles.headerAlign === 'center' ? 'text-center' : 'text-left';

  // Build clean contacts array
  const contacts: { label: string; url?: string }[] = [];
  if (personalInfo.location) contacts.push({ label: personalInfo.location });
  if (personalInfo.phone) contacts.push({ label: personalInfo.phone });
  if (personalInfo.email) {
    contacts.push({
      label: personalInfo.email,
      url: `mailto:${personalInfo.email}`,
    });
  }
  if (personalInfo.linkedin) {
    const cleanLinkedin = personalInfo.linkedin.replace(/^https?:\/\//i, '');
    contacts.push({
      label: cleanLinkedin,
      url: personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`,
    });
  }
  if (personalInfo.github) {
    const cleanGithub = personalInfo.github.replace(/^https?:\/\//i, '');
    contacts.push({
      label: cleanGithub,
      url: personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`,
    });
  }
  if (personalInfo.portfolio) {
    const cleanPortfolio = personalInfo.portfolio.replace(/^https?:\/\//i, '');
    contacts.push({
      label: cleanPortfolio,
      url: personalInfo.portfolio.startsWith('http') ? personalInfo.portfolio : `https://${personalInfo.portfolio}`,
    });
  }

  return (
    <div className="w-full flex justify-center overflow-auto py-4">
      {/* Printable Sheet Container */}
      <div
        id="resume-preview-document"
        className={`resume-sheet ${fontClass} ${marginPadding} shadow-md print:shadow-none border border-slate-200 print:border-none`}
        style={{
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'top center',
        }}
      >
        {/* Estimated A4 Page 1 boundary line (approx 297mm height from top) */}
        {showPageBreakGuide && (
          <div
            className="page-guide-line absolute left-0 right-0 pointer-events-none print:hidden border-b-2 border-dashed border-red-300 text-[10px] text-red-500 font-sans px-2 flex justify-end items-end z-10"
            style={{ top: '297mm' }}
            title="Linha aproximada de limite da Página 1 (A4)"
          >
            <span className="bg-red-50 px-1 py-0.5 rounded text-[10px] uppercase font-semibold">
              Fim estimado da Página 1
            </span>
          </div>
        )}

        {/* 1. CABEÇALHO (ATS HEADER) */}
        <header className={`ats-header ${headerAlignClass} ${sizeConfig.sectionSpacing}`}>
          <h1 className={`${sizeConfig.name} font-bold text-black uppercase tracking-tight`}>
            {personalInfo.fullName || 'NOME COMPLETO'}
          </h1>

          {personalInfo.targetRole && (
            <p className={`${sizeConfig.role} font-semibold text-neutral-800 mt-1`}>
              {personalInfo.targetRole}
            </p>
          )}

          {contacts.length > 0 && (
            <div className={`mt-1.5 ${sizeConfig.meta} text-neutral-800 flex flex-wrap items-center justify-${styles.headerAlign === 'center' ? 'center' : 'start'} gap-x-2 gap-y-0.5`}>
              {contacts.map((contact, idx) => (
                <React.Fragment key={idx}>
                  {contact.url ? (
                    <a
                      href={contact.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-900 hover:underline decoration-neutral-500"
                    >
                      {contact.label}
                    </a>
                  ) : (
                    <span>{contact.label}</span>
                  )}
                  {idx < contacts.length - 1 && (
                    <span className="text-neutral-400 select-none" aria-hidden="true">
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </header>

        {/* 2. RESUMO PROFISSIONAL */}
        {summary.trim() && (
          <section className={`ats-section ${sizeConfig.sectionSpacing}`}>
            <h2 className={`ats-section-title ${sizeConfig.sectionHeader} font-bold text-black uppercase ${getDividerClass()} mb-1.5`}>
              Resumo Profissional
            </h2>
            <p className={`${sizeConfig.body} text-neutral-900 text-justify leading-relaxed`}>
              {summary}
            </p>
          </section>
        )}

        {/* 3. EXPERIÊNCIA PROFISSIONAL */}
        {experiences.length > 0 && (
          <section className={`ats-section ${sizeConfig.sectionSpacing}`}>
            <h2 className={`ats-section-title ${sizeConfig.sectionHeader} font-bold text-black uppercase ${getDividerClass()} mb-2`}>
              Experiência Profissional
            </h2>

            <div className="space-y-3">
              {experiences.map((exp) => (
                <article key={exp.id} className={`ats-item ats-avoid-break ${sizeConfig.itemSpacing}`}>
                  {/* Linha 1: Cargo e Datas */}
                  <div className="flex justify-between items-baseline flex-wrap gap-x-2">
                    <h3 className={`${sizeConfig.itemTitle} font-bold text-black`}>
                      {exp.role || 'Cargo'}
                    </h3>
                    <span className={`${sizeConfig.meta} text-neutral-700 font-medium whitespace-nowrap`}>
                      {exp.startDate} – {exp.current ? 'Presente' : exp.endDate || 'Presente'}
                    </span>
                  </div>

                  {/* Linha 2: Empresa e Localização */}
                  <div className="flex justify-between items-baseline flex-wrap gap-x-2 mb-1">
                    <span className={`${sizeConfig.body} font-semibold text-neutral-800`}>
                      {exp.company || 'Empresa'}
                    </span>
                    {exp.location && (
                      <span className={`${sizeConfig.meta} text-neutral-600 italic`}>
                        {exp.location}
                      </span>
                    )}
                  </div>

                  {/* Bullet points de realizações */}
                  {exp.bullets.length > 0 && (
                    <ul className={`list-disc list-outside pl-5 ${sizeConfig.body} text-neutral-900 ${sizeConfig.bulletSpacing}`}>
                      {exp.bullets.map((bullet, bIdx) =>
                        bullet.trim() ? (
                          <li key={bIdx} className="leading-snug">
                            {bullet}
                          </li>
                        ) : null
                      )}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* 4. FORMAÇÃO ACADÊMICA */}
        {education.length > 0 && (
          <section className={`ats-section ${sizeConfig.sectionSpacing}`}>
            <h2 className={`ats-section-title ${sizeConfig.sectionHeader} font-bold text-black uppercase ${getDividerClass()} mb-2`}>
              Formação Acadêmica
            </h2>

            <div className="space-y-2">
              {education.map((edu) => (
                <article key={edu.id} className="ats-item ats-avoid-break">
                  <div className="flex justify-between items-baseline flex-wrap gap-x-2">
                    <h3 className={`${sizeConfig.itemTitle} font-bold text-black`}>
                      {edu.degree} {edu.degree && edu.fieldOfStudy ? 'em' : ''} {edu.fieldOfStudy}
                    </h3>
                    <span className={`${sizeConfig.meta} text-neutral-700 font-medium whitespace-nowrap`}>
                      {edu.startDate} {edu.startDate && edu.endDate ? '–' : ''} {edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline flex-wrap gap-x-2">
                    <span className={`${sizeConfig.body} text-neutral-800 font-medium`}>
                      {edu.institution}
                    </span>
                    <span className={`${sizeConfig.meta} text-neutral-600 italic`}>
                      {edu.location ? `${edu.location} · ` : ''}{edu.status}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* 5. HABILIDADES TÉCNICAS (HARD SKILLS EM TEXTO PURO) */}
        {skills.length > 0 && (
          <section className={`ats-section ${sizeConfig.sectionSpacing}`}>
            <h2 className={`ats-section-title ${sizeConfig.sectionHeader} font-bold text-black uppercase ${getDividerClass()} mb-1.5`}>
              Habilidades Técnicas
            </h2>

            <div className={`space-y-1 ${sizeConfig.body} text-neutral-900`}>
              {skills.map((skill) => (
                <div key={skill.id} className="ats-item ats-avoid-break">
                  <span className="font-bold text-black">{skill.name}: </span>
                  <span className="text-neutral-800">{skill.skills}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. IDIOMAS */}
        {languages.length > 0 && (
          <section className={`ats-section ${sizeConfig.sectionSpacing}`}>
            <h2 className={`ats-section-title ${sizeConfig.sectionHeader} font-bold text-black uppercase ${getDividerClass()} mb-1.5`}>
              Idiomas
            </h2>

            <p className={`${sizeConfig.body} text-neutral-900`}>
              {languages.map((lang, lIdx) => (
                <span key={lang.id}>
                  <strong>{lang.language}:</strong> {lang.proficiency}
                  {lIdx < languages.length - 1 ? '  ·  ' : ''}
                </span>
              ))}
            </p>
          </section>
        )}

        {/* 7. CERTIFICAÇÕES & CURSOS COMPLEMENTARES */}
        {certifications.length > 0 && (
          <section className={`ats-section ${sizeConfig.sectionSpacing}`}>
            <h2 className={`ats-section-title ${sizeConfig.sectionHeader} font-bold text-black uppercase ${getDividerClass()} mb-1.5`}>
              Certificações & Cursos
            </h2>

            <ul className={`list-disc list-outside pl-5 ${sizeConfig.body} text-neutral-900 ${sizeConfig.bulletSpacing}`}>
              {certifications.map((cert) => (
                <li key={cert.id} className="ats-avoid-break">
                  <strong className="text-black">{cert.name}</strong> – {cert.issuer} ({cert.year})
                  {cert.credentialUrl && (
                    <span className="text-neutral-500 text-[9pt] ml-1.5">
                      [{cert.credentialUrl}]
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 8. PROJETOS RELEVANTES (OPCIONAL) */}
        {projects.length > 0 && (
          <section className={`ats-section ${sizeConfig.sectionSpacing}`}>
            <h2 className={`ats-section-title ${sizeConfig.sectionHeader} font-bold text-black uppercase ${getDividerClass()} mb-2`}>
              Projetos Relevantes
            </h2>

            <div className="space-y-2.5">
              {projects.map((proj) => (
                <article key={proj.id} className="ats-item ats-avoid-break">
                  <div className="flex justify-between items-baseline flex-wrap gap-x-2">
                    <h3 className={`${sizeConfig.itemTitle} font-bold text-black`}>
                      {proj.title}
                      {proj.role && <span className="font-normal text-neutral-700"> – {proj.role}</span>}
                    </h3>
                    {proj.link && (
                      <span className={`${sizeConfig.meta} text-neutral-600`}>
                        {proj.link}
                      </span>
                    )}
                  </div>
                  {proj.technologies && (
                    <p className={`${sizeConfig.meta} text-neutral-700 italic mb-0.5`}>
                      Tecnologias: {proj.technologies}
                    </p>
                  )}
                  {proj.description && (
                    <p className={`${sizeConfig.body} text-neutral-900 leading-snug`}>
                      {proj.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
