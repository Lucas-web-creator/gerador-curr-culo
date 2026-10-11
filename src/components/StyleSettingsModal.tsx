import React from 'react';
import { ResumeStyleConfig } from '../types/resume';
import { Sliders, X, Check } from 'lucide-react';

interface StyleSettingsModalProps {
  styles: ResumeStyleConfig;
  isOpen: boolean;
  onClose: () => void;
  onChange: (newStyles: ResumeStyleConfig) => void;
}

export const StyleSettingsModal: React.FC<StyleSettingsModalProps> = ({
  styles,
  isOpen,
  onClose,
  onChange,
}) => {
  if (!isOpen) return null;

  const fontOptions: { value: ResumeStyleConfig['fontFamily']; label: string; sample: string }[] = [
    { value: 'Calibri', label: 'Calibri', sample: 'Padrão moderno, limpo e altamente recomendado para ATS' },
    { value: 'Arial', label: 'Arial', sample: 'Sem serifa clássica, universalmente reconhecida por qualquer OCR' },
    { value: 'Helvetica', label: 'Helvetica', sample: 'Clareza neutra, proporções harmônicas e leitura fluida' },
    { value: 'Georgia', label: 'Georgia', sample: 'Com serifa elegante, ótima legibilidade em telas e impressão' },
    { value: 'Times New Roman', label: 'Times New Roman', sample: 'Tradicional corporativo e acadêmico de alta densidade' },
    { value: 'Garamond', label: 'Garamond', sample: 'Serifada clássica refinada e compacta' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Formatação & Tipografia ATS</h2>
              <p className="text-xs text-slate-500">Ajustes estéticos 100% seguros para robôs de recrutamento</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Tipografia */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Família Tipográfica Web-Safe
            </label>
            <div className="grid grid-cols-1 gap-2">
              {fontOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onChange({ ...styles, fontFamily: opt.value })}
                  className={`flex items-start justify-between p-3 rounded-xl border text-left transition-all ${
                    styles.fontFamily === opt.value
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="text-sm font-bold text-slate-900">{opt.label}</span>
                    <p className="text-xs text-slate-500 mt-0.5">{opt.sample}</p>
                  </div>
                  {styles.fontFamily === opt.value && (
                    <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tamanho da Fonte */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Tamanho do Texto (Densidade)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'compact', label: 'Compacto (10pt)', desc: 'Para caber em 1 pág.' },
                { value: 'normal', label: 'Padrão (10.5pt)', desc: 'Equilíbrio ideal' },
                { value: 'spacious', label: 'Confortável (11.5pt)', desc: 'Mais arejado' },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => onChange({ ...styles, fontSize: item.value as any })}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    styles.fontSize === item.value
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-semibold">{item.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Margens da Página */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Margens da Folha A4
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'compact', label: 'Compactas (15mm)' },
                { value: 'normal', label: 'Padrão (20mm)' },
                { value: 'spacious', label: 'Amplas (25mm)' },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => onChange({ ...styles, pageMargins: item.value as any })}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    styles.pageMargins === item.value
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-semibold">{item.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Alinhamento do Cabeçalho */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Alinhamento do Cabeçalho
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'center', label: 'Centralizado (Clássico)' },
                { value: 'left', label: 'À Esquerda (Moderno)' },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => onChange({ ...styles, headerAlign: item.value as any })}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    styles.headerAlign === item.value
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-semibold">{item.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Divisória de Seções */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Separadores de Seção
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'line', label: 'Linha Fina (Padrão ATS)' },
                { value: 'bold-line', label: 'Linha Marcada' },
                { value: 'underline', label: 'Sublinhado' },
                { value: 'minimal', label: 'Minimalista (Sem Linha)' },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => onChange({ ...styles, sectionDivider: item.value as any })}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    styles.sectionDivider === item.value
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-semibold">{item.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Aplicar e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
