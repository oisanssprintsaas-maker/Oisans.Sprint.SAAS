import React from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Send, HelpCircle, Flame } from 'lucide-react';
import logoImg from '../../assets/logo.png';

interface LogoOisansProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export default function LogoOisans({ className = '', showText = true, size = 'md' }: LogoOisansProps) {
  // If size is 'hero', render the full high-fidelity official logo image
  if (size === 'hero') {
    return (
      <div className={`flex flex-col items-center md:items-start ${className}`}>
        <img 
          src={logoImg} 
          alt="Oisans Sprint SAAS Logo" 
          className="w-full max-w-xl object-contain drop-shadow-[0_0_20px_rgba(0,240,255,0.25)]"
        />
      </div>
    );
  }

  // Determine sizes
  const dims = {
    sm: { svg: 'w-10 h-10', textTitle: 'text-xs', textSub: 'text-[7px]' },
    md: { svg: 'w-18 h-18', textTitle: 'text-base', textSub: 'text-[9px]' },
    lg: { svg: 'w-24 h-24', textTitle: 'text-xl', textSub: 'text-[11px]' }
  }[size as 'sm' | 'md' | 'lg'];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* 1. THE VECTOR ROCKET ARTWORK - Match Mike's Official Logo */}
      <div className={`relative flex-shrink-0 ${dims.svg}`}>
        <svg 
          viewBox="0 0 200 200" 
          fill="none" 
          className="w-full h-full drop-shadow-[0_0_15px_rgba(0,240,255,0.45)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Definitions for Gradients, Glows & Clips */}
          <defs>
            <linearGradient id="rocketBodyGrad" x1="60" y1="140" x2="155" y2="45" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0b2447" />
              <stop offset="50%" stopColor="#19376d" />
              <stop offset="100%" stopColor="#00f0ff" />
            </linearGradient>

            <linearGradient id="cyberCyan" x1="0" y1="200" x2="200" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#0055ff" />
            </linearGradient>

