'use client';

import React from 'react';
import { ShieldCheck, History, User, Database, Sparkles } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabaseClient';

interface HeaderProps {
  onOpenHistory: () => void;
  onOpenAuth: () => void;
  historyCount: number;
  activeTab: 'single' | 'bulk';
  onTabChange: (tab: 'single' | 'bulk') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHistory,
  onOpenAuth,
  historyCount,
  activeTab,
  onTabChange,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950">
              <ShieldCheck className="h-6 w-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-white">
                IMEI<span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">VERIFY</span>
              </span>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-400">
                PRO v2.4
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-slate-400">
              Global Mobile Hardware & Security Registry
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1 rounded-xl border border-slate-800 bg-slate-900/90 p-1">
          <button
            onClick={() => onTabChange('single')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
              activeTab === 'single'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Single Lookup
          </button>
          <button
            onClick={() => onTabChange('bulk')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
              activeTab === 'bulk'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bulk Batch Scan
          </button>
        </div>

        {/* Status Pill & Actions */}
        <div className="flex items-center space-x-3">
          {/* GSMA Live Status Indicator */}
          <div className="hidden md:flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-medium">GSMA Registry Live</span>
          </div>

          {/* Database indicator */}
          <div
            className={`hidden sm:flex items-center space-x-1.5 rounded-lg border px-2.5 py-1 text-xs font-mono ${
              isSupabaseConfigured
                ? 'border-cyan-500/30 bg-cyan-950/30 text-cyan-300'
                : 'border-slate-800 bg-slate-900/60 text-slate-400'
            }`}
            title={isSupabaseConfigured ? 'Connected to Supabase DB' : 'Using Local DB Fallback'}
          >
            <Database className="h-3.5 w-3.5" />
            <span>{isSupabaseConfigured ? 'Supabase DB' : 'Local Storage'}</span>
          </div>

          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="group relative flex items-center space-x-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-500/50 hover:bg-slate-800/90 hover:text-white"
          >
            <History className="h-4 w-4 text-cyan-400 transition group-hover:scale-110" />
            <span>Recent Checks</span>
            {historyCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-500 px-1.5 text-xs font-bold text-slate-950">
                {historyCount}
              </span>
            )}
          </button>

          {/* Auth Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3.5 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </button>
        </div>
      </div>
    </header>
  );
};
