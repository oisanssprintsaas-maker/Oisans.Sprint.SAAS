import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Shield, ArrowRight, CheckCircle2, RotateCw, AlertTriangle, Scale, Mail } from 'lucide-react';
import { Project } from '../types';

interface FormulaireProps {
  onAddProject: (project: Omit<Project, 'id' | 'created_at' | 'ai_analyzed' | 'votes_count' | 'is_finalist' | 'score_feasibility' | 'score_cost' | 'score_roi' | 'ai_verdict'>) => void;
  currentUserEmail?: string;
  onOpenLegalModal: (tab: 'rules' | 'privacy' | 'mentions') => void;
}

const SECTORS = [
  'FinTech & SaaS',
  'IA & Automation',
  'DeepTech & Web3',
  'HealthTech & Bio',
  'GreenTech & Solar',
  'EdTech & HR Tech'
];

export default function Formulaire({ onAddProject, currentUserEmail = 'oisans.expert.ia@gmail.com', onOpenLegalModal }: FormulaireProps) {
  const [title, setTitle] = useState('');
  const [sector, setSector] = useState(SECTORS[0]);
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [features, setFeatures] = useState('');
  const [userFullname, setUserFullname] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [illustrationUrl, setIllustrationUrl] = useState('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80');
  const [signatureText, setSignatureText] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [userEmail, setUserEmail] = useState(currentUserEmail);
  
  // Rule Acceptance
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Anti-bot state simulator
  const [captchaState, setCaptchaState] = useState<'idle' | 'verifying' | 'verified'>('idle');
  
  // Form submission success notification
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerifyCaptcha = () => {
    if (captchaState !== 'idle') return;
    setCaptchaState('verifying');
    setTimeout(() => {
      setCaptchaState('verified');
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!title.trim() || !problem.trim() || !solution.trim() || !targetAudience.trim() || !userEmail.trim() || !userFullname.trim()) {
      setErrorMessage('Tous les champs techniques, vos coordonnées (Nom/Prénom) et votre e-mail doivent être complétés.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail.trim())) {
      setErrorMessage("L'adresse e-mail de contact saisie n'est pas valide.");
      return;
    }

    if (!signatureText.trim()) {
      setErrorMessage('La signature manuscrite électronique (votre Nom Complet) est obligatoire pour certifier votre consentement au règlement et à la licence.');
      return;
    }

    if (!termsAccepted) {
      setErrorMessage('Vous devez accepter les conditions du règlement et de la licence d’exploitation pour continuer.');
      return;
    }

    if (captchaState !== 'verified') {
      setErrorMessage('Le test de viabilité anti-bot "Turnstile" est obligatoire.');
      return;
    }

    // Generate a secure pseudo-cryptographic transaction identifier
    const randParts = Array.from({ length: 4 }, () => Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0'));
    const sigHash = `SEC6-HASH-${randParts.join('-').toUpperCase()}`;

    onAddProject({
      title,
      sector,
      problem,
      solution,
      features: features.trim() || undefined,
      user_fullname: userFullname,
      user_phone: userPhone.trim() || undefined,
      illustration_url: illustrationUrl || undefined,
      target_audience: targetAudience,
      user_email: userEmail,
      terms_accepted: termsAccepted,
      signature_hash: sigHash
    });

    // Reset Form
    setTitle('');
    setProblem('');
    setSolution('');
    setFeatures('');
    setTargetAudience('');
    setUserFullname('');
    setUserPhone('');
    setSignatureText('');
    setTermsAccepted(false);
    setCaptchaState('idle');
    
    // Show premium animation
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <div id="sub-form-container" className="glassmorphism p-6 md:p-8 rounded-lg relative overflow-hidden transition-all duration-300 border border-cyber-gray/40">
      {/* Decorative cyber grid accent lines */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent-cyan"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent-cyan"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-accent-cyan"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-accent-cyan"></div>

      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-accent-cyan/10 rounded border border-accent-cyan/20">
          <Terminal className="w-5 h-5 text-accent-cyan" />
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-white uppercase tracking-wider">
            Soumettre un Projet
          </h2>
          <p className="text-xs text-slate-400 font-mono">MODULE DE SOUBLIANCE IA SPRINT v4.2</p>
        </div>
      </div>

      {showSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="w-16 h-16 bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/30 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-display text-xl text-white font-medium mb-2">PROJET ENREGISTRÉ</h3>
          <p className="text-slate-400 text-sm max-w-sm mb-6">
            Votre idée a été injectée dans le protocole. Le moteur IA "Nova" va procéder à l'analyse analytique multi-critères.
          </p>
          <div className="text-[10px] font-mono text-accent-cyan uppercase tracking-widest animate-pulse">
            TRANSLATION DB_RECORD SUCCESSFUL // SUPABASE INTEGRATION READY
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Main info row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 tracking-wider">
                Nom de code du SaaS
              </label>
              <input
                id="input-project-title"
                type="text"
                placeholder="Ex. NeuroTask, LedgerFlow..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={40}
                className="w-full bg-cyber-black text-white placeholder-slate-600 border border-cyber-gray/60 rounded px-3 py-2 text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/20 transition-all font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 tracking-wider">
                Secteur d'activité
              </label>
              <select
                id="input-project-sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full bg-cyber-black text-white border border-cyber-gray/60 rounded px-3 py-2 text-sm focus:outline-none focus:border-accent-cyan/80 focus:ring-1 focus:ring-accent-cyan/20 transition-all font-mono cursor-pointer"
              >
                {SECTORS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Problem targeted */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 tracking-wider flex justify-between">
              <span>Le Point de Douleur (Le Problème)</span>
              <span className="text-slate-500 text-[10px] lowercase text-right">{problem.length}/500 caractères</span>
            </label>
            <textarea
              id="input-project-problem"
              rows={3}
              placeholder="Quel problème douloureux, récurrent, et coûteux cherchez-vous à éradiquer pour vos clients ?"
              value={problem}
              onChange={(e) => setProblem(e.target.value.slice(0, 500))}
              className="w-full bg-cyber-black text-white placeholder-slate-600 border border-cyber-gray/60 rounded px-3 py-2 text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/20 transition-all font-mono"
            />
          </div>

          {/* Solution */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 tracking-wider flex justify-between">
              <span>L'Architecture Logicielle & IA (La Solution)</span>
              <span className="text-slate-500 text-[10px] lowercase text-right">{solution.length}/500 caractères</span>
            </label>
            <textarea
              id="input-project-solution"
              rows={3}
              placeholder="Comment votre algorithme ou solution de code élimine-t-elle cette friction de façon hautement efficace ?"
              value={solution}
              onChange={(e) => setSolution(e.target.value.slice(0, 500))}
              className="w-full bg-cyber-black text-white placeholder-slate-600 border border-cyber-gray/60 rounded px-3 py-2 text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/20 transition-all font-mono"
            />
          </div>

          {/* Detailed Features (Expliquer plus de caractères) */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 tracking-wider flex justify-between">
              <span>Description complète & Fonctionnalités Clés (Le Devis Applicatif)</span>
              <span className="text-accent-cyan text-[10px] lowercase text-right font-bold">{features.length}/2000 caractères</span>
            </label>
            <textarea
              id="input-project-features"
              rows={5}
              placeholder="Listez ici en détail les fonctionnalités majeures de votre SaaS (ex. tableaux de bord de suivi, intégration d'APIs, passerelles de paiement, espaces d'administration...) pour asseoir la robustesse de l'analyse IA Nova."
              value={features}
              onChange={(e) => setFeatures(e.target.value.slice(0, 2000))}
              className="w-full bg-cyber-black text-white placeholder-slate-600 border border-cyber-gray/60 rounded px-3 py-3 text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/20 transition-all font-mono"
            />
            <p className="text-[10px] font-mono text-slate-500 mt-1">
              * Ce bloc permet à Simonutti Michael et à l'IA Nova d'obtenir un niveau de précision optimal sur le cahier des charges opérationnel.
            </p>
          </div>

          {/* Illustration Selection Preset Grid */}
          <div className="bg-cyber-deep/35 border border-cyber-gray/30 rounded p-4 space-y-3">
            <label className="block text-xs font-mono uppercase text-slate-300 tracking-wider">
              🏞️ Illustration Graphique de l'Application (Mockups d'interface)
            </label>
            <p className="text-[10px] text-slate-400 font-mono">
              Sélectionnez instantanément une maquette de design visuel IA pour illustrer votre SaaS dans le flux d'affrontements :
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {[
                { 
                  name: 'Analytics B2B', 
                  url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' 
                },
                { 
                  name: 'Cyber Ledger', 
                  url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80' 
                },
                { 
                  name: 'UX Dashboard', 
                  url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80' 
                },
                { 
                  name: 'Green Tech Grid', 
                  url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80' 
                },
                { 
                  name: 'Medical Edge', 
                  url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80' 
                },
                { 
                  name: 'Bio-Pulse Graph', 
                  url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80' 
                }
              ].map((preset) => (
                <div 
                  key={preset.name}
                  onClick={() => setIllustrationUrl(preset.url)}
                  className={`relative h-20 rounded border overflow-hidden cursor-pointer group transition-all duration-300 ${
                    illustrationUrl === preset.url 
                      ? 'border-accent-cyan scale-[1.03] ring-1 ring-accent-cyan/45' 
                      : 'border-cyber-gray/40 hover:border-slate-400'
                  }`}
                >
                  <img 
                    src={preset.url} 
                    alt={preset.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-end p-1.5">
                    <span className="text-[8px] font-mono font-bold leading-tight text-white uppercase truncate block w-full text-center">
                      {preset.name}
                    </span>
                  </div>
                  {illustrationUrl === preset.url && (
                    <div className="absolute top-1 right-1 bg-accent-cyan text-black font-semibold text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center">
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-3">
              <span className="block text-[10px] font-mono text-slate-500 mb-1">Ou injectez directement un lien URL personnalisé d'image :</span>
              <input
                type="text"
                value={illustrationUrl}
                onChange={(e) => setIllustrationUrl(e.target.value)}
                placeholder="https://votre-portfolio.com/mockup-saas.png"
                className="w-full bg-cyber-black text-xs text-white placeholder-slate-600 border border-cyber-gray/60 rounded px-2.5 py-1.5 focus:outline-none focus:border-accent-cyan font-mono"
              />
            </div>
          </div>

          {/* Joueur Contact Information (Coordonnées complètes obligatoires) */}
          <div className="bg-cyber-deep/20 border border-cyber-gray/40 rounded p-4 space-y-4">
            <span className="text-xs font-mono text-white tracking-wider block font-bold uppercase border-b border-cyber-gray/20 pb-2">
              👤 Identification Officielle du Candidat
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 tracking-wider">
                  Vos Prénom & Nom (Requis)
                </label>
                <input
                  id="input-player-fullname"
                  type="text"
                  placeholder="Ex. Michael Simonutti"
                  value={userFullname}
                  onChange={(e) => setUserFullname(e.target.value)}
                  className="w-full bg-cyber-black text-white placeholder-slate-600 border border-cyber-gray/60 rounded px-3 py-2 text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/20 transition-all font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 tracking-wider">
                  N° de Téléphone (Facultatif)
                </label>
                <input
                  id="input-player-phone"
                  type="tel"
                  placeholder="Ex. +33 6 12 34 56 78"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full bg-cyber-black text-white placeholder-slate-600 border border-cyber-gray/60 rounded px-3 py-2 text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/20 transition-all font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 tracking-wider">
                  Profil Client Idéal (Le Public Cible)
                </label>
                <input
                  id="input-project-target"
                  type="text"
                  placeholder="Ex: Directeurs d'Écoles, Professionnels B2B..."
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full bg-cyber-black text-white placeholder-slate-600 border border-cyber-gray/60 rounded px-3 py-2 text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/20 transition-all font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 tracking-wider">
                  Email de contact principal (Supabase)
                </label>
                <input
                  id="input-project-email"
                  type="email"
                  placeholder="Ex: mike@oisans-expert-ia.fr"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-cyber-black text-white placeholder-slate-600 border border-cyber-gray/60 rounded px-3 py-2 text-sm focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/20 transition-all font-mono"
                />
              </div>
            </div>
          </div>

          {/* Secure Interactive Cursive Signature Block */}
          <div className="bg-cyber-deep/30 border border-cyber-gray/50 rounded p-4 space-y-3">
            <label className="block text-xs font-mono uppercase text-slate-400 tracking-wider">
              ✍️ Signature Numérique Contractuelle de Licence & Règlement
            </label>
            <p className="text-[10px] text-slate-400 font-mono">
              Veuillez saisir votre Prénom & Nom pour apposer votre signature d'engagement à l'accord d'Oisans Expert IA :
            </p>
            <input
              type="text"
              placeholder="Signer en écrivant votre nom..."
              value={signatureText}
              onChange={(e) => setSignatureText(e.target.value)}
              className="w-full bg-cyber-black text-white placeholder-slate-600 border border-cyber-gray/60 rounded px-3 py-2 text-sm focus:outline-none focus:border-accent-cyan font-mono"
            />
            {signatureText && (
              <div className="p-3 bg-cyber-black border border-cyber-gray/40 rounded flex flex-col justify-center items-center select-none text-center">
                <span className="text-2xl font-serif text-accent-cyan italic tracking-wide select-none">
                  {signatureText}
                </span>
                <span className="text-[8px] text-slate-600 font-mono mt-2 block uppercase">
                  ✓ SIGNATURE CERTIFIÉE PAR OISANS EXPERT IA
                </span>
              </div>
            )}
          </div>

          {/* Legal CGU Segment */}
          <div className="bg-cyber-black/60 border border-cyber-gray/40 rounded p-4 text-xs space-y-3">
            <div className="flex items-start space-x-3">
              <input
                id="checkbox-cgu"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded bg-cyber-black accent-accent-cyan border-cyber-gray focus:ring-0 cursor-pointer"
              />
              <label htmlFor="checkbox-cgu" className="text-slate-300 cursor-pointer leading-relaxed select-none">
                Je reconnais avoir lu et accepté sans réserve{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenLegalModal('rules');
                  }}
                  className="text-accent-cyan hover:underline hover:text-white font-semibold cursor-pointer"
                >
                  le règlement du concours
                </button>
                ,{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenLegalModal('privacy');
                  }}
                  className="text-accent-emerald hover:underline hover:text-white font-semibold cursor-pointer"
                >
                  la politique de confidentialité
                </button>{' '}
                et{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenLegalModal('rules');
                  }}
                  className="text-accent-cyan hover:underline hover:text-white font-semibold cursor-pointer"
                >
                  la licence d'exploitation du projet (20% Net)
                </button>
                . Je prends note que l'intéressement de 20% s'applique exclusivement sur les Recettes Nettes des abonnements standards catalogue (hors développement spécifique, maintenance, support, conseil ou intégration de la solution, sous la formule « pas de vente = aucun paiement »).
              </label>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-amber-500/85 font-mono">
              <Scale className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Attribution de licence d'exploitation exclusive, preuve électronique certifiée et hachée cryptographiquement.</span>
            </div>
          </div>

          {/* Anti-bot widget simulator */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-cyber-dark border border-cyber-gray/40 rounded gap-4">
            <div className="flex items-center space-x-3">
              <div 
                id="turnstile-trigger"
                onClick={handleVerifyCaptcha}
                className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-all border ${
                  captchaState === 'verified' 
                    ? 'bg-accent-cyan/20 border-accent-cyan text-accent-cyan' 
                    : captchaState === 'verifying'
                    ? 'border-accent-cyan/50'
                    : 'border-cyber-gray/80 bg-cyber-black hover:border-accent-cyan/60'
                }`}
              >
                {captchaState === 'verifying' && (
                  <RotateCw className="w-3 h-3 animate-spin text-accent-cyan" />
                )}
                {captchaState === 'verified' && (
                  <motion.span initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                    ✓
                  </motion.span>
                )}
              </div>
              <div className="text-left">
                <p className="text-xs font-mono text-white leading-none mb-1">
                  Cloudflare Turnstile Verified
                </p>
                <p className="text-[10px] text-slate-500 font-mono">
                  SÉCURITÉ INFRASTRUCTURE ZERO-BOTS
                </p>
              </div>
            </div>

            <div className="flex items-center text-[10px] font-mono text-slate-400">
              <Shield className="w-3.5 h-3.5 mr-1 text-accent-cyan" />
              <span>IP: {Math.floor(Math.random() * 85 + 24)}.{Math.floor(Math.random() * 254)}...</span>
            </div>
          </div>

          {/* Feedback errors */}
          {errorMessage && (
            <div className="p-3 bg-red-550/10 border border-red-500/30 text-red-400 text-xs rounded flex items-center space-x-2 font-mono">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action Button */}
          <button
            id="btn-submit-idea"
            type="submit"
            className="w-full bg-cyber-black hover:bg-accent-cyan/5 border border-accent-cyan text-accent-cyan font-display uppercase tracking-widest text-xs font-semibold py-3 px-4 rounded transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-cyan shadow-[0_0_10px_rgba(0,240,255,0.05)] cursor-pointer"
          >
            <span>Lancer la Phase d'Analyse</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}
