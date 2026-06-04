/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Cpu, Hourglass } from 'lucide-react';
import { Project } from '../types';

interface CarteIdeeProps {
  project: Project;
  onClick: (project: Project) => void;
  onRunAnalysis?: (projectId: string) => void;
  isAnalyzing?: boolean;
}

export default function CarteIdee({ project, onClick, onRunAnalysis, isAnalyzing = false }: CarteIdeeProps) {
  const isAnalyzed = project.ai_analyzed;
  
  // Choose status color
  let statusBadgeColor = 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5';
  let statusText = 'Mise en attente';
  
  if (isAnalyzing) {
    statusBadgeColor = 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5 animate-pulse';
    statusText = 'Analyse en cours...';
  } else if (isAnalyzed) {
    statusBadgeColor = 'text-accent-emerald border-accent-emerald/30 bg-accent-emerald/5';
    statusText = 'Prêt • Nova Évalué';
  }

  // Check if roi is exceptionally high
  const hasHighROI = isAnalyzed && project.score_roi >= 80;

  return (
    <motion.div
      id={`project-card-${project.id}`}
      layoutId={`card-${project.id}`}
      whileHover={{ y: -4 }}
      className={`glassmorphism rounded-lg p-5 flex flex-col justify-between border relative overflow-hidden transition-all duration-300 group cursor-pointer ${
        isAnalyzed 
          ? 'border-cyber-gray/40 hover:border-accent-cyan/50 shadow-[0_0_15px_rgba(0,240,255,0.02)]' 
          : isAnalyzing
          ? 'border-accent-cyan/40 shadow-[0_0_15px_rgba(0,240,255,0.05)]'
          : 'border-cyber-gray/20 hover:border-cyber-gray/40'
      }`}
      onClick={() => onClick(project)}
    >
      {/* Visual neon light highlights for high-ROI cards */}
      {hasHighROI && (
        <div className="absolute top-0 right-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-emerald to-transparent opacity-80"></div>
      )}

      {/* Card Header & Cover Mockup */}
      <div>
        {project.illustration_url && (
          <div className="relative w-full h-32 rounded bg-cyber-black mb-4 overflow-hidden border border-cyber-gray/35">
            <img 
              src={project.illustration_url} 
              alt={project.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550"
            />
            {project.signature_hash && (
              <span className="absolute top-2 left-2 bg-accent-emerald/90 text-black text-[8px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
                ✍️ Contrat Signé (20% Brut)
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-widest bg-accent-cyan/10 px-2 py-0.5 rounded border border-accent-cyan/10">
            {project.sector}
          </span>
          <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${statusBadgeColor}`}>
            {statusText}
          </span>
        </div>

        <h3 className="font-display text-base font-semibold text-white tracking-tight group-hover:text-accent-cyan transition-colors line-clamp-1 mb-1">
          {project.title}
        </h3>

        {/* Creator Name Identification */}
        <div className="text-[10px] font-mono text-slate-400 mb-3 flex items-center justify-between">
          <span className="text-[9px] text-slate-500 uppercase">CANDIDAT :</span>
          <span className="text-white truncate max-w-[150px]">{project.user_fullname || 'Anonyme'}</span>
        </div>

        {/* Shortened preview of problem and solution */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-2.5">
          <strong className="text-slate-300 font-normal">Problème:</strong> {project.problem}
        </p>
        
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          <strong className="text-slate-300 font-normal">IA Solution:</strong> {project.solution}
        </p>
      </div>

      {/* Card Footer (KPIs or Launch trigger) */}
      <div className="border-t border-cyber-gray/25 pt-4 mt-auto">
        {isAnalyzed ? (
          <div>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono font-medium mb-3">
              <div>
                <span className="block text-[8px] text-slate-500 uppercase">Faisabilité</span>
                <span className="text-slate-300">{project.score_feasibility}%</span>
              </div>
              <div>
                <span className="block text-[8px] text-slate-500 uppercase">Optimalité Coût</span>
                <span className="text-slate-300">{project.score_cost}%</span>
              </div>
              <div>
                <span className="block text-[8px] text-slate-500 uppercase">Potentiel ROI</span>
                <span className={project.score_roi >= 80 ? "text-accent-emerald font-bold" : "text-slate-300"}>
                  {project.score_roi}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="text-[9px] font-mono text-slate-500">
                Id: {project.id.slice(0, 8).toUpperCase()}
              </span>
              <div className="flex items-center text-accent-cyan group-hover:underline">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                <span>Ouvrir Nova Verdict</span>
              </div>
            </div>
          </div>
        ) : isAnalyzing ? (
          <div className="flex items-center justify-center py-2 space-x-2">
            <Cpu className="w-4 h-4 text-accent-cyan animate-spin" />
            <span className="text-xs text-slate-400 font-mono tracking-wider animate-pulse uppercase">
              Lecture de l'empreinte...
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500">
              Prêt pour l'analyse
            </span>
            {onRunAnalysis ? (
              <button
                id={`run-analysis-btn-${project.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onRunAnalysis(project.id);
                }}
                className="bg-accent-cyan/10 hover:bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/35 rounded px-3 py-1 text-[10px] font-mono font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer"
              >
                Lancer l'IA
              </button>
            ) : (
              <div className="flex items-center text-yellow-400 text-[10px] font-mono">
                <Hourglass className="w-3.5 h-3.5 mr-1 animate-pulse" />
                <span>Attente IA</span>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
