import React, { useState } from 'react';
import { ACTION_VERBS_CATEGORIES } from '../utils/atsChecker';
import { Sparkles, Copy, Check, X } from 'lucide-react';

interface ActionVerbsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVerb?: (verb: string) => void;
}

export const ActionVerbsModal: React.FC<ActionVerbsModalProps> = ({
  isOpen,
  onClose,
  onSelectVerb,
}) => {
  const [copiedVerb, setCopiedVerb] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (verb: string) => {
    navigator.clipboard.writeText(verb);
    setCopiedVerb(verb);
    setTimeout(() => setCopiedVerb(null), 1500);
    if (onSelectVerb) {
      onSelectVerb(verb);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Banco de Verbos de Ação ATS</h2>
              <p className="text-xs text-slate-500">
                Inicie seus tópicos de experiência profissional com verbos de impacto no pretérito perfeito
              </p>
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
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
            <strong>Dica de Recrutador:</strong> A fórmula padrão de ouro para bullet points no ATS é:{' '}
            <span className="font-semibold underline">
              [Verbo de Ação] + [Tarefa / O que foi feito] + [Impacto / Métrica Mensurável]
            </span>
            .<br />
            <em>Exemplo: &ldquo;Otimizou a arquitetura do banco de dados, reduzindo o tempo de consulta em 35%.&rdquo;</em>
          </div>

          <div className="space-y-5">
            {ACTION_VERBS_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.verbs.map((verb) => (
                    <button
                      key={verb}
                      onClick={() => handleCopy(verb)}
                      className="group flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-800 transition-all active:scale-95"
                      title="Clique para copiar"
                    >
                      <span>{verb}</span>
                      {copiedVerb === verb ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <span className="text-xs text-slate-500">
            {copiedVerb ? `Copiado: "${copiedVerb}"!` : 'Clique em qualquer verbo para copiar.'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
