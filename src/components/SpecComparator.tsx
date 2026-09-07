'use client';

import React, { useState } from 'react';
import { BarChart2, ArrowRightLeft, Cpu, Battery, Layers, Camera, Zap, CheckCircle2 } from 'lucide-react';
import { DeviceSpec } from '@/lib/types';
import { ALL_COMPARISON_DEVICES } from '@/lib/mockDeviceData';

interface SpecComparatorProps {
  currentDevice: DeviceSpec;
}

export const SpecComparator: React.FC<SpecComparatorProps> = ({ currentDevice }) => {
  // Select rival comparison device (default to S24 Ultra if searching iPhone, or iPhone 15 Pro if searching S24)
  const defaultRival = ALL_COMPARISON_DEVICES.find((d) => d.model !== currentDevice.model) || ALL_COMPARISON_DEVICES[1];
  const [rivalDevice, setRivalDevice] = useState<DeviceSpec>(defaultRival);

  // Metrics for comparison chart
  const metrics = [
    {
      name: 'Performance Score',
      unit: 'pts',
      icon: Cpu,
      valCurrent: currentDevice.benchmarkScore / 10000, // scaled for display
      valRival: rivalDevice.benchmarkScore / 10000,
      format: (val: number) => `${Math.round(val * 10)}k`,
    },
    {
      name: 'Battery Endurance',
      unit: 'hrs',
      icon: Battery,
      valCurrent: currentDevice.batteryHours,
      valRival: rivalDevice.batteryHours,
      format: (val: number) => `${val} Hours`,
    },
    {
      name: 'RAM Memory',
      unit: 'GB',
      icon: Layers,
      valCurrent: currentDevice.hardware.ramGB,
      valRival: rivalDevice.hardware.ramGB,
      format: (val: number) => `${val} GB`,
    },
    {
      name: 'Camera Resolution',
      unit: 'MP',
      icon: Camera,
      valCurrent: currentDevice.hardware.cameraMP,
      valRival: rivalDevice.hardware.cameraMP,
      format: (val: number) => `${val} MP`,
    },
    {
      name: 'Battery Capacity',
      unit: 'mAh',
      icon: Zap,
      valCurrent: currentDevice.hardware.batterymAh / 100, // scaled for chart
      valRival: rivalDevice.hardware.batterymAh / 100,
      format: (val: number) => `${Math.round(val * 100)} mAh`,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <BarChart2 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                Interactive Spec Comparator
              </h3>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Compare hardware benchmark scores & battery endurance against top industry flagships
            </p>
          </div>

          {/* Select Rival Device Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1 flex items-center">
              <ArrowRightLeft className="h-3.5 w-3.5 text-cyan-400 mr-1" /> Compare against:
            </span>
            {ALL_COMPARISON_DEVICES.filter((d) => d.id !== currentDevice.id).map((dev) => (
              <button
                key={dev.id}
                onClick={() => setRivalDevice(dev)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  rivalDevice.id === dev.id
                    ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'border border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                {dev.brand} {dev.model}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Devices Badge Header */}
        <div className="my-6 grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-4">
            <div className="flex items-center space-x-3">
              <span className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">Searched Device</span>
                <span className="text-sm sm:text-base font-bold text-white">{currentDevice.marketName}</span>
              </div>
            </div>
            <span className="hidden sm:inline font-mono text-xs text-slate-400">{currentDevice.hardware.chipset}</span>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-purple-500/30 bg-purple-950/20 p-4">
            <div className="flex items-center space-x-3">
              <span className="h-3 w-3 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block">Comparison Rival</span>
                <span className="text-sm sm:text-base font-bold text-white">{rivalDevice.marketName}</span>
              </div>
            </div>
            <span className="hidden sm:inline font-mono text-xs text-slate-400">{rivalDevice.hardware.chipset}</span>
          </div>
        </div>

        {/* Visual Bar Chart Comparison Grid */}
        <div className="space-y-6">
          {metrics.map((m) => {
            const Icon = m.icon;
            const maxVal = Math.max(m.valCurrent, m.valRival) * 1.15;
            const pctCurrent = Math.round((m.valCurrent / maxVal) * 100);
            const pctRival = Math.round((m.valRival / maxVal) * 100);
            const isCurrentWinner = m.valCurrent >= m.valRival;

            return (
              <div key={m.name} className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-semibold text-slate-200">{m.name}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Winner:{' '}
                    <span className={isCurrentWinner ? 'text-cyan-400 font-bold' : 'text-purple-400 font-bold'}>
                      {isCurrentWinner ? currentDevice.model : rivalDevice.model}
                    </span>
                  </span>
                </div>

                {/* Bars Container */}
                <div className="space-y-2">
                  {/* Searched Device Bar */}
                  <div className="flex items-center space-x-3">
                    <span className="w-24 text-xs font-mono text-cyan-400 truncate">{currentDevice.model}</span>
                    <div className="relative flex-1 h-4 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                        style={{ width: `${pctCurrent}%` }}
                      />
                    </div>
                    <span className="w-20 text-right font-mono text-xs font-bold text-white">
                      {m.format(m.valCurrent)}
                    </span>
                  </div>

                  {/* Rival Device Bar */}
                  <div className="flex items-center space-x-3">
                    <span className="w-24 text-xs font-mono text-purple-400 truncate">{rivalDevice.model}</span>
                    <div className="relative flex-1 h-4 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-700 shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                        style={{ width: `${pctRival}%` }}
                      />
                    </div>
                    <span className="w-20 text-right font-mono text-xs font-bold text-white">
                      {m.format(m.valRival)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Side by Side Comparison Table */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <h4 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-4">
            Side-by-Side Specifications Matrix
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-2.5 px-3">Specification</th>
                  <th className="py-2.5 px-3 text-cyan-400">{currentDevice.marketName}</th>
                  <th className="py-2.5 px-3 text-purple-400">{rivalDevice.marketName}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-400">Processor</td>
                  <td className="py-2.5 px-3 text-white">{currentDevice.hardware.chipset}</td>
                  <td className="py-2.5 px-3 text-white">{rivalDevice.hardware.chipset}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-400">RAM / Memory</td>
                  <td className="py-2.5 px-3">{currentDevice.hardware.ram}</td>
                  <td className="py-2.5 px-3">{rivalDevice.hardware.ram}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-400">Battery & Charge</td>
                  <td className="py-2.5 px-3">{currentDevice.hardware.batteryCapacity} ({currentDevice.hardware.chargingSpeed})</td>
                  <td className="py-2.5 px-3">{rivalDevice.hardware.batteryCapacity} ({rivalDevice.hardware.chargingSpeed})</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-400">Display</td>
                  <td className="py-2.5 px-3">{currentDevice.hardware.displaySize}</td>
                  <td className="py-2.5 px-3">{rivalDevice.hardware.displaySize}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-400">Security Status</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-400">{currentDevice.security.statusText}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-400">{rivalDevice.security.statusText}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
