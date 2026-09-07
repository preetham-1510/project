'use client';

import React from 'react';
import { X, History, ShieldCheck, ShieldAlert, Lock, ArrowRight, Trash2, Smartphone } from 'lucide-react';
import { IMEICheckRecord } from '@/lib/types';
import { formatIMEIDisplay } from '@/lib/imeiValidator';

interface RecentSearchesSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: IMEICheckRecord[];
  onSelectRecord: (record: IMEICheckRecord) => void;
  onClearHistory: () => void;
}

export const RecentSearchesSidebar: React.FC<RecentSearchesSidebarProps> = ({
  isOpen,
  onClose,
  history,
  onSelectRecord,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-slate-800 bg-slate-950 p-6 shadow-2xl backdrop-blur-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <History className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Recent IMEI Checks</h3>
                  <p className="text-xs text-slate-400">Showing last 5 verified devices</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded-xl border border-slate-800 p-2 text-slate-400 hover:border-slate-700 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* List of Recent Checks */}
            <div className="mt-6 space-y-3 max-h-[70vh] overflow-y-auto pr-1">
              {history.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  <Smartphone className="mx-auto h-10 w-10 text-slate-600 mb-2" />
                  <p className="text-sm font-medium">No recent searches yet</p>
                  <p className="text-xs mt-1">Look up any 15-digit IMEI to save verification history.</p>
                </div>
              ) : (
                history.map((record) => {
                  const status = record.device.security.statusText;
                  return (
                    <button
                      key={record.id + record.imei}
                      onClick={() => {
                        onSelectRecord(record);
                        onClose();
                      }}
                      className="w-full text-left group flex items-center justify-between rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 transition hover:border-cyan-500/50 hover:bg-slate-800/80 shadow-md"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm text-white group-hover:text-cyan-300 transition">
                            {record.device.marketName}
                          </span>
                        </div>
                        <p className="font-mono text-xs text-slate-400">
                          {formatIMEIDisplay(record.imei)}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {new Date(record.timestamp).toLocaleDateString()} at{' '}
                          {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-bold font-mono ${
                            status === 'CLEAN'
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                              : status === 'CARRIER_LOCKED'
                              ? 'bg-amber-950/80 text-amber-400 border border-amber-500/30'
                              : 'bg-rose-950/80 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {status}
                        </span>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition" />
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Footer Action */}
          {history.length > 0 && (
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={onClearHistory}
                className="w-full flex items-center justify-center space-x-2 rounded-xl border border-rose-500/30 bg-rose-950/20 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-950/40 transition"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear Recent History</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
