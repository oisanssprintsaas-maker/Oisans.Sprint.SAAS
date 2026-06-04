import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Scale, ShieldCheck, HelpCircle } from 'lucide-react';

interface ModaleLegaleProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'rules' | 'privacy' | 'mentions';
}

export default function ModaleLegale({ isOpen, onClose, initialTab = 'rules' }: ModaleLegaleProps) {
  const [activeTab, setActiveTab] = useState<'rules' | 'privacy' | 'mentions'>(initialTab);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id="modal-legal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto w-full h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative bg-cyber-black/95 border border-cyber-gray/80 rounded shadow-[0_0_50px_rgba(0,171,255,0.15)] max-w-4xl w-full flex flex-col h-[85vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-cyber-gray/40 bg-cyber-deep/80 relative">
            <div className="flex items-center space-x-3">
              <div className="p-1.5 bg-accent-cyan/10 rounded border border-accent-cyan/30">
                <Scale className="w-5 h-5 text-accent-cyan" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">
                  Documentation Juridique Officielle
                </h3>
                <p className="text-[9px] font-mono text-slate-400">
                  Oisans Expert IA • Validité légale et contrats au 01/07/2026
                </p>
              </div>
            </div>

            <button
              id="btn-close-legal"
              onClick={onClose}
              className="p-1.5 rounded-full border border-cyber-gray bg-cyber-black text-slate-400 hover:text-white hover:border-accent-cyan transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Selection */}
          <div className="flex border-b border-cyber-gray/20 bg-cyber-black/50 overflow-x-auto">
            <button
              onClick={() => setActiveTab('rules')}
              className={`flex-1 py-3 px-4 font-mono text-xs uppercase tracking-wider border-b-2 transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === 'rules'
                  ? 'border-accent-cyan text-white font-bold bg-accent-cyan/5'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-cyber-gray/10'
              }`}
            >
              📜 Règlement Officiel
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 py-3 px-4 font-mono text-xs uppercase tracking-wider border-b-2 transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === 'privacy'
                  ? 'border-accent-emerald text-white font-bold bg-accent-emerald/5'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-cyber-gray/10'
              }`}
            >
              🛡️ Politique de Confidentialité
            </button>
            <button
              onClick={() => setActiveTab('mentions')}
              className={`flex-1 py-3 px-4 font-mono text-xs uppercase tracking-wider border-b-2 transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === 'mentions'
                  ? 'border-accent-cyan text-white font-bold bg-accent-cyan/5'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-cyber-gray/10'
              }`}
            >
              💼 Mentions Légales
            </button>
          </div>

          {/* Content Body Scrollable Container */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto custom-scrollbar bg-cyber-deep/20 text-slate-300 font-mono text-xs leading-relaxed space-y-6 select-text">
            {activeTab === 'rules' && (
              <div className="space-y-4">
                <div className="bg-cyber-black/80 p-4 border border-cyber-gray/50 rounded flex justify-between items-center mb-6">
                  <div>
                    <span className="text-[9px] text-accent-cyan font-bold block uppercase tracking-widest">RÈGLEMENT DE CONCOURS</span>
                    <h4 className="text-base font-display font-black text-white uppercase mt-1">« OISANS SPRINT SAAS »</h4>
                  </div>
                  <span className="text-[10px] border border-accent-cyan/30 text-accent-cyan px-2.5 py-1 rounded bg-accent-cyan/5">
                    Version 01/07/2026
                  </span>
                </div>

                <div className="prose prose-invert max-w-none text-slate-300 font-mono text-xs space-y-4">
                  <p className="font-bold text-white">ARTICLE 1 – ORGANISATEUR</p>
                  <p>
                    Le concours dénommé « Oisans Sprint SAAS » (ci-après le « Concours ») est organisé par Oisans Expert IA, entreprise individuelle exploitée par Monsieur Simonutti Michael, immatriculée sous le numéro SIRET 839 532 835 00015, dont le siège est situé au 742 rue du Paradis, 38520 Le Bourg-d'Oisans, France (ci-après l’« Organisateur »).
                  </p>
                  <p>L’Organisateur est joignable à l’adresse électronique suivante : <span className="text-accent-cyan">oisans.sprint.saas@gmail.com</span></p>
                  <p>Le présent règlement définit les modalités de participation, de sélection, de vote, d’attribution de la récompense ainsi que les droits et obligations des participants.</p>

                  <p className="font-bold text-white pt-2">ARTICLE 2 – OBJET DU CONCOURS</p>
                  <p>
                    Le Concours a pour objet d’identifier des idées innovantes d’applications numériques, logiciels, plateformes web, outils SaaS (Software as a Service), solutions digitales ou services numériques susceptibles d’apporter une utilité concrète à des particuliers, professionnels, associations ou entreprises.
                  </p>
                  <p>Les participants sont invités à soumettre une proposition détaillée décrivant une problématique, une solution envisagée et les principales fonctionnalités du projet.</p>
                  <p>L’Organisateur se réserve l’entière liberté de déterminer les modalités techniques de développement, de commercialisation, de diffusion et d’exploitation de toute solution issue du Concours.</p>

                  <p className="font-bold text-white pt-2">ARTICLE 3 – ACCEPTATION DU RÈGLEMENT</p>
                  <p>
                    La participation au Concours implique l’acceptation pleine, entière, irrévocable et sans réserve du présent règlement. Tout participant reconnaît avoir pris connaissance du présent règlement avant toute soumission d’idée. Le refus d’une seule des dispositions du présent règlement rend impossible toute participation.
                  </p>

                  <p className="font-bold text-white pt-2">ARTICLE 4 – CONDITIONS DE PARTICIPATION</p>
                  <p>Le Concours est gratuit et sans obligation d’achat. La participation est ouverte à toute personne physique majeure disposant de sa pleine capacité juridique à la date de participation.</p>
                  <p>Sont exclus : les mineurs ; les personnes agissant sous une fausse identité ; les fraudeurs ; ou les collaborateurs directs.</p>

                  <p className="font-bold text-white pt-2">ARTICLE 5 – CALENDRIER</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Ouverture des participations : <span className="text-white">01 juillet 2026 à 00h00</span></li>
                    <li>Clôture des participations : <span className="text-white">31 août 2026 à 23h59</span></li>
                    <li>Analyse et présélection : <span className="text-white">du 01 septembre 2026 au 07 septembre 2026</span></li>
                    <li>Votes publics : <span className="text-white">du mardi 08 septembre 2026 au mardi 15 septembre 2026 à 23h59</span></li>
                    <li>Annonce du gagnant : <span className="text-white">mercredi 16 septembre 2026 à 18h00</span></li>
                  </ul>

                  <p className="font-bold text-white pt-2">ARTICLE 6 – MODALITÉS DE PARTICIPATION</p>
                  <p>Les participants soumettent leur projet via le site officiel du Concours. La candidature comprend : un titre, la description du besoin, la description fonctionnelle, le public cible.</p>

                  <p className="font-bold text-white pt-2">ARTICLE 7 – PROCESSUS DE SÉLECTION</p>
                  <p>La sélection se déroule en deux étapes :</p>
                  <p><strong>7.1 Première phase : analyse assistée par intelligence artificielle.</strong> Les candidatures sont analysées par un système d’intelligence artificielle "Nova" (faisabilité, coût d'infra, ROI). Cinq finalistes sont retenus.</p>
                  <p><strong>7.2 Deuxième phase : vote du public.</strong> Les projets finalistes sont soumis au vote de la communauté. L'IP et l'email servent de contrôle de duplication.</p>

                  <p className="font-bold text-white pt-2">ARTICLE 8 – DÉSIGNATION DU GAGNANT</p>
                             <p className="font-bold text-white pt-2 text-accent-cyan">ARTICLE 9 – PROPRIÉTÉ INTELLECTUELLE ET LICENCE D’EXPLOITATION</p>
                  <p><strong>9.1 Propriété exclusive des créations de l'Organisateur :</strong></p>
                  <p>
                    Le participant reconnaît que l'application finale, ses développements, son code source, son architecture logicielle, sa documentation, ses évolutions, ses versions futures, ses interfaces et l'ensemble des éléments réalisés par l'Organisateur constituent des créations distinctes développées sous la responsabilité exclusive de l'Organisateur et dont ce dernier demeure seul titulaire des droits de propriété intellectuelle.
                  </p>
                  
                  <p><strong>9.2 Licence exclusive et irrévocable dès la participation :</strong></p>
                  <p>
                    Dès la validation de sa candidature, le participant accorde à l'Organisateur une licence exclusive, mondiale, irrévocable, transférable et gratuite lui permettant d'étudier, reproduire, analyser, adapter, modifier, développer et exploiter les éléments transmis dans le cadre du concours.
                  </p>

                  <p><strong>9.3 Clause de développement indépendant :</strong></p>
                  <p>
                    Le participant reconnaît que l'Organisateur peut déjà développer, avoir développé ou développer ultérieurement des solutions présentant des caractéristiques identiques, similaires ou concurrentes sans que cela puisse constituer une violation des droits du participant.
                  </p>

                  <p><strong>9.4 Renonciation irrévocable aux recours :</strong></p>
                  <p>
                    Le participant renonce irrévocablement à toute action, demande, contestation, réclamation ou procédure fondée sur l'utilisation, l'adaptation, l'amélioration, la transformation ou l'exploitation d'une idée, d'un concept, d'une fonctionnalité ou d'un projet similaire par l'Organisateur.
                  </p>

                  <p><strong>9.5 Absence d'obligation de développer et liberté commerciale :</strong></p>
                  <p>
                    L'Organisateur demeure entièrement libre de développer ou non le projet sélectionné. Le choix du projet gagnant ne crée aucune obligation de développement, de commercialisation, de maintenance ou de mise sur le marché. De même, l'Organisateur n'assume aucune obligation de résultat économique, commercial ou financier concernant le projet sélectionné.
                  </p>

                  <p className="font-bold text-white pt-2 text-accent-emerald">ARTICLE 10 – DOTATION ET INTÉRESSEMENT (LES 20% NETS BRUTS)</p>
                  <p>
                    La récompense du gagnant consiste exclusivement en une rétrocession contractuelle variable correspondant à <span className="text-accent-emerald font-bold">20% des Recettes Nettes</span> issues des abonnements standards catalogue de la solution logicielle gagnante pendant douze (12) mois consécutifs.
                  </p>
                  <p><strong>10.1 Clause d'absence de vente et non-paiement :</strong></p>
                  <p>
                    La rémunération du gagnant est exclusivement conditionnée à l'encaissement effectif de Recettes Nettes. En l'absence de Recettes Nettes encaissées, aucune somme ne sera due. Le participant accepte expressément le principe fondamental suivant : « Aucune vente = aucune rémunération ».
                  </p>

                  <p className="font-bold text-white pt-2">ARTICLE 11 – DÉFINITION DES RECETTES NETTES & EXCLUSIONS COMMERCIALES</p>
                  <p><strong>11.1 Assiette de calcul :</strong></p>
                  <p>Les Recettes Nettes correspondent exclusivement aux sommes effectivement encaissées par l’Organisateur au titre des abonnements standards catalogue de l'application gagnante. Sont déduits préalablement : la TVA, les commissions Stripe, les commissions PayPal, les commissions Apple, les commissions Google, les commissions de toutes autres plateformes de paiement tiers, les remboursements clients, les annulations de paiement et les rétrofacturations (chargebacks).</p>
                  
                  <p><strong>11.2 Exclusions de périmètres définitives :</strong></p>
                  <p>Sont exclus de manière définitive et irrévocable de l'intéressement de 20% :</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
                    <li>La maintenance corrective, préventive et évolutive ;</li>
                    <li>Le support client standard et premium ;</li>
                    <li>Les prestations de conseil, d'audit ou d'accompagnement ;</li>
                    <li>Le paramétrage, la personnalisation, l'intégration ou la migration de données ;</li>
                    <li>Les prestations de formation ;</li>
                    <li>Les licences d'outils spécifiques ou d'infrastructures cloud tierces ;</li>
                    <li>Les prestations réalisées sur-mesure ou développements spécifiques exécutés pour un client déterminé ;</li>
                    <li>Les évolutions fonctionnelles et modules additionnels hors catalogue de base.</li>
                  </ul>

                  <p className="font-bold text-white pt-2">ARTICLE 12 – AUTONOMIE ET NATURE DES CONVENTIONS</p>
                  <p><strong>12.1 Clause anti-associé :</strong></p>
                  <p>
                    La participation au concours ne confère aucun droit d'actionnariat, d'association, de copropriété intellectuelle, de partenariat commercial, de cogérance ou de contrôle sur l'activité d'Oisans Expert IA ou de son exploitation.
                  </p>
                  <p><strong>12.2 Clause anti-salarié :</strong></p>
                  <p>
                    La participation au concours ne crée aucun contrat de travail, mandat social, mission, relation de sous-traitance ou lien de subordination quelconque entre le participant et l'Organisateur.
                  </p>
                  <p><strong>12.3 Clause de limitation de responsabilité :</strong></p>
                  <p>
                    La responsabilité totale de l'Organisateur, toutes causes confondues, ne pourra excéder le montant effectivement versé au participant au titre du présent concours.
                  </p>

                  <p className="font-bold text-white pt-2">ARTICLE 13 – CONTRÔLE ANTI-FRAUDE & PREUVE ÉLECTRONIQUE</p>
                  <p><strong>13.1 Preuve électronique et hachage cryptographique :</strong></p>
                  <p>
                    Lors de la validation de sa candidature ou de son vote, le système enregistre : l'adresse IP de l'utilisateur, la date, l'heure standard UTC, la version du règlement acceptée et génère une empreinte hachée unique (signature hash). Ces éléments font foi et constituent un commencement de preuve électronique de l'acceptation du règlement et des engagements contractuels du participant.
                  </p>
                  <p><strong>13.2 Clause anti-fraude renforcée :</strong></p>
                  <p>
                    L'Organisateur peut supprimer, suspendre, invalider ou annuler tout vote ou participation lorsqu'il existe des indices raisonnables de fraude ou de tentative de triche automatisée, sans être tenu de révéler ses méthodes de détection interne ni de démontrer intégralement le procédé d'audit employé.
                  </p>
                  <p className="font-bold text-white pt-2">ARTICLE 14 – DURÉE DE LA RÉMUNÉRATION</p>
                  <p>La rémunération est versée mensuellement. Le droit à rémunération est limité à douze (12) mois consécutifs à compter de la première vente commerciale effective.</p>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-4">
                <div className="bg-cyber-black/80 p-4 border border-cyber-gray/50 rounded flex justify-between items-center mb-6">
                  <div>
                    <span className="text-[9px] text-accent-emerald font-bold block uppercase tracking-widest">RGPD / PRIVACY POLICY</span>
                    <h4 className="text-base font-display font-black text-white uppercase mt-1">PROTECTION DES DONNÉES</h4>
                  </div>
                  <span className="text-[10px] border border-accent-emerald/30 text-accent-emerald px-2.5 py-1 rounded bg-accent-emerald/5">
                    Version conforme de 2026
                  </span>
                </div>

                <div className="prose prose-invert max-w-none text-slate-300 font-mono text-xs space-y-4">
                  <p className="font-bold text-white">1. PRÉAMBULE</p>
                  <p>
                    La présente Politique de Confidentialité a pour objet d’informer les utilisateurs du site internet Oisans Sprint SAAS sur les modalités de collecte, d’utilisation, de conservation et de protection de leurs données personnelles conformément au Règlement (UE) 2016/679 (RGPD).
                  </p>

                  <p className="font-bold text-white pt-2">2. RESPONSABLE DU TRAITEMENT</p>
                  <p>Oisans Expert IA, représenté par Monsieur Simonutti Michael, 742 rue du Paradis, 38520 Le Bourg-d'Oisans, France.</p>
                  <p>Email direct de contact : <span className="text-accent-emerald">oisans.sprint.saas@gmail.com</span></p>

                  <p className="font-bold text-white pt-2">3. DONNÉES COLLECTÉES</p>
                  <p>
                    <strong>Participants :</strong> Nom, prénom, email, contenu du SaaS, date d'enregistrement, adresse IP, métriques de connexion.
                  </p>
                  <p>
                    <strong>Votants :</strong> E-mail, adresse IP, horodatage, empreinte de détection anti-fraude.
                  </p>

                  <p className="font-bold text-white pt-2">4. FINALITÉS DU TRAITEMENT</p>
                  <p>Gestion des participations, analyse par l'IA Nova, détection des votes bots et prévention de la fraude multiple.</p>

                  <p className="font-bold text-white pt-2">5. DURÉE DE CONSERVATION</p>
                  <p>6 mois pour les candidats non retenus, 12 mois pour les finalistes, et indéterminée (fiscalité) pour le gagnant sous contrat de redevance.</p>
                </div>
              </div>
            )}

            {activeTab === 'mentions' && (
              <div className="space-y-4">
                <div className="bg-cyber-black/80 p-4 border border-cyber-gray/50 rounded flex justify-between items-center mb-6">
                  <div>
                    <span className="text-[9px] text-accent-cyan font-bold block uppercase tracking-widest">MENTIONS LÉGALES</span>
                    <h4 className="text-base font-display font-black text-white uppercase mt-1">INFORMATIONS CORPORATIVES</h4>
                  </div>
                  <span className="text-[10px] border border-cyber-gray/30 text-slate-400 px-2.5 py-1 rounded bg-cyber-deep">
                    Registre FR
                  </span>
                </div>

                <div className="prose prose-invert max-w-none text-slate-300 font-mono text-xs space-y-4">
                  <p className="font-bold text-white">1. ÉDITEUR DU SITE</p>
                  <p>Le présent site internet est édité par :</p>
                  <p className="text-white font-semibold">Oisans Expert IA</p>
                  <p>Entreprise individuelle exploitée par : Monsieur Simonutti Michael</p>
                  <p>SIRET : <span className="text-accent-cyan">839 532 835 00015</span></p>
                  <p>Adresse : 742 rue du Paradis, 38520 Le Bourg-d'Oisans, France</p>
                  <p>Email officiel : <span className="text-accent-cyan">oisans.sprint.saas@gmail.com</span></p>
                  <p>Directeur de la publication : Monsieur Simonutti Michael</p>

                  <p className="font-bold text-white pt-2">2. NOM & ADRESSE DE PUBLICATION</p>
                  <p>Oisans Sprint SAAS (Oisans.Sprint.SAAS.netlify.app)</p>

                  <p className="font-bold text-white pt-2">3. HÉBERGEUR</p>
                  <p>Le site est hébergé par : Netlify, Inc. (2325 3rd Street, Suite 296, San Francisco, CA 94107, USA)</p>

                  <p className="font-bold text-white pt-2">4. PROPRIÉTÉ INTELLECTUELLE</p>
                  <p>Tous les codes sources, marques, structures de base de données, algorithmes, UI, logos ou concepts du site sont protégés par le Code de la propriété intellectuelle française. Toute infraction fera systématiquement l'objet de dépôts de plaintes.</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="p-4 bg-cyber-black/95 border-t border-cyber-gray/40 flex justify-between items-center text-[10px] text-slate-500 font-mono">
            <span>RÉGULATION OFFICIELLE SPRINT v4.2S</span>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-accent-emerald" />
              <span className="text-slate-300">Audité par Oisans Legal Shield</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
