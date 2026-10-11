import React from 'react';
import { AtsEvaluation } from '../utils/atsChecker';
import { CheckCircle2, AlertCircle, XCircle, ShieldCheck, X } from 'lucide-react';

interface AtsScoreModalProps {
  evaluation: AtsEvaluation;
  isOpen: boolean;
  onClose: () => void;
  onOpenVerbs: () => void;
}

export const AtsScoreModal: React.FC<AtsScoreModalProps> = ({
  evaluation,
  isOpen,
  onClose,
  onOpenVerbs,
}) => {
  if (!isOpen) return null;

  const getScoreBadge = () => {
    if (evaluation.score >= 85) {
      return {
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        badge: 'bg-emerald-600 text-white',
        desc: 'Excelente compatibilidade com sistemas ATS de mercado (Gupy, Workday, Taleo, Greenhouse).',
      };
    }
    if (evaluation.score >= 70) {
      return {
        bg: 'bg-blue-50 text-blue-800 border-blue-200',
        badge: 'bg-blue-600 text-white',
        desc: 'Boa estrutura. Pequenos ajustes podem elevar ainda mais as taxas de leitura pelos robôs.',
      };
    }
    if (evaluation.score >= 50) {
      return {
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        badge: 'bg-amber-600 text-white',
        desc: 'Atenção: faltam seções essenciais ou dados que podem fazer o parser descartar seu currículo.',
      };
    }
    return {
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
      badge: 'bg-rose-600 text-white',
      desc: 'Crítico: adicione dados de contato, experiências estruturadas e habilidades para ser aprovado.',
    };
  };

  const badgeInfo = getScoreBadge();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Diagnóstico de Compatibilidade ATS</h2>
              <p className="text-xs text-slate-500">Auditoria automática de legibilidade para robôs de triagem</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Pontuação Principal */}
          <div className={`p-5 rounded-xl border ${badgeInfo.bg} flex items-center justify-between gap-4`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-extrabold tracking-tight">{evaluation.score}</span>
                <span className="text-sm font-semibold opacity-80">/ 100 pontos</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${badgeInfo.badge}`}>
                  {evaluation.rating}
                </span>
              </div>
              <p className="text-sm mt-1 opacity-90">{badgeInfo.desc}</p>
            </div>
          </div>

          {/* Destaques rápidos */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-xs text-slate-500 font-medium">Verbos de Ação Identificados</p>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-xl font-bold text-slate-800">{evaluation.actionVerbsFound.length}</span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenVerbs();
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline"
                >
                  Ver banco de verbos
                </button>
              </div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-xs text-slate-500 font-medium">Métricas Quantitativas (%, R$, nº)</p>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-xl font-bold text-slate-800">{evaluation.metricsCount}</span>
                <span className="text-xs text-slate-500">Mínimo sugerido: 2</span>
              </div>
            </div>
          </div>

          {/* Lista de Verificações Detalhadas */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Checklist de Critérios ATS
            </h3>

            <div className="space-y-2">
              {evaluation.checks.map((check) => (
                <div
                  key={check.id}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                    check.passed
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-rose-50/50 border-rose-200'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {check.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{check.title}</h4>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          check.passed ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'
                        }`}
                      >
                        +{check.scoreImpact} pts
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{check.description}</p>
                    <p
                      className={`text-xs mt-1.5 font-medium ${
                        check.passed ? 'text-emerald-800' : 'text-rose-700'
                      }`}
                    >
                      💡 {check.tip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Por que ATS importa */}
          <div className="p-4 bg-slate-100 rounded-xl text-xs text-slate-600 space-y-1.5">
            <p className="font-bold text-slate-800">Por que o formato ATS é crucial?</p>
            <p>
              Mais de 90% das médias e grandes empresas utilizam softwares de rastreamento de candidatos (ATS)
              como Gupy, Workday, Taleo, Kenoby e Greenhouse. Esses robôs extraem o texto puro do PDF para indexar
              palavras-chave e habilidades. Currículos com colunas múltiplas, ícones gráficos ou tabelas costumam
              ter os textos misturados ou corrompidos, causando descarte automático antes mesmo de um humano visualizar.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors"
          >
            Entendido, Continuar Editando
          </button>
        </div>
      </div>
    </div>
  );
};
