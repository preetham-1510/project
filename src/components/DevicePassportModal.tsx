'use client';

import React, { useRef, useState } from 'react';
import { X, ShieldCheck, Download, Printer, QrCode, CheckCircle2, Award, FileText, Smartphone, DollarSign, Calendar, Cpu, Layers, Battery, Lock, Unlock, Sparkles, Loader2 } from 'lucide-react';
import { DeviceSpec } from '@/lib/types';
import { formatIMEIDisplay } from '@/lib/imeiValidator';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DevicePassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  device: DeviceSpec;
  imei: string;
}

export const DevicePassportModal: React.FC<DevicePassportModalProps> = ({
  isOpen,
  onClose,
  device,
  imei,
}) => {
  const passportRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const certificateId = `PASSPORT-${imei.slice(0, 6)}-${Date.now().toString().slice(-6)}`;
  const dateFormatted = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDownloadPDF = async () => {
    if (!passportRef.current) return;
    setIsGenerating(true);

    try {
      const element = passportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0f172a',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Device_Passport_${imei}.pdf`);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      // Fallback to window print if canvas fails
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-3xl my-8 rounded-3xl border border-cyan-500/30 bg-slate-900 p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.25)] backdrop-blur-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Controls Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 print:hidden">
          <div className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Marketplace Device Passport</h3>
              <p className="text-xs text-slate-400">Official verification certificate for buyers & sellers</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-700 hover:text-white"
            >
              <Printer className="h-4 w-4 text-cyan-400" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-xs font-bold text-slate-950 transition hover:opacity-90 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="rounded-xl border border-slate-800 p-2 text-slate-400 hover:border-slate-700 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE DEVICE PASSPORT CONTAINER */}
        <div
          ref={passportRef}
          id="device-passport-document"
          className="rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 text-slate-100 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Cyber Background Texture */}
          <div className="absolute top-0 right-0 h-64 w-64 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

          {/* Certificate Top Ribbon Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-cyan-500/40 pb-6 mb-6 gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-7 w-7 text-cyan-400" />
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  IMEI<span className="text-cyan-400">VERIFY</span> PRO PASSPORT
                </span>
              </div>
              <p className="text-xs font-mono text-cyan-300/80 mt-1">
                OFFICIAL HARDWARE & SECURITY AUDIT CERTIFICATE
              </p>
            </div>

            <div className="text-left sm:text-right font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">Passport Serial ID</span>
              <span className="text-xs font-bold text-cyan-400">{certificateId}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Issued: {dateFormatted}</span>
            </div>
          </div>

          {/* Verified Device Spotlight & Image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-1 flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center">
              <img
                src={device.imageUrl}
                alt={device.marketName}
                className="h-44 object-contain rounded-xl shadow-lg mb-3"
              />
              <span className="text-xs font-bold text-cyan-300">{device.brand} Official</span>
              <span className="text-[11px] font-mono text-slate-400">Model: {device.modelNumber}</span>
            </div>

            <div className="md:col-span-2 space-y-4 flex flex-col justify-between">
              <div>
                <span className="rounded-md bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 text-xs font-mono text-cyan-300">
                  TAC: {device.tacCode}
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  {device.marketName}
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  IMEI Number: <span className="text-cyan-300 font-bold">{formatIMEIDisplay(imei)}</span>
                </p>
              </div>

              {/* SECURITY STATUS HIGHLIGHT BANNER */}
              <div
                className={`rounded-2xl border p-4 backdrop-blur-md ${
                  device.security.isClean
                    ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-200'
                    : device.security.statusText === 'CARRIER_LOCKED'
                    ? 'border-amber-500/50 bg-amber-950/40 text-amber-200'
                    : 'border-rose-500/50 bg-rose-950/40 text-rose-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2
                      className={`h-6 w-6 ${
                        device.security.isClean
                          ? 'text-emerald-400'
                          : device.security.statusText === 'CARRIER_LOCKED'
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    />
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider block opacity-75">
                        Security Status Audit
                      </span>
                      <span className="text-lg font-black tracking-wide">
                        {device.security.statusText}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800">
                    GSMA: {device.security.gsmaStatus}
                  </span>
                </div>
              </div>

              {/* Estimated Value & Lock Details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-2.5">
                  <span className="text-slate-400 block text-[10px]">Estimated Resale Value</span>
                  <span className="font-bold text-emerald-400">{device.estimatedValue}</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-2.5">
                  <span className="text-slate-400 block text-[10px]">SIM / Carrier Lock</span>
                  <span className="font-bold text-slate-200">{device.security.carrierLock}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hardware Specs Grid Table */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 mb-6">
            <h4 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider mb-3">
              Verified Hardware Specifications
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Chipset & CPU</span>
                <span className="font-medium text-white">{device.hardware.chipset}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">RAM / Memory</span>
                <span className="font-medium text-white">{device.hardware.ram}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Internal Storage</span>
                <span className="font-medium text-white">{device.hardware.storage}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Battery Capacity</span>
                <span className="font-medium text-white">{device.hardware.batteryCapacity}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Display & Screen</span>
                <span className="font-medium text-white">{device.hardware.displaySize}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Camera Architecture</span>
                <span className="font-medium text-white">{device.hardware.mainCamera}</span>
              </div>
            </div>
          </div>

          {/* Bottom Seller Guarantee & QR Code Stamp */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-400">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 font-mono text-[10px] font-bold">
                QR
              </div>
              <div>
                <span className="font-semibold text-slate-200 block">Verified Marketplace Seller Seal</span>
                <span className="text-[10px] text-slate-500">
                  Attach this PDF passport to Swappa, eBay, or Facebook Marketplace listings.
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-cyan-400 font-bold block">IMEIVERIFY AUTHENTICATED</span>
              <span className="text-[9px] text-slate-500">Document Hash: {imei.slice(0, 8)}-SEC-PASS</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
