export interface PersonalInfo {
  fullName: string;
  targetRole: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  github: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  status: 'Concluído' | 'Em andamento' | 'Interrompido';
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string; // Comma-separated or simple text like "React, TypeScript, Next.js"
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Nativo' | 'Fluente' | 'Avançado' | 'Intermediário' | 'Básico';
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  role?: string;
  technologies?: string;
  link?: string;
  description: string;
}

export interface ResumeStyleConfig {
  fontFamily: 'Calibri' | 'Arial' | 'Helvetica' | 'Georgia' | 'Times New Roman' | 'Garamond';
  fontSize: 'compact' | 'normal' | 'spacious'; // 10pt, 10.5pt, 11.5pt
  lineSpacing: 'compact' | 'normal' | 'relaxed';
  pageMargins: 'compact' | 'normal' | 'spacious'; // 15mm, 20mm, 25mm
  sectionDivider: 'line' | 'underline' | 'minimal' | 'bold-line';
  headerAlign: 'left' | 'center';
  paperSize: 'a4' | 'letter';
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  styles: ResumeStyleConfig;
}
