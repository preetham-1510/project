'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from '@/components/Header';
import { HeroSearch } from '@/components/HeroSearch';
import { ResultsDashboard } from '@/components/ResultsDashboard';
import { SpecComparator } from '@/components/SpecComparator';
import { BulkLookup } from '@/components/BulkLookup';
import { RecentSearchesSidebar } from '@/components/RecentSearchesSidebar';
import { AuthModal } from '@/components/AuthModal';
import { DevicePassportModal } from '@/components/DevicePassportModal';
import { getMockDeviceForIMEI, MOCK_DEVICES } from '@/lib/mockDeviceData';
import { fetchRecentSearches, saveIMEICheckToHistory } from '@/lib/supabaseClient';
import { DeviceSpec, IMEICheckRecord } from '@/lib/types';
import { ShieldCheck, Loader2, Sparkles, Cpu, Lock, AlertOctagon, CheckCircle2, ChevronDown } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');
  const [currentIMEI, setCurrentIMEI] = useState<string>('358912345678901'); // Default loaded flagship
  const [currentDevice, setCurrentDevice] = useState<DeviceSpec | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Drawer & Modal States
  const [historyOpen, setHistoryOpen] = useState<boolean>(false);
  const [authOpen, setAuthOpen] = useState<boolean>(false);
  const [passportOpen, setPassportOpen] = useState<boolean>(false);
  const [passportTarget, setPassportTarget] = useState<{ device: DeviceSpec; imei: string } | null>(null);
  const [recentHistory, setRecentHistory] = useState<IMEICheckRecord[]>([]);

  // Initial load
  useEffect(() => {
    // Set default initial demo device
    const initialDevice = getMockDeviceForIMEI('358912345678901');
    setCurrentDevice(initialDevice);

    // Load recent history from Supabase / LocalStorage
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const records = await fetchRecentSearches();
    setRecentHistory(records);
  };

  const handleSearch = async (imei: string) => {
    setIsLoading(true);
    setCurrentIMEI(imei);

    try {
      // Call Next.js server API route handler
      const res = await fetch('/api/imei', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imei }),
      });

      const responseData = await res.json();
      const deviceData: DeviceSpec = responseData.data || getMockDeviceForIMEI(imei);

      setCurrentDevice(deviceData);
      setIsLoading(false);

      // Save to Supabase DB / local storage
      const record: IMEICheckRecord = {
        id: `check_${Date.now()}`,
        imei,
        isValid: true,
        timestamp: new Date().toISOString(),
        device: deviceData,
      };

      await saveIMEICheckToHistory(record);
      await loadHistory();

      // Trigger celebration confetti if device is clean
      if (deviceData.security.isClean) {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#3b82f6', '#10b981', '#a855f7'],
        });
      }

      // Smooth scroll to results dashboard
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      console.warn('API route call failed, loading fallback device:', err);
      const fallbackDevice = getMockDeviceForIMEI(imei);
      setCurrentDevice(fallbackDevice);
      setIsLoading(false);
    }
  };

  const handleSelectHistoryRecord = (record: IMEICheckRecord) => {
    setActiveTab('single');
    setCurrentIMEI(record.imei);
    setCurrentDevice(record.device);
    const resultsElement = document.getElementById('results-section');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBulkPassport = (device: DeviceSpec, imei: string) => {
    setPassportTarget({ device, imei });
    setPassportOpen(true);
  };

  const handleClearHistory = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('imei_verifier_recent_searches');
    }
    setRecentHistory([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Header
        onOpenHistory={() => setHistoryOpen(true)}
        onOpenAuth={() => setAuthOpen(true)}
        historyCount={recentHistory.length}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === 'single' ? (
          <>
            <HeroSearch onSearch={handleSearch} isLoading={isLoading} />

            {/* 1-Second Cyber Scanning Modal / Overlay when searching */}
            {isLoading && (
              <div className="mx-auto px-4 py-12 text-center animate-in fade-in duration-300">
                <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-3xl border border-cyan-500/40 bg-slate-900/90 p-4 shadow-[0_0_50px_rgba(6,182,212,0.3)] backdrop-blur-xl">
                  <div className="absolute inset-0 rounded-3xl border-2 border-cyan-400/40 animate-ping" />
                  <Loader2 className="h-14 w-14 animate-spin text-cyan-400" />
                </div>

                <div className="mt-6 space-y-2">
                  <h3 className="text-xl font-extrabold text-white tracking-wide">
                    Interrogating Global GSMA Database...
                  </h3>
                  <p className="text-sm font-mono text-cyan-400">
                    Checking IMEI: {currentIMEI}
                  </p>
                  <div className="mx-auto max-w-xs mt-4 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse" />
                  </div>
                </div>
              </div>
            )}

            {/* Results & Specs Dashboard */}
            {!isLoading && currentDevice && (
              <div id="results-section" className="scroll-mt-20">
                <ResultsDashboard
                  device={currentDevice}
                  imei={currentIMEI}
                  onOpenPassport={() => {
                    setPassportTarget({ device: currentDevice, imei: currentIMEI });
                    setPassportOpen(true);
                  }}
                />
                <SpecComparator currentDevice={currentDevice} />
              </div>
            )}
          </>
        ) : (
          <BulkLookup onSelectDeviceForPassport={handleOpenBulkPassport} />
        )}
      </main>

      {/* Slide-over Sidebars & Modals */}
      <RecentSearchesSidebar
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={recentHistory}
        onSelectRecord={handleSelectHistoryRecord}
        onClearHistory={handleClearHistory}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />

      {passportTarget && (
        <DevicePassportModal
          isOpen={passportOpen}
          onClose={() => setPassportOpen(false)}
          device={passportTarget.device}
          imei={passportTarget.imei}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-center text-xs text-slate-500 backdrop-blur-md mt-16">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span className="font-semibold text-slate-400">IMEIVERIFY PRO</span>
            <span>— Hardware Verification & Blacklist Engine</span>
          </div>

          <p>© {new Date().getFullYear()} IMEIVERIFY. Built with Next.js, Tailwind CSS & Supabase.</p>
        </div>
      </footer>
    </div>
  );
}
