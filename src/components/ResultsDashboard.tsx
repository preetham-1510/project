'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  Cpu,
  Zap,
  Battery,
  Smartphone,
  Check,
  Copy,
  Download,
  Share2,
  Calendar,
  DollarSign,
  Globe,
  Radio,
  Camera,
  Layers,
  Activity,
  AlertOctagon,
  Sparkles,
} from 'lucide-react';
import { DeviceSpec } from '@/lib/types';
import { formatIMEIDisplay } from '@/lib/imeiValidator';

interface ResultsDashboardProps {
  device: DeviceSpec;
  imei: string;
  onOpenPassport: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ device, imei, onOpenPassport }) => {
  const [copied, setCopied] = useState(false);

  const { security, hardware } = device;

  const handleCopyReport = () => {
    const text = `IMEI Verification Certificate\n` +
      `IMEI: ${imei}\n` +
      `Device: ${device.marketName}\n` +
      `Security Status: ${security.statusText}\n` +
      `GSMA Blacklist: ${security.gsmaStatus}\n` +
      `Carrier Lock: ${security.carrierLock}\n` +
      `iCloud/FindMy: ${security.icloudFmiStatus}\n` +
      `Specs: ${hardware.chipset} | ${hardware.ram} | ${hardware.storage} | ${hardware.batteryCapacity}\n` +
      `Verified via IMEIVERIFY PRO`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl mb-8">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 text-xs font-bold text-cyan-400 font-mono">
              TAC: {device.tacCode}
            </span>
            <span className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-mono text-slate-300">
              IMEI: {formatIMEIDisplay(imei)}
            </span>
            <span className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-400">
              Scanned: {new Date().toLocaleTimeString()}
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            {device.marketName}
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* PROMINENT DEVICE PASSPORT BUTTON */}
          <button
            onClick={onOpenPassport}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:opacity-95 shadow-[0_0_25px_rgba(6,182,212,0.4)]"
          >
            <Download className="h-4 w-4" />
            <span>Download Device Passport</span>
          </button>

          <button
            onClick={handleCopyReport}
            className="flex items-center justify-center space-x-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/50 hover:bg-slate-700 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-cyan-400" />
                <span>Copy Specs</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scannable Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: Device Image & Quick Overview */}
        <div className="lg:col-span-1 flex flex-col rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

          <div className="relative flex items-center justify-between mb-4">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
              {device.brand} Official Hardware
            </span>
            <span className="text-xs font-mono text-slate-400">
              Release: {device.releaseYear}
            </span>
          </div>

          {/* High-Tech Device Showcase Container */}
          <div className="relative my-4 flex h-64 w-full items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-purple-500/5 opacity-50" />
            
            {/* Image Placeholder / Visual mockup */}
            <img
              src={device.imageUrl}
              alt={device.marketName}
              className="h-full object-contain rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                // Fallback icon container if photo fails
                e.currentTarget.style.display = 'none';
              }}
            />
            
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-slate-950/90 border border-slate-800 px-3 py-1.5 backdrop-blur-md">
              <span className="text-xs font-medium text-slate-400">Color Variant</span>
              <span className="text-xs font-bold text-cyan-300 flex items-center space-x-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 inline-block shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <span>{device.color}</span>
              </span>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="mt-auto space-y-3 pt-4 border-t border-slate-800/60">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 flex items-center space-x-1.5">
                <Smartphone className="h-4 w-4 text-cyan-400" />
                <span>Model Code</span>
              </span>
              <span className="font-mono text-white font-medium">{device.modelNumber}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-400 flex items-center space-x-1.5">
                <DollarSign className="h-4 w-4 text-emerald-400" />
                <span>Estimated Resale Value</span>
              </span>
              <span className="font-semibold text-emerald-400">{device.estimatedValue}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-400 flex items-center space-x-1.5">
                <Globe className="h-4 w-4 text-purple-400" />
                <span>Country Target</span>
              </span>
              <span className="text-slate-200">{security.countryOfOrigin}</span>
            </div>
          </div>
        </div>

        {/* CARD 2 & 3 CONTAINER */}
        <div className="lg:col-span-2 space-y-6">

          {/* DISTINCT SECURITY STATUS CARD */}
          <div
            className={`rounded-3xl border p-6 backdrop-blur-xl relative overflow-hidden transition-all shadow-xl ${
              security.statusText === 'CLEAN'
                ? 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                : security.statusText === 'CARRIER_LOCKED'
                ? 'border-amber-500/40 bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.15)]'
                : 'border-rose-500/50 bg-gradient-to-br from-rose-950/50 via-slate-900/90 to-slate-950 shadow-[0_0_30px_rgba(244,63,94,0.2)]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
              <div className="flex items-center space-x-3">
                {security.statusText === 'CLEAN' ? (
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                ) : security.statusText === 'CARRIER_LOCKED' ? (
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                    <Lock className="h-7 w-7" />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                    <AlertOctagon className="h-7 w-7" />
                  </div>
                )}
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-extrabold text-white">Security Status Audit</h3>
                    <span
                      className={`rounded-md px-2.5 py-0.5 text-xs font-bold font-mono tracking-wider ${
                        security.statusText === 'CLEAN'
                          ? 'bg-emerald-500 text-slate-950'
                          : security.statusText === 'CARRIER_LOCKED'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-rose-500 text-white animate-pulse'
                      }`}
                    >
                      {security.statusText}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Verified against GSMA Global Blacklist & International Carrier Registries
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-mono text-slate-400">GSMA Registry Code</span>
                <div className="font-mono text-xs text-cyan-400 font-bold">VERIFIED-OK-8849</div>
              </div>
            </div>

            {/* Security Breakdown Cards */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* GSMA Blacklist */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3.5 backdrop-blur-md">
                <span className="text-xs text-slate-400 block mb-1">GSMA Blacklist Registry</span>
                <div className="flex items-center space-x-2">
                  {security.gsmaStatus === 'Clean / Passed' ? (
                    <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  ) : (
                    <ShieldAlert className="h-4 w-4 text-rose-400 shrink-0" />
                  )}
                  <span className={`text-sm font-semibold ${security.gsmaStatus === 'Clean / Passed' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {security.gsmaStatus}
                  </span>
                </div>
              </div>

              {/* Carrier Lock */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3.5 backdrop-blur-md">
                <span className="text-xs text-slate-400 block mb-1">Carrier SIM Lock</span>
                <div className="flex items-center space-x-2">
                  {security.carrierLock === 'Unlocked' ? (
                    <Unlock className="h-4 w-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Lock className="h-4 w-4 text-amber-400 shrink-0" />
                  )}
                  <span className={`text-sm font-semibold ${security.carrierLock === 'Unlocked' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {security.carrierLock}
                  </span>
                </div>
              </div>

              {/* iCloud / FMI Lock */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3.5 backdrop-blur-md">
                <span className="text-xs text-slate-400 block mb-1">Activation / iCloud Lock</span>
                <div className="flex items-center space-x-2">
                  {security.icloudFmiStatus === 'Clean (Off)' ? (
                    <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Lock className="h-4 w-4 text-rose-400 shrink-0" />
                  )}
                  <span className={`text-sm font-semibold ${security.icloudFmiStatus === 'Clean (Off)' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {security.icloudFmiStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Blacklist Warning Message if Flagged */}
            {security.blacklistReason && (
              <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-950/40 p-3.5 text-xs text-rose-200 flex items-start space-x-2">
                <ShieldAlert className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-rose-300">Warning: Blacklist Record Found! </span>
                  <span>{security.blacklistReason} (Reported on {security.blacklistDate}). This device cannot register on cellular networks.</span>
                </div>
              </div>
            )}
          </div>

          {/* HARDWARE SPECS TABLE GRID */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <Cpu className="h-5 w-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Hardware Specifications</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Performance Score: <span className="text-cyan-300 font-bold">{(device.benchmarkScore / 10000).toFixed(0)}k PTS</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Chipset & CPU */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
                <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold uppercase mb-1">
                  <Cpu className="h-4 w-4 text-cyan-400" />
                  <span>Processor & GPU</span>
                </div>
                <p className="text-sm font-bold text-white">{hardware.chipset}</p>
                <p className="text-xs text-slate-400 mt-1">{hardware.cpu}</p>
                <p className="text-xs font-mono text-cyan-400/90 mt-1">{hardware.gpu}</p>
              </div>

              {/* Memory & Storage */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
                <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold uppercase mb-1">
                  <Layers className="h-4 w-4 text-purple-400" />
                  <span>Memory & Storage</span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-lg font-extrabold text-white">{hardware.ram}</span>
                  <span className="text-slate-400 text-xs">RAM</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">Storage: <span className="font-semibold text-cyan-300">{hardware.storage}</span></p>
              </div>

              {/* Battery & Charging */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
                <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold uppercase mb-1">
                  <Battery className="h-4 w-4 text-emerald-400" />
                  <span>Battery & Charging</span>
                </div>
                <p className="text-sm font-bold text-white">{hardware.batteryCapacity}</p>
                <p className="text-xs text-slate-400 mt-1">Speed: {hardware.chargingSpeed}</p>
                <p className="text-xs text-emerald-400 font-mono mt-1">Est. Battery Life: ~{device.batteryHours} Hours</p>
              </div>

              {/* Display */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
                <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold uppercase mb-1">
                  <Smartphone className="h-4 w-4 text-blue-400" />
                  <span>Display & Screen</span>
                </div>
                <p className="text-sm font-bold text-white">{hardware.displaySize}</p>
                <p className="text-xs text-slate-400 mt-1">{hardware.displayResolution}</p>
                <p className="text-xs text-cyan-400 font-mono mt-1">Refresh Rate: {hardware.refreshRate}</p>
              </div>

              {/* Cameras */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
                <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold uppercase mb-1">
                  <Camera className="h-4 w-4 text-rose-400" />
                  <span>Camera Architecture</span>
                </div>
                <p className="text-xs text-slate-200"><span className="font-bold text-white">Rear:</span> {hardware.mainCamera}</p>
                <p className="text-xs text-slate-400 mt-1"><span className="font-bold text-slate-300">Front:</span> {hardware.selfieCamera}</p>
              </div>

              {/* OS & Connectivity */}
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
                <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold uppercase mb-1">
                  <Radio className="h-4 w-4 text-amber-400" />
                  <span>OS & Network</span>
                </div>
                <p className="text-xs text-slate-200"><span className="font-bold text-white">OS:</span> {hardware.os}</p>
                <p className="text-xs text-slate-400 mt-1"><span className="font-bold text-slate-300">Network:</span> {hardware.network}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