            <linearGradient id="emeraldFlame" x1="20" y1="180" x2="70" y2="130" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00FF87" />
              <stop offset="50%" stopColor="#00ecff" />
              <stop offset="100%" stopColor="#00abff" />
            </linearGradient>

            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Mask to draw mountains exclusively INSIDE rocket body */}
            <clipPath id="rocketClip">
              <path d="M 152 48 L 140 105 L 115 115 L 85 85 L 95 60 Z" />
            </clipPath>
          </defs>

          {/* 1A. Double Concentric Rings (Cyan Tech circle) */}
          {/* Inner Segment Ring */}
          <circle 
            cx="100" 
            cy="100" 
            r="80" 
            stroke="url(#cyberCyan)" 
            strokeWidth="2.5" 
            strokeOpacity="0.8"
            strokeDasharray="180 50 40 30"
          />
          {/* Outer Thin Ring */}
          <circle 
            cx="100" 
            cy="100" 
            r="92" 
            stroke="#00f0ff" 
            strokeWidth="1.2" 
            strokeOpacity="0.45"
            strokeDasharray="40 20 180 60"
          />

          {/* 1B. Glowing Flame Tag with 20% indicator */}
          <g transform="translate(0, 0)">
            {/* The multi-layered vector flame */}
            <path 
              d="M 64 136 C 45 152 28 158 18 182 C 34 182 48 172 55 163 C 58 174 72 178 82 165 C 75 155 74 146 64 136 Z" 
              fill="url(#emeraldFlame)" 
              className="animate-pulse"
            />
            {/* Sub-inner core flame */}
            <path 
              d="M 52 148 C 38 160 30 164 24 178 C 34 178 42 171 46 165 L 52 148 Z" 
              fill="#00FF87" 
              opacity="0.9"
            />
            {/* "20%" indicator nested in flame body */}
            <text 
              x="36" 
              y="173" 
              fill="#000000" 
              fontSize="10px" 
              fontFamily="monospace" 
              fontWeight="900" 
              transform="rotate(-15 36 173)"
            >
              20%
            </text>
          </g>

          {/* 1C. Premium Rocket Body Pointer at 45° */}
          {/* Left stabilizing wing */}
          <path d="M 68 132 L 40 120 L 76 98 Z" fill="#0055ff" stroke="#00f0ff" strokeWidth="1" />
          {/* Right stabilizing wing */}
          <path d="M 132 68 L 120 40 L 98 76 Z" fill="#0055ff" stroke="#00f0ff" strokeWidth="1" />

          {/* Core Fuselage */}
          <path 
            d="M 66 134 L 140 110 C 158 102 165 95 180 50 C 135 65 128 72 120 90 L 96 114 L 66 134 Z" 
            fill="url(#rocketBodyGrad)" 
            stroke="#00f0ff" 
            strokeWidth="2" 
          />

          {/* 1D. Peak Mountains inside the rocket body (Oisans representation) */}
          <g opacity="0.9">
            {/* Mountain 1 */}
            <path d="M 98 120 L 115 95 L 128 114 Z" fill="#050e1e" stroke="#00e1ff" strokeWidth="1" />
            {/* Mountain 2 */}
            <path d="M 112 115 L 132 80 L 150 102 Z" fill="#0e1b30" stroke="#00ecff" strokeWidth="1" />
            
            {/* Snowy peak highlights */}
            <path d="M 115 95 L 119 101 L 111 101 Z" fill="#ffffff" />
            <path d="M 132 80 L 137 88 L 127 88 Z" fill="#00FF87" />
          </g>

          {/* 1E. Connected Cyber Nodes overlay (Graph of AI Nodes) */}
          <g>
            {/* Node links */}
            <line x1="88" y1="124" x2="110" y2="108" stroke="#00FF87" strokeWidth="2.5" />
            <line x1="110" y1="108" x2="132" y2="114" stroke="#00FF87" strokeWidth="2.5" />
            <line x1="110" y1="108" x2="135" y2="85" stroke="#00FF87" strokeWidth="1.5" strokeDasharray="3 2" />

            {/* Glowing Beads */}
            <circle cx="88" cy="124" r="5" fill="#00FF87" stroke="#ffffff" strokeWidth="1" filter="url(#glowEffect)" />
            <circle cx="110" cy="108" r="6" fill="#00f0ff" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="132" cy="114" r="4.5" fill="#00FF87" stroke="#ffffff" strokeWidth="1" filter="url(#glowEffect)" />
          </g>

          {/* High-tech accent crosshair vectors */}
          <path d="M 100 12 L 100 24 M 100 176 L 100 188 M 12 100 L 24 100 M 176 100 L 188 100" stroke="#00f0ff" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      {/* 2. PREMIUM TYPOGRAPHY BRANDING */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5 justify-center md:justify-start">
            <span className={`${dims.textTitle} font-display font-medium tracking-wider text-white uppercase`}>
              OISANS <span className="font-bold">SPRINT</span>
            </span>
          </div>
          
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className="font-mono font-black text-xl md:text-2xl text-accent-cyan tracking-widest uppercase drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
              SAAS
            </span>
            <span className="h-4 w-px bg-cyber-gray/60"></span>
            <span className="text-[10px] font-mono text-accent-emerald uppercase tracking-widest font-bold">
              Mike - Edt. 2026
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// 20% COMMISSION CALCULATOR HERO BANNER CARD
export function OisansCommissionHero() {
  const [simulationCapital, setSimulationCapital] = React.useState<number>(12500);

  const calculateRoyalty = (cap: number) => {
    return Math.round(cap * 0.20);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glassmorphism-cyan rounded-lg p-6 border border-accent-cyan/35 relative overflow-hidden mb-8"
    >
      {/* Background visual graphics */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent-cyan/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-accent-emerald/5 rounded-full blur-2xl pointer-events-none" />
      
      {/* Structural layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Side: Logo & Tagline */}
        <div className="lg:col-span-7 space-y-6">
          <LogoOisans size="hero" showText={true} />
          
          {/* Main Slogan strictly from the Official logo */}
          <div className="border-l-4 border-accent-cyan/80 bg-cyber-black/45 p-4 rounded-r mt-4">
            <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-widest font-bold block mb-1">
              CHARTE D'EXPLOITATION
            </span>
            <h2 className="text-lg md:text-xl font-display font-black text-white tracking-wide uppercase leading-tight">
              VOS IDÉES. NOTRE IA. <span className="text-accent-emerald">20% DES RECETTES POUR VOUS.</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-2 leading-relaxed">
              Oisans Expert IA s'engage par contrat à reverser <span className="text-white font-bold">20% des Recettes Nettes</span> d'abonnements standards catalogue effectivement encaissés, après déduction de la TVA et de toutes les commissions (Stripe, Apple, Google, PayPal) ou remboursements. Si aucun abonnement standard n'est vendu, aucune somme n'est due (« pas de vente, pas de paiement »). Les services de support, conseils, développements spécifiques et maintenances sont exclus.
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Business Margin Simulator */}
        <div className="lg:col-span-5 bg-cyber-black/75 p-5 rounded border border-cyber-gray/80 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyber-gray/30">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-accent-emerald animate-pulse" />
              <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest font-bold">Simulateur Recettes Nettes (20%)</span>
            </div>
            <span className="text-[9px] bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20 px-2 py-0.5 rounded font-mono font-bold uppercase">
              REVENUE LEVEL 1
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                <span>Recettes Nettes Catalogue Estimées de la Solution</span>
                <span className="text-white font-bold">{simulationCapital.toLocaleString('fr-FR')} €</span>
              </div>
              <input 
                id="simulator-revenue-slider"
                type="range"
                min="3000"
                max="100000"
                step="1000"
                value={simulationCapital}
                onChange={(e) => setSimulationCapital(Number(e.target.value))}
                className="w-full accent-accent-emerald bg-cyber-gray/50 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
                <span>3k €</span>
                <span>100k €</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-cyber-gray/20">
              <div className="bg-cyber-deep/80 p-3 rounded border border-cyber-gray/30 text-center">
                <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest">Part d'Oisans (80%)</span>
                <span className="text-base font-display font-semibold text-slate-200 mt-1 block">
                  {Math.round(simulationCapital * 0.8).toLocaleString('fr-FR')} €/m
                </span>
              </div>
              <div className="bg-accent-emerald/5 p-3 rounded border border-accent-emerald/30 text-center shadow-[0_0_12px_rgba(0,255,135,0.05)]">
                <span className="block text-[8px] font-mono text-accent-emerald uppercase tracking-widest font-bold">Votre Part (20%)</span>
                <span className="text-lg font-display font-black text-accent-emerald mt-1 block animate-pulse">
                  {calculateRoyalty(simulationCapital).toLocaleString('fr-FR')} €/m
                </span>
              </div>
            </div>

            <div className="text-[9px] font-mono text-slate-400 leading-relaxed bg-cyber-black p-2.5 rounded border border-cyber-gray/40">
              <span className="text-amber-450 font-bold">📌 NOTE CONTRACTUELLE :</span> Soumettez votre idée de SaaS dans le <span className="text-accent-cyan">Brainstorm & Tri</span>. Une fois le diagnostic Nova qualifié, Mike sélectionne les Finalistes pour l'Arène de vote public.
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
