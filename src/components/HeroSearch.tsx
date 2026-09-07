'use client';

import React, { useState } from 'react';
import { Search, ShieldAlert, CheckCircle2, AlertTriangle, Sparkles, HelpCircle, Loader2, ArrowRight } from 'lucide-react';
import { validateIMEIInput, formatIMEIDisplay, validateLuhnIMEI } from '@/lib/imeiValidator';
import { SAMPLE_IMEIS } from '@/lib/mockDeviceData';

interface HeroSearchProps {
  onSearch: (imei: string) => void;
  isLoading: boolean;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSearch, isLoading }) => {
  const [inputVal, setInputVal] = useState('');
  const [focused, setFocused] = useState(false);

  // Validate on the fly
  const cleanDigits = inputVal.replace(/\D/g, '').slice(0, 15);
  const validation = validateIMEIInput(cleanDigits);
  const digitCount = cleanDigits.length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only accept numeric inputs
    const rawVal = e.target.value;
    const digitsOnly = rawVal.replace(/\D/g, '').slice(0, 15);
    setInputVal(digitsOnly);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (digitCount === 15) {
      onSearch(cleanDigits);
    }
  };

  const handleQuickFill = (sampleImei: string) => {
    setInputVal(sampleImei);
    onSearch(sampleImei);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[500px] rounded-full bg-gradient-to-tr from-cyan-600/20 via-blue-600/10 to-purple-600/20 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        {/* Top Tagline */}
        <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs sm:text-sm font-medium text-cyan-300 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
          <span>Real-time Hardware Specifications & GSMA Security Verification</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          Verify Device Specs & <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Security Status by IMEI
          </span>
        </h1>
        <p className="mt-4 text-base text-slate-300 sm:text-lg max-w-2xl mx-auto">
          Enter any 15-digit IMEI number to instantaneously scan blacklist registries, verify hardware specifications, carrier lock status, and warranty details.
        </p>

        {/* Centered Search Box Container */}
        <div className="mt-8 mx-auto max-w-2xl">
          <form onSubmit={handleSubmit} className="relative group">
            {/* Outer Glow Container */}
            <div
              className={`relative flex items-center rounded-2xl border transition-all duration-300 ${
                focused
                  ? 'border-cyan-400 bg-slate-900/90 shadow-[0_0_35px_rgba(6,182,212,0.3)] ring-2 ring-cyan-500/30'
                  : digitCount === 15 && validation.isLuhnValid
                  ? 'border-emerald-500/60 bg-slate-900/80 shadow-[0_0_25px_rgba(16,185,129,0.2)]'
                  : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
              } backdrop-blur-xl p-2`}
            >
              {/* Search Icon */}
              <div className="pl-3 pr-2 text-slate-400">
                <Search className={`h-6 w-6 transition-colors ${focused ? 'text-cyan-400' : 'text-slate-500'}`} />
              </div>

              {/* Main Input */}
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={15}
                value={cleanDigits}
                onChange={handleInputChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter 15-digit IMEI number (e.g. 358912345678901)"
                className="w-full bg-transparent py-3 text-lg font-mono tracking-wider text-white placeholder-slate-500 focus:outline-none"
              />

              {/* Real-time Digit Counter & Validation Badge */}
              <div className="flex items-center space-x-2 pr-2">
                <div
                  className={`flex items-center space-x-1 rounded-lg px-2.5 py-1 text-xs font-mono font-bold ${
                    digitCount === 15
                      ? validation.isLuhnValid
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                        : 'bg-amber-950/80 text-amber-400 border border-amber-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <span>{digitCount}/15</span>
                  {digitCount === 15 && (
                    validation.isLuhnValid ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                    )
                  )}
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={digitCount !== 15 || isLoading}
                  className={`flex items-center space-x-2 rounded-xl px-5 py-3 text-sm font-bold transition-all shadow-lg ${
                    digitCount === 15 && !isLoading
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Scanning...</span>
                    </>
                  ) : (
                    <>
                      <span>Lookup</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Real-time Visual Status & Formatting Helper */}
            {cleanDigits.length > 0 && (
              <div className="mt-2.5 flex flex-wrap items-center justify-between px-2 text-xs">
                <div className="flex items-center space-x-2 font-mono text-slate-400">
                  <span>Formatted:</span>
                  <span className="text-cyan-300 font-semibold">{formatIMEIDisplay(cleanDigits)}</span>
                </div>

                {validation.errorMessage ? (
                  <span className="text-amber-400 font-medium flex items-center space-x-1">
                    <AlertTriangle className="h-3.5 w-3.5 inline mr-1" />
                    {validation.errorMessage}
                  </span>
                ) : digitCount === 15 && validation.isLuhnValid ? (
                  <span className="text-emerald-400 font-medium flex items-center space-x-1">
                    <CheckCircle2 className="h-3.5 w-3.5 inline mr-1" />
                    Luhn Checksum Valid • Ready to Verify
                  </span>
                ) : null}
              </div>
            )}
          </form>

          {/* Quick-fill Sample IMEIs */}
          <div className="mt-6">
            <div className="flex items-center justify-center space-x-2 text-xs text-slate-400 mb-3">
              <HelpCircle className="h-3.5 w-3.5 text-cyan-400" />
              <span>Or click a sample device to test different security statuses:</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {SAMPLE_IMEIS.map((sample) => (
                <button
                  key={sample.imei}
                  onClick={() => handleQuickFill(sample.imei)}
                  className="group flex items-center space-x-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 transition hover:border-cyan-500/50 hover:bg-slate-800/90 hover:text-white"
                >
                  <span className="font-medium">{sample.label}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold font-mono ${
                      sample.status === 'Clean'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                        : sample.status === 'Locked'
                        ? 'bg-amber-950/80 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-950/80 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {sample.status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
