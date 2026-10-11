/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ResumeData } from './types/resume';
import { mockTechResume, mockBusinessResume, emptyResumeData } from './data/mockResumes';
import { evaluateResumeForAts } from './utils/atsChecker';
import { printResume, downloadPdfWithHtml2Pdf } from './utils/pdfExport';
import { ResumePreview } from './components/ResumePreview';
import { ResumeForm } from './components/ResumeForm';
import { AtsScoreModal } from './components/AtsScoreModal';
import { ActionVerbsModal } from './components/ActionVerbsModal';
import { StyleSettingsModal } from './components/StyleSettingsModal';
import {
  FileText,
  Printer,
  Download,
  Upload,
  FileJson,
  Sparkles,
  Sliders,
  ShieldCheck,
  RotateCcw,
  Eye,
  Edit3,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Check,
  AlertTriangle,
} from 'lucide-react';

const STORAGE_KEY = 'ats_friendly_resume_data_v1';

export default function App() {
  // Resume Data State with LocalStorage persistence
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Erro ao carregar dados locais:', e);
    }
    return mockTechResume;
  });

  // UI States
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form'); // For mobile
  const [previewScale, setPreviewScale] = useState<number>(1);
  const [showPageMarker, setShowPageMarker] = useState<boolean>(true);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [isAtsModalOpen, setIsAtsModalOpen] = useState<boolean>(false);
  const [isVerbsModalOpen, setIsVerbsModalOpen] = useState<boolean>(false);
  const [isStylesModalOpen, setIsStylesModalOpen] = useState<boolean>(false);

  // File Input Ref for JSON Import
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    } catch (e) {
      console.warn('Erro ao salvar no localStorage:', e);
    }
  }, [resumeData]);

  // ATS Evaluation computation
  const atsEvaluation = evaluateResumeForAts(resumeData);

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Mock preset loaders
  const loadMockData = (type: 'tech' | 'business') => {
    if (window.confirm('Deseja carregar o modelo de exemplo? Dados não salvos serão substituídos.')) {
      if (type === 'tech') {
        setResumeData(mockTechResume);
      } else {
        setResumeData(mockBusinessResume);
      }
      showToast('Dados de exemplo carregados com sucesso!');
    }
  };

  const handleClear = () => {
    if (window.confirm('Tem certeza de que deseja limpar todos os campos do formulário?')) {
      setResumeData({
        ...emptyResumeData,
        styles: resumeData.styles,
      });
      showToast('Formulário limpo.');
    }
  };

  // JSON Export
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    const safeName = (resumeData.personalInfo.fullName || 'curriculo')
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/gi, '');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${safeName}_backup_ats.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Backup JSON exportado!');
  };

  // JSON Import
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.personalInfo && Array.isArray(parsed.experiences)) {
          setResumeData(parsed);
          showToast('Currículo importado com sucesso!');
        } else {
          alert('Arquivo JSON inválido ou incompatível com o formato de currículo.');
        }
      } catch (err) {
        alert('Erro ao processar arquivo JSON.');
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  // Direct PDF Download
  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    showToast('Gerando documento PDF...');
    const safeName = (resumeData.personalInfo.fullName || 'Curriculo_ATS')
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_]/g, '');
    const filename = `Curriculo_${safeName}_ATS.pdf`;

    try {
      await downloadPdfWithHtml2Pdf('resume-preview-document', filename);
      showToast('PDF gerado com sucesso!');
    } catch (e) {
      console.error(e);
      showToast('Falha no download direto. Abrindo diálogo de impressão.');
      printResume();
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Browser Print (100% Vector Crisp Output)
  const handlePrint = () => {
    printResume();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 font-sans">
      {/* Hidden File Input for JSON restore */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportJson}
        accept=".json"
        className="hidden"
      />

      {/* GLOBAL TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-2 fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP NAVBAR (Hidden during printing via @media print) */}
      <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-extrabold text-slate-900 tracking-tight">
                  ATS Resume Builder
                </h1>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  100% ATS Ready
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                Otimizado para aprovação em triagens do Taleo, Workday, Gupy & Greenhouse
              </p>
            </div>
          </div>

          {/* Quick Actions & Modals */}
          <div className="flex items-center gap-2">
            {/* ATS Score Indicator Button */}
            <button
              onClick={() => setIsAtsModalOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                atsEvaluation.score >= 85
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : atsEvaluation.score >= 70
                  ? 'bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100'
                  : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
              }`}
              title="Ver Diagnóstico de Compatibilidade ATS"
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Score ATS: {atsEvaluation.score}/100</span>
            </button>

            {/* Typography / Styles Settings */}
            <button
              onClick={() => setIsStylesModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
              title="Ajustar Tipografia e Margens"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span>Formatação</span>
            </button>

            {/* Action Verbs Library */}
            <button
              onClick={() => setIsVerbsModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
              title="Banco de Verbos de Impacto"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Verbos de Ação</span>
            </button>

            {/* Mock Data Dropdown / Button */}
            <div className="relative group hidden md:block">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors">
                <span>Modelos Exemplo</span>
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 hidden group-hover:block hover:block z-50">
                <button
                  onClick={() => loadMockData('tech')}
                  className="w-full px-3 py-1.5 text-left text-xs hover:bg-slate-100 text-slate-700 block"
                >
                  Exemplo Tech (Eng. Software)
                </button>
                <button
                  onClick={() => loadMockData('business')}
                  className="w-full px-3 py-1.5 text-left text-xs hover:bg-slate-100 text-slate-700 block"
                >
                  Exemplo Negócios (Product Mgr)
                </button>
                <div className="border-t border-slate-100 my-1" />
                <button
                  onClick={handleClear}
                  className="w-full px-3 py-1.5 text-left text-xs hover:bg-rose-50 text-rose-600 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  Limpar Formulário
                </button>
              </div>
            </div>

            {/* JSON Tools */}
            <div className="relative group hidden sm:block">
              <button
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                title="Backup e Restauração JSON"
              >
                <FileJson className="w-4 h-4" />
              </button>
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 hidden group-hover:block hover:block z-50">
                <button
                  onClick={handleExportJson}
                  className="w-full px-3 py-1.5 text-left text-xs hover:bg-slate-100 text-slate-700 flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  Salvar Backup (JSON)
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-3 py-1.5 text-left text-xs hover:bg-slate-100 text-slate-700 flex items-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Carregar Backup (JSON)
                </button>
              </div>
            </div>

            {/* PRIMARY PRINT & PDF BUTTONS */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95"
              title="Imprimir ou Salvar em PDF com qualidade vetorial nativa"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir / Salvar PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs (Toggle Between Edit & Preview) */}
        <div className="lg:hidden flex border-t border-slate-200 bg-slate-50 px-4 py-2 gap-2">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'form' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            Editar Dados
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Visualizar Folha A4
          </button>
        </div>
      </header>

      {/* MAIN APPLICATION CONTAINER (SPLIT SCREEN) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: EDIT FORM */}
        <div
          className={`lg:col-span-6 xl:col-span-6 no-print ${
            activeTab === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Quick Header Helper Banner */}
          <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-2xl flex items-start gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-xl shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs text-blue-900">
              <p className="font-bold">Currículo Otimizado para ATS</p>
              <p className="mt-0.5 text-blue-800 leading-relaxed">
                Preencha as seções abaixo. O gerador aplica automaticamente estrutura em coluna única,
                semântica canônica (h1/h2/h3/p/ul) e fontes seguras para garantir que nenhum robô de triagem descarte seu perfil.
              </p>
            </div>
          </div>

          {/* Dynamic Form Component */}
          <ResumeForm
            data={resumeData}
            onChange={setResumeData}
            onOpenVerbsModal={() => setIsVerbsModalOpen(true)}
          />
        </div>

        {/* RIGHT COLUMN: LIVE ATS PREVIEW */}
        <div
          className={`lg:col-span-6 xl:col-span-6 sticky top-20 flex flex-col items-center ${
            activeTab === 'form' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Live Preview Controls Toolbar (Hidden in print) */}
          <div className="no-print w-full flex items-center justify-between mb-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Eye className="w-4 h-4 text-slate-500" />
              <span className="font-semibold text-slate-800">Pré-visualização A4</span>
              <span className="text-slate-400">|</span>
              <span className="text-[11px] text-slate-500">Fonte: {resumeData.styles.fontFamily}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Page guide toggle */}
              <button
                onClick={() => setShowPageMarker(!showPageMarker)}
                className={`text-[11px] px-2 py-1 rounded-lg border transition-colors ${
                  showPageMarker
                    ? 'bg-red-50 text-red-700 border-red-200 font-medium'
                    : 'bg-slate-50 text-slate-500 border-slate-200'
                }`}
                title="Mostrar limite aproximado da 1ª página A4"
              >
                Guia de Página
              </button>

              {/* Zoom Controls */}
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                <button
                  onClick={() => setPreviewScale((prev) => Math.max(0.6, prev - 0.1))}
                  className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                  title="Diminuir Zoom"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 text-[10px] font-bold text-slate-700 select-none">
                  {Math.round(previewScale * 100)}%
                </span>
                <button
                  onClick={() => setPreviewScale((prev) => Math.min(1.2, prev + 0.1))}
                  className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                  title="Aumentar Zoom"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Direct PDF Download button */}
              <button
                onClick={handleDownloadPdf}
                disabled={isExportingPdf}
                className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                title="Download direto em formato PDF"
              >
                <Download className="w-3 h-3" />
                <span>.PDF</span>
              </button>
            </div>
          </div>

          {/* Live Document Preview Scroll Area */}
          <div className="w-full bg-slate-200/80 rounded-2xl p-4 sm:p-6 overflow-x-auto flex justify-center border border-slate-300/80 shadow-inner max-h-[calc(100vh-140px)] overflow-y-auto">
            <ResumePreview
              data={resumeData}
              scale={previewScale}
              showPageBreakGuide={showPageMarker}
            />
          </div>

          {/* Quick Footer Notice */}
          <div className="no-print mt-2 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
            <span>💡 Para a máxima nitidez e padrão vetorial (100% OCR), use o botão</span>
            <strong className="text-slate-800">Imprimir / Salvar PDF</strong>
            <span>e selecione &ldquo;Salvar como PDF&rdquo;.</span>
          </div>
        </div>
      </main>

      {/* INTERACTIVE MODALS */}
      <AtsScoreModal
        evaluation={atsEvaluation}
        isOpen={isAtsModalOpen}
        onClose={() => setIsAtsModalOpen(false)}
        onOpenVerbs={() => setIsVerbsModalOpen(true)}
      />

      <ActionVerbsModal
        isOpen={isVerbsModalOpen}
        onClose={() => setIsVerbsModalOpen(false)}
      />

      <StyleSettingsModal
        styles={resumeData.styles}
        isOpen={isStylesModalOpen}
        onClose={() => setIsStylesModalOpen(false)}
        onChange={(newStyles) => setResumeData({ ...resumeData, styles: newStyles })}
      />
    </div>
  );
}
