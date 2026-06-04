/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Interface 1-to-1 mapped with the Supabase PostgreSQL public.projects table
export interface Project {
  id: string; // UUID
  created_at: string; // TIMESTAMPTZ
  user_email: string;
  user_fullname: string; // "Nom & Prénom" of the participant
  user_phone?: string;   // Contact phone number of the creator
  title: string;
  sector: string;
  problem: string;
  solution: string;
  features?: string;     // More character space to explain features
  illustration_url?: string; // Optional illustration image of the application
  target_audience: string;
  terms_accepted: boolean;
  signature_hash?: string; // Digital contract signature fingerprint
  
  // AI Evaluations
  ai_analyzed: boolean;
  score_feasibility: number; // 0-100
  score_cost: number;        // 0-100
  score_roi: number;         // 0-100
  ai_verdict: string | null;
  is_finalist: boolean;
  
  // Transient or joint client states
  votes_count: number;       // Accumulated from public.votes or client real-time feeds
}

// Interface for public.votes table
export interface Vote {
  id: string; // UUID
  created_at: string;
  project_id: string; // UUID
  user_id: string;    // UUID (Supabase Auth UID)
}

export interface UserSession {
  isConnected: boolean;
  email?: string;
  userId?: string; // UUID match
  provider?: 'google' | 'magic_link';
  votedForId?: string; // project_id
}

