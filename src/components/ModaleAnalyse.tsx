/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Cpu, Code } from 'lucide-react';
import { Project } from '../types';

interface ModaleAnalyseProps {
  project: Project | null;
  onClose: () => void;
}

const NOVA_SYSTEM_PROMPT = `[SYSTEM PROTOCOL: NOVA-V4.2]
Evaluate product viability for Oisans Expert IA.
- Technical Feasibility: Score 0-100 based on API density, modularity, and risk of bottlenecks.
- Cost Optimality: Score 0-100 where higher score means optimized lean infrastructure, serverless deployments, or EDGE computed databases.
- ROI Potential: Score 0-100. High margins, low operational costs, recurring B2B value increases score.
- Cession agreement compliance audited by Supabase RLS shield and Oisans contracts.`;

export default function ModaleAnalyse({ project, onClose }: ModaleAnalyseProps) {
  const [showPromptDetails, setShowPromptDetails] = useState(false);

  if (!project) return null;

  const isAnalyzed = project.ai_analyzed;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto w-full h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 cursor-pointer"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-cyber-dark/95 border border-accent-cyan/30 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.1)] z-10 glassmorphism-cyan"
        >
          {/* Header */}
          <div className="p-6 border-b border-cyber-gray/30 flex items-center justify-between relative">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent-cyan/10 rounded border border-accent-cyan/30">
                <Cpu className="w-5 h-5 text-accent-cyan animate-pulse" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                  Nova Évaluation Diagnostic
                </h3>
                <p className="text-[10px] font-mono text-slate-400">
                  ID SAAS: {project.id.toUpperCase()} • {project.sector}
                </p>
              </div>
            </div>
            <button
              id="btn-close-nova-modal"
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white hover:bg-cyber-gray/40 rounded transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Title Block */}
            <div className="bg-cyber-black/80 p-4 border border-cyber-gray/40 rounded">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">PROJET SÉLECTIONNÉ</span>
              <h4 className="text-xl font-display font-bold text-white">{project.title}</h4>
              <p className="text-xs text-slate-400 font-mono mt-1">Enregistré le : {new Date(project.created_at).toLocaleString('fr-FR')}</p>
            </div>

            {/* Illustration Graphic/Mockup Cover */}
            {project.illustration_url && (
              <div className="relative w-full h-44 rounded-lg overflow-hidden border border-cyber-gray/40 bg-cyber-black">
                <img 
                  src={project.illustration_url} 
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 bg-cyber-black/75 px-2.5 py-1 rounded border border-accent-cyan/30 text-[10px] font-mono text-white">
                  📸 Aperçu visuel de la solution
                </div>
              </div>
            )}

            {/* Candidat Contact Record Info Card Box */}
            <div className="bg-cyber-deep/60 border border-cyber-gray/45 rounded-lg p-4 space-y-2 text-xs font-mono">
              <span className="text-[9px] text-slate-400 uppercase block font-bold border-b border-cyber-gray/20 pb-1.5">
                💼 Fichier d'identification du candidat
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                <div>
                  <span className="text-slate-500 block text-[9px]">CRÉATEUR :</span>
                  <span className="text-white font-semibold">{project.user_fullname || 'Anonyme'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px]">ADRESSE EMAIL :</span>
                  <span className="text-accent-cyan underline">{project.user_email}</span>
                </div>
                {project.user_phone && (
                  <div>
                    <span className="text-slate-500 block text-[9px]">N° TÉLÉPHONE :</span>
                    <span className="text-white">{project.user_phone}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-500 block text-[9px]">PUBLIC CIBLE VISÉ :</span>
                  <span className="text-white truncate block">{project.target_audience}</span>
                </div>
              </div>

              {project.signature_hash && (
                <div className="mt-2.5 pt-2 border-t border-cyber-gray/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div className="flex items-center space-x-1.5 text-accent-emerald">
                    <span>✓</span>
                    <span className="text-[10px] font-semibold tracking-wider font-sans uppercase">Contrat de cession signé (20% Royalties Brut)</span>
                  </div>
                  <span className="text-[8px] text-slate-550 truncate font-mono">
                    HASH SEC: {project.signature_hash}
                  </span>
                </div>
              )}
            </div>

            {/* If custom detailed features exist */}
            {project.features && (
              <div className="bg-cyber-black/45 p-4 rounded-lg border border-cyber-gray/30 space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">📦 Cahier des charges & Modules fonctionnels</span>
                <p className="text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-line select-text">
                  {project.features}
                </p>
              </div>
            )}

            {/* If NOT fully analyzed yet */}
            {!isAnalyzed ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-accent-cyan border-t-transparent animate-spin"></div>
                  <Sparkles className="w-5 h-5 text-accent-cyan absolute inset-0 m-auto animate-pulse" />
                </div>
                <div>
                  <h5 className="text-white font-display uppercase tracking-widest text-sm font-semibold">Génération des Prédicteurs IA</h5>
                  <p className="text-xs text-slate-400 max-w-sm mt-1">
                    Analyse de viabilité en cours par la matrice Oisans Nova Expert. Veuillez conserver la liaison active.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* 3 Metric Gauges Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Gauge 1: Faisabilité */}
                  <div className="bg-cyber-black/70 p-4 border border-cyber-gray/30 rounded flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Faisabilité Technique</span>
                      <div className="flex items-baseline mt-1">
                        <span className="text-2xl font-display font-bold text-white">{project.score_feasibility}</span>
                        <span className="text-xs text-slate-500 font-mono">/100</span>
                      </div>
                    </div>
                    {/* Retro Slider Bar */}
                    <div className="w-full h-1.5 bg-cyber-gray/60 rounded-full mt-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.score_feasibility}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-accent-cyan cyan-glow"
                      />
                    </div>
                  </div>

                  {/* Gauge 2: Coût d'Infrastructure */}
                  <div className="bg-cyber-black/70 p-4 border border-cyber-gray/30 rounded flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Optimalité Coût</span>
                      <div className="flex items-baseline mt-1">
                        <span className="text-2xl font-display font-bold text-white">{project.score_cost}</span>
                        <span className="text-xs text-slate-500 font-mono">/100</span>
                      </div>
                    </div>
                    {/* Retro Slider Bar */}
                    <div className="w-full h-1.5 bg-cyber-gray/60 rounded-full mt-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.score_cost}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-slate-300"
                      />
                    </div>
                  </div>

                  {/* Gauge 3: Potentiel ROI */}
                  <div className="bg-cyber-black/70 p-4 border border-cyber-gray/30 rounded flex flex-col justify-between shadow-[0_0_15px_rgba(0,255,135,0.05)]">
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Potentiel ROI</span>
                        {project.score_roi >= 80 && (
                          <span className="text-[8px] bg-accent-emerald/20 text-accent-emerald px-1 rounded border border-accent-emerald/40 uppercase font-mono animate-pulse">ROI Élevé</span>
                        )}
                      </div>
                      <div className="flex items-baseline mt-1">
                        <span className="text-2xl font-display font-bold text-accent-emerald">{project.score_roi}</span>
                        <span className="text-xs text-accent-emerald/70 font-mono">/100</span>
                      </div>
                    </div>
                    {/* Retro Slider Bar - Emerald */}
                    <div className="w-full h-1.5 bg-cyber-gray/60 rounded-full mt-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.score_roi}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-accent-emerald shadow-[0_0_10px_rgba(0,255,135,0.6)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Verdict Section */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Verdict de Nova</span>
                  <div className="bg-cyber-black/90 p-5 rounded border border-cyber-gray/40 leading-relaxed text-sm text-slate-300 relative">
                    <div className="absolute top-4 right-4 w-12 h-12 text-accent-cyan opacity-10 pointer-events-none">
                      <Sparkles className="w-full h-full" />
                    </div>
                    <p className="whitespace-pre-line">{project.ai_verdict}</p>
                  </div>
                </div>

                {/* Raw Prompt Transparency Trigger */}
                <div className="border-t border-cyber-gray/25 pt-4">
                  <button
                    id="btn-toggle-raw-prompt"
                    onClick={() => setShowPromptDetails(!showPromptDetails)}
                    className="flex items-center space-x-2 text-xs font-mono text-accent-cyan/85 hover:text-accent-cyan transition-colors cursor-pointer"
                  >
                    <Code className="w-4 h-4" />
                    <span>{showPromptDetails ? "Masquer le protocole d'évaluation" : "Comment l'IA note-t-elle ? (Prompt Transparent)"}</span>
                  </button>

                  <AnimatePresence>
                    {showPromptDetails && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-3"
                      >
                        <div className="bg-cyber-black p-4 rounded border border-cyber-gray/60 text-[10px] font-mono text-slate-400 leading-normal max-h-60 overflow-y-auto">
                          <span className="text-amber-500 font-bold block mb-1"># CONFIG PROTOCOLE SYSTEME NOVA SECURISÉ (READ-ONLY)</span>
                          <pre className="whitespace-pre-wrap select-text font-mono">
                            {NOVA_SYSTEM_PROMPT}
                          </pre>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>

          {/* Footer actions */}
          <div className="p-4 bg-cyber-black/90 border-t border-cyber-gray/30 flex justify-between items-center text-xs text-slate-500 font-mono">
            <span>OISANS EVALUATION MODULE v4.2S</span>
            <span className="text-[10px] text-accent-cyan bg-accent-cyan/5 px-2 py-0.5 rounded border border-accent-cyan/20 uppercase">
              Supabase Ready Sync
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
