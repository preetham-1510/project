'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Lock, Key, Database, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '@/lib/supabaseClient';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured || !supabase) {
      setMessage({
        type: 'error',
        text: 'Supabase credentials are not configured yet in .env.local',
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Registration email sent! Please check your inbox.' });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Successfully authenticated!' });
        setTimeout(onClose, 1500);
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Authentication failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-xl border border-slate-800 p-2 text-slate-400 hover:border-slate-700 hover:text-white transition"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.3)] mb-3">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {isSignUp ? 'Create Supabase Account' : 'Sign In to IMEIVERIFY'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Sync IMEI verification records across devices & save PDF certificates
          </p>
        </div>

        {/* Configuration Notice if Supabase keys missing */}
        {!isSupabaseConfigured && (
          <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-950/30 p-4 text-xs text-amber-200">
            <div className="flex items-center space-x-2 font-bold text-amber-400 mb-1">
              <Database className="h-4 w-4" />
              <span>Supabase Integration Ready</span>
            </div>
            <p className="text-amber-200/90">
              The app is currently operating in local storage mode. To enable full cloud sync & authentication, add your credentials to <code className="font-mono text-cyan-300">.env.local</code>.
            </p>
          </div>
        )}

        {message && (
          <div
            className={`mb-4 rounded-xl border p-3 text-xs flex items-center space-x-2 ${
              message.type === 'success'
                ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                : 'border-rose-500/40 bg-rose-950/40 text-rose-300'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-sm font-bold text-slate-950 transition hover:opacity-90 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-bold text-cyan-400 hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};
