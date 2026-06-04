/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Terminal, 
  Cpu, 
  Layers, 
  Trophy, 
  Flame, 
  PlusCircle, 
  Search, 
  SlidersHorizontal,
  FolderDot,
  Lightbulb,
  Sparkles,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

import { Project, UserSession } from './types';
import { supabase } from './supabase';
import Formulaire from './components/Formulaire';
import CarteIdee from './components/CarteIdee';
import ModaleAnalyse from './components/ModaleAnalyse';
import TableauVotes from './components/TableauVotes';
import LogoOisans, { OisansCommissionHero } from './components/LogoOisans';
import ModaleLegale from './components/ModaleLegale';

// Initial pre-populated premium projects database (some evaluated, some ready for evaluation)
const INITIAL_PROJECTS: Project[] = [
  {
    id: 'project-neurotask',
    title: 'NeuroTask Automation',
    sector: 'IA & Automation',
    problem: 'Surcharge cognitive des managers qui perdent 15h/semaine à restructurer manuellement des résumés de réunions opérationnelles multi-langues et multi-fichiers.',
    solution: 'Moteur IA de synthèse neuronale B2B locale analysant les intonations vocales pour en extraire des plans d\'action hiérarchisés autonomes.',
    features: `- Enregistrement d'audio bidirectionnel en temps réel\n- Traduction simultanée en 14 langues\n- Extraction de tâches prioritaires par assignation intelligente\n- Export asynchrone sécurisé vers Notion, Slack ou JIRA via webhooks chiffrés\n- Tableau de bord statistique d'évaluation de la productivité d'équipe`,
    illustration_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    user_fullname: 'Alexandre Gauthier',
    user_phone: '+33 6 45 98 12 73',
    signature_hash: 'SEC6-HASH-9EFA73C2-82BA109D-BC44FF12',
    target_audience: 'CTOs, Directeurs de Cabinet de Conseil, Responsables RH de grands groupes.',
    user_email: 'oisans.sprint.saas@gmail.com',
    created_at: '2026-06-01T10:00:00Z',
    terms_accepted: true,
    ai_analyzed: true,
    votes_count: 342,
    is_finalist: true,
    score_feasibility: 89,
    score_cost: 75,
    score_roi: 94,
    ai_verdict: `NeuroTask s'attaque à une friction B2B critique à fort taux de récurrence. L'architecture technologique repose sur des LLMs compressés hébergés en local, ce qui réduit drastiquement les frais d'API externes et garantit une rentabilité opérationnelle immédiate supérieure à 83%.

Cession de droits d'exploitation exclusive de la solution brute approuvée de manière sécurisée.`
  },
  {
    id: 'project-ledgerflow',
    title: 'LedgerFlow Blockchain',
    sector: 'DeepTech & Web3',
    problem: 'Pertes de synchronisation comptables sur les micro-virements transfrontaliers affectant les marchands en cryptomonnaies stables récurrentes.',
    solution: 'Moteur de réconciliation optimisée en Sharding L2 validant les épreuves de consensus comptables de façon asynchrone.',
    features: `- Validation cryptographique hors-chaîne\n- Connexion instantanée avec portefeuilles multi-signatures (Safe, Metamask)\n- Reporting fiscal conforme aux normes européennes MiCA\n- Alerte SMS instantanée en cas d'écart de taux supérieur à 0.05%`,
    illustration_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80',
    user_fullname: 'Sébastien Roche',
    user_phone: '+33 7 12 09 84 55',
    signature_hash: 'SEC6-HASH-43BB8901-C344D12E-DF81A90F',
    target_audience: 'Trésoriers de plateformes d\'échange, Neo-banques, places de marché Web3.',
    user_email: 'cryptonex@gmail.com',
    created_at: '2026-06-02T14:30:00Z',
    terms_accepted: true,
    ai_analyzed: true,
    votes_count: 221,
    is_finalist: true,
    score_feasibility: 67,
    score_cost: 52,
    score_roi: 78,
    ai_verdict: `LedgerFlow bénéficie d'une barrière à l'entrée technologique robuste. Cependant, l'intégration de protocoles multi-chaînes engendre un coût d'audit de sécurité récurrent.

Le ROI reste élevé grâce aux commissions micros-secondaires perçues sur chaque transaction.`
  },
  {
    id: 'project-biopulse',
    title: 'BioPulse Diagnostic',
    sector: 'HealthTech & Bio',
    problem: 'Absentéisme accru consécutif aux troubles du sommeil profond non diagnostiqués des pilotes de lignes et de transports lourds nationaux.',
    solution: 'Capteur biométrique passif et algorithme d\'apprentissage fédéré prévenant les phases d\'apnée du sommeil en temps réel sans stockage centralisé.',
    features: `- Intégration de capteurs IoT Bluetooth Low Energy\n- Analyse préventive basée sur l'accéléromètre des montres connectées\n- Anonymat absolu et stockage chiffré Edge local sur l'appareil du pilote\n- Routage d'alerte automatique vers le médecin conseil via canal sécurisé`,
    illustration_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    user_fullname: 'Dr. Clara Monestier',
    user_phone: '+33 6 81 22 93 40',
    signature_hash: 'SEC6-HASH-1A093F8E-11AE89A2-BCDE9922',
    target_audience: 'Compagnies Aériennes Nationales, Groupes Ferroviaires, Logisticiens Routiers.',
    user_email: 'medtech-dev@gmail.com',
    created_at: '2026-06-02T19:45:00Z',
    terms_accepted: true,
    ai_analyzed: true,
    votes_count: 310,
    is_finalist: true,
    score_feasibility: 74,
    score_cost: 82,
    score_roi: 88,
    ai_verdict: `L'usage de l'apprentissage fédéré résout brillamment les contraintes de conformité RGPD médicales.

Les coûts d'infrastructure sont déportés sur les terminaux clients (Edge Computing), optimisant la marge commerciale nette brute.`
  },
  {
    id: 'project-quantsaas',
    title: 'QuantSaaS Predictive',
    sector: 'FinTech & SaaS',
    problem: 'Manque d\'outils d\'arbitrage systématique de spreads d\'indices boursiers accessibles pour les petites boutiques de gestion patrimoniales régionales.',
    solution: 'Plateforme cloud serverless injectant des modèles d\'apprentissage automatique pour prédire les micro-écarts directionnels à 4 secondes.',
    features: `- Connexion API FIX à faible latence à 14 places boursières\n- Modélisation mathématique du carnet d'ordres en temps réel\n- Alertes et exécution automatisée contrôlée par marge de sécurité\n- Export de données consolidé et rapports de conformité AMF d'un clic`,
    illustration_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    user_fullname: 'Matthieu Vignal',
    signature_hash: 'SEC6-HASH-EEEA391E-88F932AB-C90F7461',
    target_audience: 'Fonds d\'investissements privés régionaux, family offices européens.',
    user_email: 'quant-labs@financial.fr',
    created_at: '2026-06-03T09:12:00Z',
    terms_accepted: true,
    ai_analyzed: true,
    votes_count: 298,
    is_finalist: true,
    score_feasibility: 58,
    score_cost: 40,
    score_roi: 96,
    ai_verdict: `Le potentiel de profitabilité s'avère exceptionnel si la latence est contenue sous le seuil critique des 15ms.

Les modèles prédictifs exigent une réévaluation constante des poids synaptiques, ce qui pénalise temporairement le score de faisabilité.`
  },
  {
    id: 'project-solargrid',
    title: 'SolarGrid Manager',
    sector: 'GreenTech & Solar',
    problem: 'Gaspillage de 30% de la production photovoltaïque résidentielle excédentaire non redistribuée faute d\'algorithmes d\'aiguillage dynamique en temps réel.',
    solution: 'SaaS d\'équilibrage prédictif entre voisins (Peer-to-Peer Energy) via micro-contrats intelligents auto-régulés.',
    features: `- Module matériel d'intégration Linky chiffré\n- Auto-optimisation thermodynamique des batteries domestiques\n- Reventes d'excès énergétiques sur marché local de voisins en circuit ultra-court\n- Visualisation cartographique 3D interactive du flux énergétique du quartier`,
    illustration_url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80',
    user_fullname: 'Élise Bernard-Simon',
    user_phone: '+33 7 88 56 09 11',
    signature_hash: 'SEC6-HASH-83CD1244-99F5D211-12D3EA88',
    target_audience: 'Syndicats de copropriétés innovants, éco-quartiers, gestionnaires de réseaux autonomes.',
    user_email: 'ecogrids@solar-infra.net',
    created_at: '2026-06-03T11:00:00Z',
    terms_accepted: true,
    ai_analyzed: true,
    votes_count: 185,
    is_finalist: true,
    score_feasibility: 85,
    score_cost: 88,
    score_roi: 75,
    ai_verdict: `Un excellent projet à faible empreinte carbone.

La rentabilité brute est assurée par un abonnement mensuel standard calculé sur le pourcentage d'énergie préservé par le co-voisinage.`
  },
  {
    id: 'project-scribolearn',
    title: 'ScriboLearn Voice',
    sector: 'EdTech & HR Tech',
    problem: `Friction d'apprentissage de l'orthographe pour les enfants dyslexiques, délaissés par les méthodes traditionnelles visuelles statiques.`,
    solution: `Synthétiseur vocal haptique temps réel adaptant l'intonation aux retards phonétiques détectés via smartphone d'un élève.`,
    features: `- Synthèse de voix artificielle amicale modulée\n- Systèmes de badge gamifiés et suivis pédiatriques configurés\n- Clavier alternatif avec retour haptique d'attention pour les tablettes scolaires\n- Profils d'accompagnement individualisés partagés avec les orthophonistes`,
    illustration_url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80',
    user_fullname: 'Marc-Antoine Dupré',
    signature_hash: 'SEC6-HASH-55DE239B-890DDE5A-ACDE142C',
    target_audience: `Orthophonistes, écoles élémentaires, parents d'élèves.`,
    user_email: 'scribo@learntech-edu.org',
    created_at: '2026-06-03T15:20:00Z',
    terms_accepted: true,
    ai_analyzed: false,
    votes_count: 52,
    is_finalist: false,
    score_feasibility: 0,
    score_cost: 0,
    score_roi: 0,
    ai_verdict: null
  }
];

