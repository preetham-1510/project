import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IMEIVERIFY PRO | Mobile Device Hardware & Security Verification',
  description: 'Lookup mobile phone hardware specifications, GSMA blacklist security status, carrier lock info, and warranty details instantly by 15-digit IMEI number.',
  keywords: ['IMEI lookup', 'IMEI verifier', 'GSMA blacklist check', 'device specs', 'carrier lock status', 'phone verification'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 cyber-bg selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
