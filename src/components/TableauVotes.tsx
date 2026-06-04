/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Shield, LogIn, CheckCircle, Flame, Trophy, Lock } from 'lucide-react';
import { Project, UserSession } from '../types';

interface TableauVotesProps {
  finalists: Project[];
  userSession: UserSession;
  onLogin: (email: string, provider: 'google' | 'magic_link') => void;
  onLogout: () => void;
  onCastVote: (projectId: string) => void;
  // Let parent components know if other ideas are getting live simulated votes to show realtime state
  onSimulateTick: () => void;
}

export default function TableauVotes({
  finalists,
  userSession,
  onLogin,
  onLogout,
  onCastVote,
  onSimulateTick
}: TableauVotesProps) {
  const [emailInput, setEmailInput] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'google' | 'magic'>('google');
  
  // Total votes of finalists for calculating percentage weights
  const totalVotes = finalists.reduce((acc, f) => acc + f.votes_count, 0);

  // Trigger simulated periodic vote updates to simulate Supabase Realtime activities
  useEffect(() => {
    const timer = setInterval(() => {
      onSimulateTick();
    }, 4000); // add random votes every 4 seconds to create live engagement
    return () => clearInterval(timer);
  }, [onSimulateTick]);

  const handleMagicLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.trim())) {
      alert("L'adresse e-mail de connexion saisie n'est pas valide.");
      return;
    }
    
    setIsLoggingIn(true);
    setTimeout(() => {
      onLogin(emailInput, 'magic_link');
      setIsLoggingIn(false);
      setEmailInput('');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      onLogin('oisans.sprint.saas@gmail.com', 'google');
      setIsLoggingIn(false);
    }, 1200);
  };

  // Find sorted finalists to determine rank positions (0 is rank 1)
  const sortedFinalists = [...finalists].sort((a, b) => b.votes_count - a.votes_count);

  return (
    <div id="voting-arena-wrapper" className="space-y-8">
      {/* Realtime Stats Header banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-cyber-deep/60 p-4 rounded border border-cyber-gray/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase">Total Votes Arbitrés</span>
            <p className="text-xl font-display font-bold text-accent-cyan tracking-wide mt-1">
              {totalVotes} VF
            </p>
          </div>
          <Users className="w-8 h-8 text-accent-cyan/40" />
        </div>

        <div className="bg-cyber-deep/60 p-4 rounded border border-cyber-gray/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase">Synchronisation</span>
            <p className="text-sm font-mono font-bold text-accent-emerald uppercase tracking-wider flex items-center mt-2.5">
              <span className="w-2 h-2 rounded-full bg-accent-emerald mr-2 animate-ping" />
              Supabase Live [OK]
            </p>
          </div>
          <Flame className="w-8 h-8 text-accent-emerald/40" />
        </div>

        <div className="bg-cyber-deep/60 p-4 rounded border border-cyber-gray/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase">Session Statut</span>
            {userSession.isConnected ? (
              <div className="mt-1">
                <span className="text-xs text-slate-300 font-mono truncate block max-w-[170px]">
                  {userSession.email}
                </span>
                <button 
                  onClick={onLogout}
                  className="text-[9px] font-mono text-red-400 underline hover:text-red-300 mt-1"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <p className="text-xs text-red-400 font-mono mt-2.5 flex items-center">
                <Lock className="w-3.5 h-3.5 mr-1" />
                Dévérouillage requis
              </p>
            )}
          </div>
          <Shield className="w-8 h-8 text-slate-500" />
        </div>
      </div>

      {/* Main Duel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Top 5 combat cards */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center space-x-2 border-b border-cyber-gray/35 pb-3">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">
              Combat des Géants : TOP 5 Finalistes
            </h3>
          </div>

          <div className="space-y-4">
            {finalists.map((f, idx) => {
              const rank = sortedFinalists.findIndex(item => item.id === f.id) + 1;
              const isWinner = rank === 1;
              const hasVotedThis = userSession.votedForId === f.id;
              
              const votePercentage = totalVotes > 0 
                ? Math.round((f.votes_count / totalVotes) * 100) 
                : 0;

              return (
                <div
                  key={f.id}
                  id={`finalist-card-${f.id}`}
                  className={`glassmorphism rounded-lg p-5 relative overflow-hidden transition-all duration-300 border ${
                    isWinner 
                      ? 'border-accent-cyan/60 shadow-[0_0_20px_rgba(0,240,255,0.08)] bg-cyber-deep/80' 
                      : 'border-cyber-gray/30 hover:border-cyber-gray/60'
                  }`}
                >
                  {/* Rank Flag */}
                  <div className={`absolute top-0 right-0 px-3 py-1 font-mono text-[9px] font-bold uppercase rounded-bl border-l border-b ${
                    isWinner 
                      ? 'bg-accent-cyan/10 border-accent-cyan text-accent-cyan' 
                      : 'bg-cyber-gray/30 border-cyber-gray/50 text-slate-400'
                  }`}>
                    {isWinner ? '👑 Leader • Rang 1' : `Rang ${rank}`}
                  </div>

                  <div className="pr-20 mb-3">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                      {f.sector}
                    </span>
                    <h4 className="text-base font-display font-semibold text-white tracking-tight">
                      {f.title}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-400 leading-normal line-clamp-2 max-w-xl mb-4">
                    <strong className="text-slate-350 font-normal">Pitch:</strong> {f.solution}
                  </p>

                  {/* Horizontal visual progress meter */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-[11px] font-mono text-slate-400">
                      <span>Proportion des votes</span>
                      <span className={isWinner ? 'text-accent-cyan font-bold' : 'text-slate-300'}>
                        {votePercentage}% ({f.votes_count} votes)
                      </span>
                    </div>
                    {/* The bar */}
                    <div className="w-full h-2.5 bg-cyber-black rounded-full overflow-hidden border border-cyber-gray/20">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${votePercentage}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full ${
                          isWinner 
                            ? 'bg-gradient-to-r from-accent-cyan to-cyan-500 cyan-glow' 
                            : 'bg-gradient-to-r from-cyber-gray to-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Submit individual vote */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4 text-[10px] font-mono text-slate-500">
                      <span>Faisabilité: {f.score_feasibility}%</span>
                      {f.ai_analyzed && (
                        <span>
                          ROI: <strong className="text-accent-emerald">{f.score_roi}%</strong>
                        </span>
                      )}
                    </div>

                    {userSession.isConnected ? (
                      userSession.votedForId ? (
                        hasVotedThis ? (
                          <span className="text-xs text-accent-emerald font-mono flex items-center font-bold">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Votre vote enregistré
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">
                            Bloqué (1 vote max)
                          </span>
                        )
                      ) : (
                        <button
                          id={`vote-btn-${f.id}`}
                          onClick={() => onCastVote(f.id)}
                          className="bg-accent-cyan text-cyber-black hover:bg-white hover:text-cyber-black px-3 py-1.5 rounded font-display tracking-widest text-[10px] font-bold uppercase transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.3)] cursor-pointer"
                        >
                          Soutenir ce Projet
                        </button>
                      )
                    ) : (
                      <span className="text-[10px] text-slate-500 font-mono italic flex items-center">
                        <Lock className="w-3.5 h-3.5 mr-1" /> Connectez-vous pour voter
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Authenticator sidebar */}
        <div className="lg:col-span-4">
          <div className="glassmorphism p-5 rounded-lg border border-cyber-gray/30 space-y-5 sticky top-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-accent-cyan" />
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider">
                Authentification Supabase
              </h4>
            </div>

            {userSession.isConnected ? (
              <div className="bg-cyber-black/75 p-4 rounded border border-accent-emerald/20 space-y-4">
                <div className="flex items-center space-x-2 text-accent-emerald text-xs font-mono font-bold">
                  <CheckCircle className="w-4 h-4 animate-pulse" />
                  <span>SÉCURITÉ JWT EN LIGNE</span>
                </div>
                
                <p className="text-xs text-slate-300 leading-relaxed font-mono truncate">
                  {userSession.email}
                </p>

                <p className="text-xs text-slate-400">
                  Votre jeton unique est lié à la ligne de vote. Vous êtes autorisé à influencer l'Arène de vote ci-gâtée une fois au total.
                </p>

                <button
                  onClick={onLogout}
                  className="w-full bg-cyber-gray border border-cyber-gray text-slate-300 hover:text-white py-2 px-3 text-xs font-mono uppercase tracking-widest transition-all rounded hover:bg-red-500/10 hover:border-red-500/40 cursor-pointer"
                >
                  Se déconnecter
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Afin de garantir l'intégrité de l'Arène et éviter toute manipulation (Sybil Attacks), connectez votre identité via le protocole sécurisé Supabase.
                </p>

                {/* Login Method tabs */}
                <div className="grid grid-cols-2 gap-1 bg-cyber-black p-1 rounded border border-cyber-gray/40">
                  <button
                    onClick={() => setActiveTab('google')}
                    className={`py-1.5 text-[10px] font-mono uppercase tracking-wider rounded transition-all cursor-pointer ${
                      activeTab === 'google' 
                        ? 'bg-cyber-gray text-white border border-cyber-gray/70' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Google Auth
                  </button>
                  <button
                    onClick={() => setActiveTab('magic')}
                    className={`py-1.5 text-[10px] font-mono uppercase tracking-wider rounded transition-all cursor-pointer ${
                      activeTab === 'magic' 
                        ? 'bg-cyber-gray text-white border border-cyber-gray/70' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Magic Link
                  </button>
                </div>

                {activeTab === 'google' ? (
                  <div className="space-y-3">
                    <button
                      onClick={handleGoogleLogin}
                      disabled={isLoggingIn}
                      className="w-full bg-white text-cyber-black hover:bg-neutral-200 transition-all text-xs font-mono py-2.5 rounded font-bold flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>{isLoggingIn ? "Authentification..." : "Se connecter avec Google"}</span>
                    </button>
                    <div className="text-[9px] font-mono text-center text-slate-500">
                      RÉSEAU DE CONFIANCE GOOGLE PROTOCOL SECURE
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleMagicLinkSubmit} className="space-y-3">
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Veuillez saisir votre email..."
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full bg-cyber-black text-white border border-cyber-gray rounded p-2 text-xs focus:outline-none focus:border-accent-cyan font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoggingIn}
                      className="w-full bg-cyber-black hover:bg-accent-cyan/10 border border-accent-cyan text-accent-cyan transition-all text-xs font-mono py-2.5 rounded font-bold uppercase tracking-widest cursor-pointer"
                    >
                      {isLoggingIn ? "Envoi du lien..." : "Envoyer Magic Link"}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