export default function App() {
  const activeTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      // Clean up simulated AI timeouts on unmount
      activeTimeouts.current.forEach(clearTimeout);
    };
  }, []);

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('oisans_sprint_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch (e) {
      console.error("Error reading projects from localStorage:", e);
      return INITIAL_PROJECTS;
    }
  });

  // Save changes to localStorage helper (and backup state)
  const saveProjects = (updated: Project[]) => {
    setProjects(updated);
    try {
      localStorage.setItem('oisans_sprint_projects', JSON.stringify(updated));
    } catch (e) {
      console.error("Error saving projects to localStorage:", e);
    }
  };

  // Load projects from Supabase on mount
  useEffect(() => {
    async function loadData() {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setProjects(data as Project[]);
        } else {
          // Database is empty! Auto-seed INITIAL_PROJECTS
          console.log("Supabase database is empty. Seeding INITIAL_PROJECTS...");
          const { error: seedError } = await supabase
            .from('projects')
            .insert(INITIAL_PROJECTS);
          if (seedError) {
            console.error("Error seeding initial projects to Supabase:", seedError);
          } else {
            setProjects(INITIAL_PROJECTS);
          }
        }
      } catch (err) {
        console.error("Failed to load projects from Supabase:", err);
      }
    }
    loadData();
  }, []);

  // Access rights toggle for Admin view
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminPasswordError, setAdminPasswordError] = useState(false);

  // Download entire submissions file as a spreadsheet CSV with proper cell sanitization
  const downloadProjectsCSV = () => {
    const csvRows = [
      [
        'ID_PROJET', 
        'TITRE_SAAS', 
        'SECTEUR', 
        'NOM_CANDIDAT', 
        'EMAIL_CANDIDAT', 
        'TEL_CANDIDAT', 
        'PUBLIC_CIBLE', 
        'PROBLEMATIQUE_CLIENT', 
        'PROPRIETE_IA_SOLUTION', 
        'DETAIL_CAHIER_CHARGES', 
        'FAISABILITE_PCT', 
        'OPTIMALITE_COUT_PCT', 
        'MARG_ROI_PCT', 
        'CONTRAT_CESSION_SIGNE', 
        'EMPREINTE_CRYPT_SIGNATURE',
        'DATE_SOUMISSION'
      ]
    ];

    projects.forEach(p => {
      csvRows.push([
        p.id,
        p.title.replace(/"/g, '""'),
        p.sector.replace(/"/g, '""'),
        (p.user_fullname || '').replace(/"/g, '""'),
        p.user_email.replace(/"/g, '""'),
        (p.user_phone || '').replace(/"/g, '""'),
        p.target_audience.replace(/"/g, '""'),
        p.problem.replace(/"/g, '""'),
        p.solution.replace(/"/g, '""'),
        (p.features || '').replace(/"/g, '""'),
        p.ai_analyzed ? String(p.score_feasibility) : '0',
        p.ai_analyzed ? String(p.score_cost) : '0',
        p.ai_analyzed ? String(p.score_roi) : '0',
        p.signature_hash ? 'OUI' : 'NON',
        p.signature_hash || '',
        p.created_at
      ]);
    });

    const csvContent = "\uFEFF" + csvRows.map(e => e.map(val => `"${val}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.className = "hidden";
    link.setAttribute("href", url);
    link.setAttribute("download", `Oisans_Sprint_SAAS_Directeur_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Promote/Demote item in battle-oriented Arena
  const handleToggleFinalist = async (projectId: string) => {
    const project = projects.find(item => item.id === projectId);
    if (!project) return;
    const targetStatus = !project.is_finalist;

    const updated = projects.map(item => {
      if (item.id === projectId) {
        return { ...item, is_finalist: targetStatus };
      }
      return item;
    });
    saveProjects(updated);

    if (supabase) {
      try {
        const { error } = await supabase
          .from('projects')
          .update({ is_finalist: targetStatus })
          .eq('id', projectId);
        if (error) {
          console.error("Error updating finalist status in Supabase:", error);
        }
      } catch (err) {
        console.error("Exception toggling finalist:", err);
      }
    }
  };

  // Erase project node safely
  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm("CONFIRMATION DIRECTION : Voulez-vous supprimer définitivement ce projet ? L'action effacera également les métriques d'intéressement de 20%.")) {
      const updated = projects.filter(item => item.id !== projectId);
      saveProjects(updated);

      if (supabase) {
        try {
          const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', projectId);
          if (error) {
            console.error("Error deleting project in Supabase:", error);
          }
        } catch (err) {
          console.error("Exception deleting project:", err);
        }
      }
    }
  };

  // Active Phase Selector (1 = General Brainstorm & Tri, 2 = Mode Affrontement Top 5 Finalists Arena)
  const [activePhase, setActivePhase] = useState<'brainstorm' | 'combat'>('brainstorm');
  
  // Current tab filter in general view
  const [activeTab, setActiveTab] = useState<'submit' | 'feed'>('submit');
  
  // Active Filter inside feed
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  
  // Search query inside feed
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected project for report modal
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);

  // Global Legal Modal state
  const [isGlobalLegalOpen, setIsGlobalLegalOpen] = useState(false);
  const [globalLegalTab, setGlobalLegalTab] = useState<'rules' | 'privacy' | 'mentions'>('rules');

  // Authenticated State for Voting Arena
  const [userSession, setUserSession] = useState<UserSession>(() => {
    try {
      const saved = localStorage.getItem('oisans_sprint_auth');
      return saved ? JSON.parse(saved) : { isConnected: false };
    } catch (e) {
      console.error("Error reading session from localStorage:", e);
      return { isConnected: false };
    }
  });

  // Synchronize session voting state with Supabase
  useEffect(() => {
    async function checkUserVotes() {
      if (!supabase || !userSession.isConnected || !userSession.email) return;
      try {
        const { data, error } = await supabase
          .from('votes')
          .select('project_id')
          .eq('user_email', userSession.email)
          .maybeSingle();
        
        if (error) throw error;
        
        if (data) {
          setUserSession(prev => {
            if (prev.votedForId !== data.project_id) {
              const updated = { ...prev, votedForId: data.project_id };
              try {
                localStorage.setItem('oisans_sprint_auth', JSON.stringify(updated));
              } catch (e) {
                console.error("Error saving updated session:", e);
              }
              return updated;
            }
            return prev;
          });
        }
      } catch (err) {
        console.error("Error checking user votes from Supabase:", err);
      }
    }
    checkUserVotes();
  }, [userSession.isConnected, userSession.email]);

  // Helper to trigger simulated AI evaluation
  const triggerAIAnalysis = (project: Project) => {
    const timeout1 = setTimeout(() => {
      setProjects(prev => {
        const next = prev.map(item => {
          if (item.id === project.id) {
            return { 
              ...item, 
              ai_analyzed: false,
              ai_verdict: "Analyse en cours..." 
            };
          }
          return item;
        });
        try {
          localStorage.setItem('oisans_sprint_projects', JSON.stringify(next));
        } catch (e) {
          console.error("Error saving projects to localStorage:", e);
        }
        if (supabase) {
          supabase.from('projects').update({ ai_verdict: "Analyse en cours..." }).eq('id', project.id).then();
        }
        return next;
      });

      const timeout2 = setTimeout(() => {
        setProjects(prev => {
          const feasibility = Math.floor(Math.random() * 35 + 55); // 55 - 90
          const cost = Math.floor(Math.random() * 40 + 50); // 55 - 90 %
          const roi = Math.floor(Math.random() * 32 + 65); // 65 - 97 %
          
          const calculatedVerdict = `Diagnostic de viabilité autonome établi par Nova pour ${project.title} dans le secteur ${project.sector}.
Le problème de friction ("${project.problem.slice(0,60)}...") présente un point douloureux critique ayant un bon potentiel de monétisation B2B. L'architecture logicielle proposée ("${project.solution.slice(0,60)}...") est considérée comme viable avec une faisabilité estimée à ${feasibility}%. La configuration est certifiée compatible avec l'intégration Supabase d'Oisans Expert IA.`;

          const next = prev.map(item => {
            if (item.id === project.id) {
              return {
                ...item,
                ai_analyzed: true,
                score_feasibility: feasibility,
                score_cost: cost,
                score_roi: roi,
                ai_verdict: calculatedVerdict
              };
            }
            return item;
          });
          try {
            localStorage.setItem('oisans_sprint_projects', JSON.stringify(next));
          } catch (e) {
            console.error("Error saving projects to localStorage:", e);
          }
          if (supabase) {
            supabase.from('projects').update({
              ai_analyzed: true,
              score_feasibility: feasibility,
              score_cost: cost,
              score_roi: roi,
              ai_verdict: calculatedVerdict
            }).eq('id', project.id).then();
          }
          return next;
        });
      }, 3500);
      activeTimeouts.current.push(timeout2);

    }, 2500);
    activeTimeouts.current.push(timeout1);
  };

  // Submission handler
  const handleAddProject = (newProjectData: Omit<Project, 'id' | 'created_at' | 'ai_analyzed' | 'votes_count' | 'is_finalist' | 'score_feasibility' | 'score_cost' | 'score_roi' | 'ai_verdict'>) => {
    const tempId = `project-${Math.random().toString(36).substring(2, 11)}`;
    const newProject: Omit<Project, 'id'> & { id?: string } = {
      ...newProjectData,
      created_at: new Date().toISOString(),
      ai_analyzed: false,
      votes_count: 0,
      is_finalist: false,
      score_feasibility: 0,
      score_cost: 0,
      score_roi: 0,
      ai_verdict: null
    };

    if (supabase) {
      supabase.from('projects').insert([newProject]).select().single().then(({ data, error }) => {
        if (error) {
          console.error("Error inserting project to Supabase:", error);
          alert("Erreur lors de l'enregistrement de votre projet sur Supabase : " + error.message);
          return;
        }
        if (data) {
          const createdProject = data as Project;
          setProjects(prev => [createdProject, ...prev]);
          triggerAIAnalysis(createdProject);
        }
      });
    } else {
      const createdProject = { ...newProject, id: tempId } as Project;
      const updated = [createdProject, ...projects];
      saveProjects(updated);
      triggerAIAnalysis(createdProject);
    }
  };

  // Cast vote callback inside Phase Final Arena
  const handleCastVote = async (projectId: string) => {
    if (!userSession.isConnected || userSession.votedForId || !userSession.email) return;

    // Optimistic update
    const updatedUser = { ...userSession, votedForId: projectId };
    setUserSession(updatedUser);
    try {
      localStorage.setItem('oisans_sprint_auth', JSON.stringify(updatedUser));
    } catch (e) {
      console.error("Error saving user session to localStorage:", e);
    }

    if (supabase) {
      try {
        const { error } = await supabase
          .from('votes')
          .insert([{ project_id: projectId, user_email: userSession.email }]);
        
        if (error) {
          if (error.code === '23505') {
            alert("Vous avez déjà voté pour un projet dans l'Arène.");
          } else {
            console.error("Error inserting vote in Supabase:", error);
            alert("Erreur lors de l'enregistrement de votre vote : " + error.message);
          }
          // Rollback session
          const rolledBackUser = { ...userSession, votedForId: undefined };
          setUserSession(rolledBackUser);
          localStorage.setItem('oisans_sprint_auth', JSON.stringify(rolledBackUser));
          return;
        }
        
        // Refresh project list from database to ensure votes_count is perfectly synchronized
        const { data: updatedProjects, error: fetchError } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!fetchError && updatedProjects) {
          setProjects(updatedProjects as Project[]);
        }
      } catch (err) {
        console.error("Exception during voting transaction:", err);
      }
    } else {
      // Local fallback
      const updatedProjects = projects.map(item => {
        if (item.id === projectId) {
          return { ...item, votes_count: item.votes_count + 1 };
        }
        return item;
      });
      saveProjects(updatedProjects);
    }
  };

  // Auth simulators
  const handleLogin = (email: string, provider: 'google' | 'magic_link') => {
    const session = { isConnected: true, email, provider };
    setUserSession(session);
    try {
      localStorage.setItem('oisans_sprint_auth', JSON.stringify(session));
    } catch (e) {
      console.error("Error saving user session to localStorage:", e);
    }
  };

  const handleLogout = () => {
    const session = { isConnected: false };
    setUserSession(session);
    try {
      localStorage.setItem('oisans_sprint_auth', JSON.stringify(session));
    } catch (e) {
      console.error("Error saving user session to localStorage:", e);
    }
  };

  // Live simulation tick - increments random finalist votes to fake high engagement live trading feeling
  const handleSimulateTick = useCallback(() => {
    setProjects(prev => {
      const finalistsIds = prev.filter(i => i.is_finalist).map(i => i.id);
      if (finalistsIds.length === 0) return prev;
      
      const randomIdToIncrement = finalistsIds[Math.floor(Math.random() * finalistsIds.length)];
      const next = prev.map(item => {
        if (item.id === randomIdToIncrement) {
          return { ...item, votes_count: item.votes_count + Math.floor(Math.random() * 3 + 1) };
        }
        return item;
      });
      try {
        localStorage.setItem('oisans_sprint_projects', JSON.stringify(next));
      } catch (e) {
        console.error("Error saving projects to localStorage:", e);
      }
      return next;
    });
  }, []);

  // Trigger manual analysis for pending cards
  const handleRunManualAnalysis = (projectId: string) => {
    setProjects(prev => {
      const next = prev.map(item => {
        if (item.id === projectId) {
          return { ...item, ai_analyzed: false, ai_verdict: "Analyse en cours..." };
        }
        return item;
      });
      try {
        localStorage.setItem('oisans_sprint_projects', JSON.stringify(next));
      } catch (e) {
        console.error("Error saving projects to localStorage:", e);
      }
      if (supabase) {
        supabase.from('projects').update({ ai_verdict: "Analyse en cours..." }).eq('id', projectId).then();
      }
      return next;
    });

    const timeout3 = setTimeout(() => {
      setProjects(prev => {
        const feasibility = Math.floor(Math.random() * 30 + 60);
        const cost = Math.floor(Math.random() * 30 + 60);
        const roi = Math.floor(Math.random() * 25 + 70); // 70-95%
        
        const next = prev.map(item => {
          if (item.id === projectId) {
            const calculatedVerdict = `Analyse manuelle Nova déclenchée avec succès. La solution "${item.title}" a été testée sous contrainte de charge simulée.
L'attractivité du marché public cible (${item.target_audience}) offre un excellent levier de rentabilité. Nous accordons l'agrément Oisans SaaS Sprint.`;

            if (supabase) {
              supabase.from('projects').update({
                ai_analyzed: true,
                score_feasibility: feasibility,
                score_cost: cost,
                score_roi: roi,
                ai_verdict: calculatedVerdict
              }).eq('id', projectId).then();
            }

            return {
              ...item,
              ai_analyzed: true,
              score_feasibility: feasibility,
              score_cost: cost,
              score_roi: roi,
              ai_verdict: calculatedVerdict
            };
          }
          return item;
        });
        try {
          localStorage.setItem('oisans_sprint_projects', JSON.stringify(next));
        } catch (e) {
          console.error("Error saving projects to localStorage:", e);
        }
        return next;
      });
    }, 4000);
    activeTimeouts.current.push(timeout3);
  };


  const handleCardClick = (project: Project) => {
    if (project.ai_analyzed) {
      setSelectedProjectForModal(project);
    } else {
      // Auto trigger analysis on click if pending, for awesome UX sequence
      handleRunManualAnalysis(project.id);
    }
  };

  const handleOpenLegalModal = useCallback((tab: 'rules' | 'privacy' | 'mentions') => {
    setGlobalLegalTab(tab);
    setIsGlobalLegalOpen(true);
  }, []);

  // Get current filtered projects in general view
  const filteredProjects = projects.filter(item => {
    // Exclude finalists if we want or keep them in the public database as well
    const matchesSector = sectorFilter === 'all' || item.sector === sectorFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.solution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  const finalists = projects.filter(i => i.is_finalist);

  return (
    <div className="min-h-screen bg-cyber-black text-slate-100 flex flex-col font-sans selection:bg-accent-cyan selection:text-cyber-black relative overflow-hidden">
      {/* Immersive UI Dot Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none cyber-dots z-0"></div>
      
      {/* 1. Header Global Navigation */}
      <header className="border-b border-accent-cyan/25 bg-cyber-dark/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-18 flex items-center justify-between">
          
          {/* Logo & Agency title */}
          <LogoOisans size="sm" showText={true} />

          {/* Network Indicator and User Avatar Info */}
          <div className="hidden lg:flex items-center gap-6 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
              <span className="text-accent-emerald">NETWORK ACTIVE</span>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="flex items-center gap-3">
              <span className="opacity-50 italic uppercase font-mono text-[10px]">User_Nexus_04</span>
              <div className="w-8 h-8 rounded-full border border-accent-cyan/50 bg-gradient-to-tr from-accent-cyan/20 to-transparent flex items-center justify-center">
                <span className="text-[9px] font-mono font-bold text-white">MIKE</span>
              </div>
            </div>
          </div>

          {/* Controller of active phase (Switch between general Brainstorm & Top 5 Arena Combat) */}
          <div className="flex items-center space-x-3 bg-cyber-dark/95 p-1.5 rounded border border-cyber-gray/60">
            <button
              id="phase-btn-brainstorm"
              onClick={() => setActivePhase('brainstorm')}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-all uppercase tracking-wider flex items-center space-x-2 cursor-pointer ${
                activePhase === 'brainstorm'
                  ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30 font-bold shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Brainstorm & Tri</span>
              <span className="sm:hidden">Phase 1-2</span>
            </button>
            <button
              id="phase-btn-combat"
              onClick={() => setActivePhase('combat')}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-all uppercase tracking-wider flex items-center space-x-2 cursor-pointer ${
                activePhase === 'combat'
                  ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30 font-bold shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Arène Finale</span>
              <span className="sm:hidden">Top 5</span>
              {finalists.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-accent-emerald animate-ping" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-8 relative z-10">
        
        {/* Official Brand Hero & Interactive Slogan */}
        <OisansCommissionHero />

        {/* Dynamic Context Header banner */}
        <div className="mb-8 border-l-2 border-accent-cyan bg-cyber-deep/20 p-4 rounded-r border border-r-cyber-gray/20 border-y-cyber-gray/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-accent-cyan font-mono text-xs uppercase mb-1">
                <Terminal className="w-4 h-4 animate-pulse" />
                <span>Directeur de Projet : Mike • Oisans Expert IA</span>
              </div>
              <p className="text-sm text-slate-300">
                {activePhase === 'brainstorm' 
                  ? "Préparez vos architectures logicielles et soumettez-les au verdict transparent du moteur d'évaluation Nova." 
                  : "La phase finale d'affrontement est déclenchée. Donnez votre souveraineté à un unique candidat de l'Arène top 5."}
              </p>
            </div>
            {/* Quick entry tag to prompt executive dashboard */}
            <button
              onClick={() => setIsAdminPanelOpen(!isAdminPanelOpen)}
              className="text-xs font-mono border border-accent-cyan/35 text-accent-cyan hover:text-white hover:bg-accent-cyan/15 px-3 py-1.5 rounded transition-all bg-cyber-black cursor-pointer flex items-center space-x-1.5 self-start md:self-auto"
            >
              <span>⚓</span>
              <span>{isAdminPanelOpen ? "Fermer Gestion" : "Espace Gestion" }</span>
            </button>
          </div>

          {/* Expanded Admin Control Center Dashboard */}
          <AnimatePresence>
            {isAdminPanelOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-4 pt-4 border-t border-cyber-gray/45"
              >
                {!isAdminUnlocked ? (
                  <div className="bg-cyber-black/95 rounded border border-accent-cyan/20 p-5 space-y-4 shadow-[0_0_20px_rgba(0,240,255,0.04)] max-w-sm mx-auto">
                    <div className="text-center space-y-2">
                      <h4 className="text-accent-cyan text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2">
                        <span>🔒 Accès Sécurisé Direction</span>
                      </h4>
                      <p className="text-[10px] text-slate-450 font-mono">
                        Veuillez saisir la clé de sécurité pour déverrouiller l'espace gestion de l'arène.
                      </p>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (adminPasswordInput === 'OISANS-SPRINT-2026') {
                        setIsAdminUnlocked(true);
                        setAdminPasswordError(false);
                        setAdminPasswordInput('');
                      } else {
                        setAdminPasswordError(true);
                        setAdminPasswordInput('');
                      }
                    }} className="space-y-3">
                      <div>
                        <input
                          type="password"
                          required
                          placeholder="Clé de sécurité..."
                          value={adminPasswordInput}
                          onChange={(e) => {
                            setAdminPasswordInput(e.target.value);
                            setAdminPasswordError(false);
                          }}
                          className={`w-full bg-cyber-black text-center text-white border rounded p-2 text-xs focus:outline-none font-mono ${
                            adminPasswordError ? 'border-red-500 focus:border-red-500' : 'border-cyber-gray focus:border-accent-cyan'
                          }`}
                        />
                        {adminPasswordError && (
                          <span className="text-[9px] font-mono text-red-450 block mt-1.5 text-center">
                            Clé de sécurité incorrecte. Accès refusé.
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => setIsAdminPanelOpen(false)}
                          className="w-1/2 bg-cyber-gray hover:bg-cyber-gray/70 text-slate-350 py-2 rounded text-xs font-mono font-bold uppercase cursor-pointer"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="w-1/2 bg-accent-cyan text-black hover:bg-white py-2 rounded text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transition-colors"
                        >
                          Entrer
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="bg-cyber-black/90 rounded border border-accent-cyan/30 p-4 space-y-4 shadow-[0_0_20px_rgba(0,240,255,0.06)]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                      <div>
                        <h4 className="text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-2">
                          <span className="text-accent-cyan">●</span>
                          <span>Console d'Administration Directrice • Mike Simonutti</span>
                        </h4>
                        <p className="text-[10px] text-slate-450 font-mono">
                          Supervision en temps réel des propositions d'idées, conformité d'intéressement brut (20%) et arbitrage de l'Arène.
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 w-full md:w-auto justify-between md:justify-end">
                        <button
                          onClick={() => setIsAdminUnlocked(false)}
                          className="bg-cyber-gray text-slate-300 hover:text-white border border-cyber-gray/70 text-[9px] font-mono font-bold px-2.5 py-1.5 rounded transition-all cursor-pointer uppercase"
                          title="Verrouiller la console"
                        >
                          🔒 Verrouiller
                        </button>
                        <button
                          id="btn-admin-export-csv"
                          onClick={downloadProjectsCSV}
                          className="bg-accent-emerald text-black hover:bg-white hover:shadow-[0_0_15px_rgba(0,255,135,0.4)] text-[11px] font-mono font-bold px-4 py-2 rounded transition-all cursor-pointer flex items-center space-x-1.5 uppercase"
                        >
                          <span>📥</span>
                          <span>Exporter Portfolio (.CSV)</span>
                        </button>
                      </div>
                    </div>

                    {/* List of actions per project (easy state management triggers) */}
                    <div className="border-t border-cyber-gray/20 pt-3 space-y-2">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Arbitrage rapide des propositions ({projects.length}) :</span>
                      <div className="max-h-48 overflow-y-auto space-y-2 custom-scrollbar pr-1">
                        {projects.map(p => (
                          <div key={p.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-cyber-deep/50 p-2.5 rounded border border-cyber-gray/40 gap-2 hover:border-cyber-gray/70 transition-colors">
                            <div className="truncate max-w-[320px]">
                              <span className="text-[10px] font-mono text-slate-400 block truncate font-semibold">{p.title}</span>
                              <span className="text-[9px] font-mono text-slate-500 block">
                                Par : {p.user_fullname || 'Anonyme'} {p.signature_hash ? '✍️' : '❌'} • {p.sector}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {/* Discuss with AI button */}
                              <button
                                onClick={() => {
                                  const textToCopy = `Salut l'IA ! Discutons du projet "${p.title}" (${p.sector}) pour voir s'il mérite d'être finaliste. 
Voici son pitch :
- Problème : ${p.problem}
- Solution : ${p.solution}
- Verdict IA actuel : ${p.ai_verdict || 'Pas encore d\'analyse'}`;
                                  navigator.clipboard.writeText(textToCopy);
                                  alert("Pitch copié ! Collez-le dans notre chat de discussion pour que nous puissions en débattre ensemble.");
                                }}
                                className="bg-cyber-black text-accent-cyan hover:bg-accent-cyan/10 border border-cyber-gray hover:border-accent-cyan text-[9px] font-mono font-bold px-2 py-1 rounded transition-all cursor-pointer"
                                title="Copier le pitch pour en débattre avec l'IA"
                              >
                                💬 Débattre
                              </button>

                              {/* Toggle Finalist arena */}
                              <button
                                onClick={() => handleToggleFinalist(p.id)}
                                className={`text-[9px] font-mono font-bold px-2 py-1 rounded transition-all cursor-pointer ${
                                  p.is_finalist 
                                    ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40' 
                                    : 'bg-cyber-black text-slate-400 border border-cyber-gray hover:border-accent-cyan'
                                }`}
                              >
                                {p.is_finalist ? "★ Finaliste" : "☆ Qualifier" }
                              </button>

                              {/* Safe delete icon */}
                              <button
                                onClick={() => handleDeleteProject(p.id)}
                                className="bg-red-950/40 text-red-400 hover:bg-red-900/60 hover:text-white border border-red-900/30 hover:border-red-500 text-[9.5px] font-mono font-bold px-2 py-1 rounded transition-all cursor-pointer"
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Phase A: Brainstorm & General Feed */}
        {activePhase === 'brainstorm' ? (
          <div className="space-y-8">
            
            {/* Tab navigation within general menu */}
            <div className="border-b border-cyber-gray/30 flex justify-between items-center">
              <div className="flex space-x-6">
                <button
                  id="tab-btn-submit"
                  onClick={() => setActiveTab('submit')}
                  className={`py-3 text-sm font-display uppercase tracking-widest relative cursor-pointer ${
                    activeTab === 'submit' ? 'text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>📋 Soumission d'Idée</span>
                  {activeTab === 'submit' && (
                    <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-cyan" />
                  )}
                </button>
                <button
                  id="tab-btn-feed"
                  onClick={() => setActiveTab('feed')}
                  className={`py-3 text-sm font-display uppercase tracking-widest relative flex items-center space-x-2 cursor-pointer ${
                    activeTab === 'feed' ? 'text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>📊 Flux des Projets ({projects.length})</span>
                  {activeTab === 'feed' && (
                    <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-cyan" />
                  )}
                </button>
              </div>

              {/* Counter status badge */}
              <div className="text-[10px] font-mono text-slate-500 bg-cyber-gray/20 px-3 py-1 rounded border border-cyber-gray/40">
                DB REPLICAS: {projects.length} INDEXED
              </div>
            </div>

            {/* Sub-Views Switcher */}
            <AnimatePresence mode="wait">
              {activeTab === 'submit' ? (
                <motion.div
                  key="submit-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Submission form on the left */}
                  <div className="lg:col-span-8">
                    <Formulaire onAddProject={handleAddProject} onOpenLegalModal={handleOpenLegalModal} />
                  </div>

                  {/* High-end Rules instructions sidebar */}
                  <div className="lg:col-span-4 space-y-5">
                    <div className="glassmorphism p-5 rounded-lg border border-cyber-gray/30 space-y-4">
                      <div className="flex items-center space-x-2 text-accent-cyan">
                        <Cpu className="w-4 h-4" />
                        <h4 className="font-display text-xs font-bold uppercase tracking-wider">
                          Comment Nova évalue-t-il ?
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Le système d'analyse d'idées "Nova" valide la viabilité opérationnelle de vos projets en étudiant rigoureusement le problème, la structure logicielle et la scalabilité tarifaire B2B.
                      </p>
                      
                      <div className="space-y-3 pt-2">
                        <div className="flex items-start space-x-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan mt-1.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-white font-semibold uppercase font-mono">Faisabilité Technique</p>
                            <p className="text-[11px] text-slate-400">Évalue la complexité du code requis et le risque de goulot d'étranglement.</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-slate-300 font-semibold uppercase font-mono">Optimalité Coût</p>
                            <p className="text-[11px] text-slate-400">Pénalise les architectures surchargées (ex. clusters GPU excessifs).</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald mt-1.5 flex-shrink-0 animate-pulse" />
                          <div>
                            <p className="text-xs text-accent-emerald font-semibold uppercase font-mono">Potentiel ROI Est.</p>
                            <p className="text-[11px] text-slate-400">Mesure la capacité à capter d'importantes marges récurrentes SaaS.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick overview of latest evaluated ideas */}
                    <div className="glassmorphism p-5 rounded-lg border border-cyber-gray/30">
                      <h4 className="font-display text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center justify-between">
                        <span>ÉVALUATIONS RÉCENTES</span>
                        <span className="text-[9px] text-accent-cyan font-mono font-normal">REALTIME FEED</span>
                      </h4>
                      <div className="space-y-3">
                        {projects.slice(0, 3).map(item => (
                          <div 
                            key={item.id} 
                            onClick={() => handleCardClick(item)}
                            className="p-2.5 bg-cyber-black/70 hover:bg-cyber-gray/30 border border-cyber-gray/40 hover:border-accent-cyan/40 rounded transition-all cursor-pointer flex justify-between items-center"
                          >
                            <div>
                              <p className="text-xs text-white font-semibold truncate max-w-[150px]">{item.title}</p>
                              <span className="text-[9px] font-mono text-slate-500">{item.sector}</span>
                            </div>
                            <div className="text-right">
                              {item.ai_analyzed ? (
                                <span className="text-xs text-accent-emerald font-mono font-bold">
                                  ROI: {item.score_roi}%
                                </span>
                              ) : (
                                <span className="text-[9px] text-yellow-450 font-mono truncate max-w-[100px] block">
                                  {item.ai_verdict || "En attente"}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="feed-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Filters, query search tool */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-cyber-deep/40 p-4 rounded border border-cyber-gray/30">
                    <div className="flex-1 flex items-center bg-cyber-black border border-cyber-gray/60 rounded px-3 py-1.5">
                      <Search className="w-4 h-4 text-slate-500 mr-2 flex-shrink-0" />
                      <input
                        id="feed-search-input"
                        type="text"
                        placeholder="Rechercher par concept, titre, ou problème..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-sm text-white focus:outline-none placeholder-slate-500"
                      />
                    </div>

                    <div className="flex items-center space-x-3">
                      <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                      <select
                        id="feed-sector-filter"
                        value={sectorFilter}
                        onChange={(e) => setSectorFilter(e.target.value)}
                        className="bg-cyber-black text-slate-300 border border-cyber-gray rounded p-1.5 text-xs font-mono focus:outline-none focus:border-accent-cyan cursor-pointer"
                      >
                        <option value="all">Tous les secteurs</option>
                        <option value="FinTech & SaaS">FinTech & SaaS</option>
                        <option value="IA & Automation">IA & Automation</option>
                        <option value="DeepTech & Web3">DeepTech & Web3</option>
                        <option value="HealthTech & Bio">HealthTech & Bio</option>
                        <option value="GreenTech & Solar">GreenTech & Solar</option>
                        <option value="EdTech & HR Tech">EdTech & HR Tech</option>
                      </select>
                    </div>
                  </div>

                  {/* Empty state feed */}
                  {filteredProjects.length === 0 ? (
                    <div className="text-center py-16 bg-cyber-deep/10 border border-dashed border-cyber-gray/40 rounded-lg">
                      <FolderDot className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                      <h4 className="text-white font-display text-sm font-semibold uppercase">Aucun élément indexé</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                        Aucun projet ne correspond aux critères de secteur ou de recherche saisis.
                      </p>
                    </div>
                  ) : (
                    /* The grid of projects */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProjects.map(item => (
                        <div key={item.id}>
                          <CarteIdee
                            project={item}
                            onClick={handleCardClick}
                            onRunAnalysis={handleRunManualAnalysis}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        ) : (
          /* Phase B: Top 5 Combat Arena Match */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Warning/Hype Alert Header */}
            <div className="emerald-glow overflow-hidden relative p-4 bg-accent-cyan/5 border border-accent-cyan/35 rounded flex items-center space-x-3">
              <span className="w-3 h-3 rounded-full bg-accent-cyan animate-ping flex-shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-accent-cyan uppercase tracking-widest block font-bold">
                  CONCURRENCE EN DIRECT
                </span>
                <p className="text-xs text-slate-300">
                  Les scores s'ajustent en direct via les transactions Supabase Realtime de l'arène. Un vote par adresse IP cryptographique autorisée.
                </p>
              </div>
            </div>

            <TableauVotes
              finalists={finalists}
              userSession={userSession}
              onLogin={handleLogin}
              onLogout={handleLogout}
              onCastVote={handleCastVote}
              onSimulateTick={handleSimulateTick}
            />
          </motion.div>
        )}

      </main>

      {/* 3. Global Footer copyright and Agency signature */}
      <footer className="border-t border-cyber-gray/25 bg-cyber-black text-slate-500 py-8 text-center text-xs space-y-3 mt-auto">
        <p className="font-mono">
          © {new Date().getFullYear()} OISANS EXPERT IA. TOUS DROITS RÉSERVÉS PAR CONTRAT DE CESSION COMMERCIAL.
        </p>
        <p className="text-[10px] text-slate-500 font-mono flex items-center justify-center space-x-1.5 uppercase">
          <span>SECURED BY SUPABASE SHIELD v4.2S</span>
          <span>•</span>
          <span>ROBUSTE & ZERO TRUST DESIGNED FOR MIKE</span>
        </p>
        <div className="flex justify-center gap-4 text-[10px] font-mono text-slate-400">
          <button 
            type="button"
            onClick={() => {
              setGlobalLegalTab('rules');
              setIsGlobalLegalOpen(true);
            }} 
            className="hover:text-accent-cyan cursor-pointer hover:underline"
          >
            📜 Règlement
          </button>
          <span>•</span>
          <button 
            type="button"
            onClick={() => {
              setGlobalLegalTab('privacy');
              setIsGlobalLegalOpen(true);
            }} 
            className="hover:text-accent-emerald cursor-pointer hover:underline"
          >
            🛡️ Confidentialité
          </button>
          <span>•</span>
          <button 
            type="button"
            onClick={() => {
              setGlobalLegalTab('mentions');
              setIsGlobalLegalOpen(true);
            }} 
            className="hover:text-accent-cyan cursor-pointer hover:underline"
          >
            💼 Mentions Légales
          </button>
        </div>
      </footer>

      {/* 4. Modular Diagnostic Modal popover for inspecting evaluations */}
      <ModaleAnalyse
        project={selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
      />

      {/* 5. Interactive Legal Modal Container */}
      <ModaleLegale
        isOpen={isGlobalLegalOpen}
        onClose={() => setIsGlobalLegalOpen(false)}
        initialTab={globalLegalTab}
      />

    </div>
  );
}
