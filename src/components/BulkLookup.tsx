'use client';

import React, { useState } from 'react';
import { Upload, FileText, Download, CheckCircle2, AlertOctagon, Lock, Loader2, Sparkles, RefreshCw, Trash2, Layers, ShieldCheck, ArrowRight, FileSpreadsheet } from 'lucide-react';
import { getMockDeviceForIMEI } from '@/lib/mockDeviceData';
import { validateIMEIInput, formatIMEIDisplay } from '@/lib/imeiValidator';
import { DeviceSpec } from '@/lib/types';

interface BulkResultItem {
  imei: string;
  isValidLength: boolean;
  isLuhnValid: boolean;
  device: DeviceSpec;
}

interface BulkLookupProps {
  onSelectDeviceForPassport?: (device: DeviceSpec, imei: string) => void;
}

export const BulkLookup: React.FC<BulkLookupProps> = ({ onSelectDeviceForPassport }) => {
  const [rawText, setRawText] = useState('');
  const [results, setResults] = useState<BulkResultItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const sampleIMEIList = [
    '358912345678901',
    '354421098765432',
    '351234987654321',
    '359876543210987',
    '864321098765432',
  ].join('\n');

  const handlePasteSample = () => {
    setRawText(sampleIMEIList);
  };

  const parseIMEIsFromText = (text: string): string[] => {
    // Split by newlines, commas, or spaces and extract digits
    const rawTokens = text.split(/[\n,\s]+/);
    const validIMEIs: string[] = [];

    for (const token of rawTokens) {
      const cleanDigits = token.replace(/\D/g, '');
      if (cleanDigits.length === 15) {
        if (!validIMEIs.includes(cleanDigits)) {
          validIMEIs.push(cleanDigits);
        }
      }
    }
    return validIMEIs;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        setRawText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleRunBulkLookup = () => {
    const parsedIMEIs = parseIMEIsFromText(rawText);
    if (parsedIMEIs.length === 0) return;

    setIsProcessing(true);
    setProgress(0);
    setResults([]);

    let count = 0;
    const items: BulkResultItem[] = [];

    const interval = setInterval(() => {
      if (count < parsedIMEIs.length) {
        const currentIMEI = parsedIMEIs[count];
        const val = validateIMEIInput(currentIMEI);
        const deviceData = getMockDeviceForIMEI(currentIMEI);

        items.push({
          imei: currentIMEI,
          isValidLength: val.isValidLength,
          isLuhnValid: val.isLuhnValid,
          device: deviceData,
        });

        count++;
        setProgress(Math.round((count / parsedIMEIs.length) * 100));
        setResults([...items]);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 200); // 200ms per device for smooth batch scan animation
  };

  const handleExportCSV = () => {
    if (results.length === 0) return;

    const headers = [
      'IMEI',
      'Brand',
      'Model',
      'TAC Code',
      'Security Status',
      'GSMA Blacklist',
      'Carrier Lock',
      'Chipset',
      'RAM',
      'Storage',
      'Battery',
      'Estimated Value',
    ];

    const csvRows = [
      headers.join(','),
      ...results.map((r) => [
        `"${r.imei}"`,
        `"${r.device.brand}"`,
        `"${r.device.model}"`,
        `"${r.device.tacCode}"`,
        `"${r.device.security.statusText}"`,
        `"${r.device.security.gsmaStatus}"`,
        `"${r.device.security.carrierLock}"`,
        `"${r.device.hardware.chipset.replace(/"/g, '""')}"`,
        `"${r.device.hardware.ram}"`,
        `"${r.device.hardware.storage}"`,
        `"${r.device.hardware.batteryCapacity}"`,
        `"${r.device.estimatedValue}"`,
      ].join(',')),
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `imei_bulk_audit_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalProcessed = results.length;
  const cleanCount = results.filter((r) => r.device.security.statusText === 'CLEAN').length;
  const lockedCount = results.filter((r) => r.device.security.statusText === 'CARRIER_LOCKED').length;
  const blacklistedCount = results.filter((r) => r.device.security.statusText === 'BLACKLISTED').length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-300 mb-2">
              <FileSpreadsheet className="h-3.5 w-3.5 text-cyan-400" />
              <span>Enterprise Batch Processing</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Bulk IMEI Verification & Spec Audit
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Paste up to 50 IMEIs or upload a CSV file to generate batch security reports and specifications matrix.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePasteSample}
              className="flex items-center space-x-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Load 5 Sample IMEIs</span>
            </button>
          </div>
        </div>

        {/* Input Form Box */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Textarea Paste */}
          <div className="lg:col-span-2 space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Paste IMEI List (Line-separated or comma-separated)
            </label>
            <textarea
              rows={5}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="358912345678901&#10;354421098765432&#10;351234987654321&#10;359876543210987"
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm font-mono text-cyan-300 placeholder-slate-600 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* CSV File Upload Dropzone */}
          <div className="lg:col-span-1 flex flex-col justify-between rounded-2xl border-2 border-dashed border-slate-800 bg-slate-950/60 p-5 text-center">
            <div className="my-auto">
              <Upload className="mx-auto h-8 w-8 text-cyan-400 mb-2" />
              <span className="text-xs font-bold text-slate-200 block">Upload CSV / Text File</span>
              <p className="text-[11px] text-slate-400 mt-1">.csv or .txt containing 15-digit IMEIs</p>
            </div>
            <label className="mt-4 block cursor-pointer rounded-xl border border-cyan-500/40 bg-cyan-950/40 px-3 py-2 text-xs font-bold text-cyan-300 transition hover:bg-cyan-950/70">
              <span>Browse File</span>
              <input type="file" accept=".csv,.txt" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Action Trigger Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80 pt-6">
          <div className="text-xs font-mono text-slate-400">
            Detected IMEIs:{' '}
            <span className="text-cyan-400 font-bold">{parseIMEIsFromText(rawText).length} valid IMEIs</span>
          </div>

          <button
            onClick={handleRunBulkLookup}
            disabled={isProcessing || parseIMEIsFromText(rawText).length === 0}
            className={`flex items-center space-x-2 rounded-xl px-6 py-3 text-sm font-bold transition shadow-lg ${
              parseIMEIsFromText(rawText).length > 0 && !isProcessing
                ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-slate-950 hover:opacity-95 shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing Batch ({progress}%)...</span>
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                <span>Execute Bulk Lookup</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Dashboard Table & Summary */}
      {results.length > 0 && (
        <div className="space-y-6 animate-in fade-in">
          {/* Batch Metrics Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl">
              <span className="text-xs text-slate-400 block font-mono">Total Processed</span>
              <span className="text-2xl font-black text-white">{totalProcessed}</span>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 backdrop-blur-xl">
              <span className="text-xs text-emerald-400 block font-mono">Clean Status</span>
              <span className="text-2xl font-black text-emerald-400">{cleanCount}</span>
            </div>

            <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 backdrop-blur-xl">
              <span className="text-xs text-amber-400 block font-mono">Carrier Locked</span>
              <span className="text-2xl font-black text-amber-400">{lockedCount}</span>
            </div>

            <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-4 backdrop-blur-xl">
              <span className="text-xs text-rose-400 block font-mono">Blacklisted Stolen</span>
              <span className="text-2xl font-black text-rose-400">{blacklistedCount}</span>
            </div>
          </div>

          {/* Table Container */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Batch Verification Results</h3>
                <p className="text-xs text-slate-400">Scanned against GSMA database</p>
              </div>

              <button
                onClick={handleExportCSV}
                className="flex items-center space-x-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 text-xs font-bold text-cyan-300 transition hover:bg-cyan-500/20"
              >
                <Download className="h-4 w-4" />
                <span>Export Results to CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="py-3 px-3">IMEI Number</th>
                    <th className="py-3 px-3">Device & Model</th>
                    <th className="py-3 px-3">Security Audit</th>
                    <th className="py-3 px-3">Hardware Specs</th>
                    <th className="py-3 px-3">Est. Value</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {results.map((r, idx) => {
                    const status = r.device.security.statusText;
                    return (
                      <tr key={r.imei + idx} className="hover:bg-slate-800/40 transition">
                        {/* IMEI */}
                        <td className="py-3.5 px-3">
                          <span className="font-bold text-white block">{formatIMEIDisplay(r.imei)}</span>
                          <span className="text-[10px] text-cyan-400">TAC: {r.device.tacCode}</span>
                        </td>

                        {/* Device */}
                        <td className="py-3.5 px-3">
                          <span className="font-semibold text-slate-200 block">{r.device.marketName}</span>
                          <span className="text-[10px] text-slate-400">{r.device.color} • {r.device.modelNumber}</span>
                        </td>

                        {/* Security */}
                        <td className="py-3.5 px-3">
                          <span
                            className={`inline-flex items-center space-x-1 rounded-md px-2.5 py-0.5 text-[10px] font-bold ${
                              status === 'CLEAN'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                                : status === 'CARRIER_LOCKED'
                                ? 'bg-amber-950 text-amber-400 border border-amber-500/40'
                                : 'bg-rose-950 text-rose-400 border border-rose-500/40 animate-pulse'
                            }`}
                          >
                            <span>{status}</span>
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {r.device.security.carrierLock}
                          </span>
                        </td>

                        {/* Hardware Specs */}
                        <td className="py-3.5 px-3">
                          <span className="text-slate-300 block">{r.device.hardware.chipset}</span>
                          <span className="text-[10px] text-slate-400">
                            {r.device.hardware.ram} • {r.device.hardware.storage}
                          </span>
                        </td>

                        {/* Value */}
                        <td className="py-3.5 px-3 font-bold text-emerald-400">
                          {r.device.estimatedValue}
                        </td>

                        {/* Passport Action */}
                        <td className="py-3.5 px-3 text-right">
                          {onSelectDeviceForPassport && (
                            <button
                              onClick={() => onSelectDeviceForPassport(r.device, r.imei)}
                              className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] font-semibold text-cyan-300 hover:border-cyan-500/50 hover:bg-slate-700"
                            >
                              Passport
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
