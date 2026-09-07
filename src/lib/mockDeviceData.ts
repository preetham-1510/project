import { DeviceSpec } from './types';

export const MOCK_DEVICES: Record<string, DeviceSpec> = {
  // Flagship default match (iPhone 15 Pro)
  '358912345678901': {
    id: 'dev_iphone15pro',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    marketName: 'iPhone 15 Pro (256GB, Space Black)',
    color: 'Space Black',
    releaseYear: 2023,
    modelNumber: 'A3102 / MU793LL/A',
    tacCode: '35891234',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
    benchmarkScore: 1640000,
    batteryHours: 23,
    security: {
      isClean: true,
      statusText: 'CLEAN',
      gsmaStatus: 'Clean / Passed',
      carrierLock: 'Unlocked',
      icloudFmiStatus: 'Clean (Off)',
      countryOfOrigin: 'United States (A2848)',
    },
    hardware: {
      chipset: 'Apple A17 Pro (3nm)',
      cpu: 'Hexa-core (2x3.78 GHz + 4x2.11 GHz)',
      gpu: 'Apple GPU (6-core graphics)',
      ram: '8 GB LPDDR5X',
      ramGB: 8,
      storage: '256 GB NVMe',
      batteryCapacity: '3274 mAh Li-Ion',
      batterymAh: 3274,
      chargingSpeed: '27W Wired, 15W MagSafe Wireless',
      displaySize: '6.1" Super Retina XDR OLED (120Hz ProMotion)',
      displayResolution: '1179 x 2556 pixels (~460 ppi)',
      refreshRate: '120Hz adaptive',
      mainCamera: '48 MP (wide) + 12 MP (telephoto 3x) + 12 MP (ultrawide)',
      cameraMP: 48,
      selfieCamera: '12 MP, f/1.9, PDAF, OIS',
      os: 'iOS 17.5.1 (Upgradable to iOS 18)',
      network: '5G NR (mmWave & Sub-6GHz), eSIM & Nano-SIM, Wi-Fi 6E',
    },
    warrantyStatus: 'Active AppleCare+ Coverage (Expires Nov 2026)',
    estimatedValue: '$899 - $950 USD',
  },

  // Samsung Galaxy S24 Ultra
  '354421098765432': {
    id: 'dev_s24ultra',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    marketName: 'Samsung Galaxy S24 Ultra (512GB, Titanium Black)',
    color: 'Titanium Black',
    releaseYear: 2024,
    modelNumber: 'SM-S928B/DS',
    tacCode: '35442109',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop',
    benchmarkScore: 1820000,
    batteryHours: 27,
    security: {
      isClean: true,
      statusText: 'CLEAN',
      gsmaStatus: 'Clean / Passed',
      carrierLock: 'Unlocked',
      icloudFmiStatus: 'Clean (Off)',
      countryOfOrigin: 'South Korea / Global',
    },
    hardware: {
      chipset: 'Qualcomm Snapdragon 8 Gen 3 for Galaxy (4nm)',
      cpu: 'Octa-core (1x3.39 GHz Cortex-X4 & 5x3.1 GHz & 2x2.2 GHz)',
      gpu: 'Adreno 750 (1 GHz)',
      ram: '12 GB LPDDR5X',
      ramGB: 12,
      storage: '512 GB UFS 4.0',
      batteryCapacity: '5000 mAh Li-Ion',
      batterymAh: 5000,
      chargingSpeed: '45W Wired, 15W Wireless, 4.5W Reverse Wireless',
      displaySize: '6.8" Dynamic LTPO AMOLED 2X (120Hz, 2600 nits)',
      displayResolution: '1440 x 3120 pixels (~505 ppi)',
      refreshRate: '120Hz LTPO',
      mainCamera: '200 MP (wide) + 50 MP (periscope 5x) + 10 MP (telephoto 3x) + 12 MP (ultrawide)',
      cameraMP: 200,
      selfieCamera: '12 MP, f/2.2, Dual Pixel PDAF',
      os: 'Android 14, One UI 6.1 (7 Years OS Updates)',
      network: '5G Dual SIM, Wi-Fi 7, Ultra Wideband (UWB), S-Pen',
    },
    warrantyStatus: 'Standard Manufacturer Warranty (Active)',
    estimatedValue: '$1,150 - $1,299 USD',
  },

  // Google Pixel 8 Pro (Carrier Locked)
  '351234987654321': {
    id: 'dev_pixel8pro',
    brand: 'Google',
    model: 'Pixel 8 Pro',
    marketName: 'Google Pixel 8 Pro (128GB, Obsidian Black)',
    color: 'Obsidian',
    releaseYear: 2023,
    modelNumber: 'GC3VE / G1MNW',
    tacCode: '35123498',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop',
    benchmarkScore: 1150000,
    batteryHours: 24,
    security: {
      isClean: false,
      statusText: 'CARRIER_LOCKED',
      gsmaStatus: 'Clean / Passed',
      carrierLock: 'Locked (AT&T)',
      icloudFmiStatus: 'Clean (Off)',
      countryOfOrigin: 'United States',
    },
    hardware: {
      chipset: 'Google Tensor G3 (4nm)',
      cpu: 'Nona-core (1x3.0 GHz Cortex-X3 & 4x2.45 GHz & 4x2.15 GHz)',
      gpu: 'Immortalis-G715 MC10',
      ram: '12 GB LPDDR5X',
      ramGB: 12,
      storage: '128 GB UFS 3.1',
      batteryCapacity: '5050 mAh Li-Ion',
      batterymAh: 5050,
      chargingSpeed: '30W Wired, 23W Wireless',
      displaySize: '6.7" LTPO OLED (120Hz, 2400 nits)',
      displayResolution: '1344 x 2992 pixels (~489 ppi)',
      refreshRate: '120Hz LTPO',
      mainCamera: '50 MP (wide) + 48 MP (telephoto 5x) + 48 MP (ultrawide)',
      cameraMP: 50,
      selfieCamera: '10.5 MP, f/2.2, ultrawide',
      os: 'Android 14 (Pure Pixel Experience)',
      network: '5G mmWave & Sub-6, eSIM, Wi-Fi 7',
    },
    warrantyStatus: 'Expired (Out of Warranty)',
    estimatedValue: '$620 - $680 USD (Locked Discount Applied)',
  },

  // iPhone 14 Pro (Blacklisted Demo)
  '359876543210987': {
    id: 'dev_iphone14pro_blacklisted',
    brand: 'Apple',
    model: 'iPhone 14 Pro',
    marketName: 'iPhone 14 Pro (128GB, Deep Purple) [BLACKLISTED]',
    color: 'Deep Purple',
    releaseYear: 2022,
    modelNumber: 'A2890',
    tacCode: '35987654',
    imageUrl: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=800&auto=format&fit=crop',
    benchmarkScore: 1470000,
    batteryHours: 20,
    security: {
      isClean: false,
      statusText: 'BLACKLISTED',
      gsmaStatus: 'Reported Stolen',
      carrierLock: 'Locked (T-Mobile)',
      icloudFmiStatus: 'Locked (On)',
      blacklistDate: '2024-03-14',
      blacklistReason: 'Reported Lost/Stolen by original account holder',
      countryOfOrigin: 'United States',
    },
    hardware: {
      chipset: 'Apple A16 Bionic (4nm)',
      cpu: 'Hexa-core (2x3.46 GHz + 4x2.02 GHz)',
      gpu: 'Apple GPU (5-core graphics)',
      ram: '6 GB LPDDR5',
      ramGB: 6,
      storage: '128 GB NVMe',
      batteryCapacity: '3200 mAh Li-Ion',
      batterymAh: 3200,
      chargingSpeed: '20W Wired, 15W MagSafe',
      displaySize: '6.1" Super Retina XDR OLED (Dynamic Island)',
      displayResolution: '1179 x 2556 pixels (~460 ppi)',
      refreshRate: '120Hz adaptive',
      mainCamera: '48 MP (wide) + 12 MP (telephoto 3x) + 12 MP (ultrawide)',
      cameraMP: 48,
      selfieCamera: '12 MP, f/1.9, PDAF',
      os: 'iOS 17.2',
      network: '5G, Nano-SIM & eSIM',
    },
    warrantyStatus: 'Void / Blocked by Carrier',
    estimatedValue: '$0 USD (Blacklisted - Cannot Be Activated)',
  },

  // OnePlus 12
  '864321098765432': {
    id: 'dev_oneplus12',
    brand: 'OnePlus',
    model: 'OnePlus 12',
    marketName: 'OnePlus 12 (512GB, Silky Black)',
    color: 'Silky Black',
    releaseYear: 2024,
    modelNumber: 'CPH2583',
    tacCode: '86432109',
    imageUrl: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=800&auto=format&fit=crop',
    benchmarkScore: 1790000,
    batteryHours: 26,
    security: {
      isClean: true,
      statusText: 'CLEAN',
      gsmaStatus: 'Clean / Passed',
      carrierLock: 'Unlocked',
      icloudFmiStatus: 'Clean (Off)',
      countryOfOrigin: 'Global Model',
    },
    hardware: {
      chipset: 'Qualcomm Snapdragon 8 Gen 3 (4nm)',
      cpu: 'Octa-core (1x3.3 GHz Cortex-X4 & 5x3.2 GHz & 2x2.3 GHz)',
      gpu: 'Adreno 750',
      ram: '16 GB LPDDR5X',
      ramGB: 16,
      storage: '512 GB UFS 4.0',
      batteryCapacity: '5400 mAh Li-Po',
      batterymAh: 5400,
      chargingSpeed: '100W SUPERVOOC Wired, 50W AIRVOOC Wireless',
      displaySize: '6.82" LTPO3 AMOLED (120Hz, 4500 nits peak)',
      displayResolution: '1440 x 3168 pixels (~510 ppi)',
      refreshRate: '120Hz LTPO',
      mainCamera: '50 MP Hasselblad (wide) + 64 MP (periscope 3x) + 48 MP (ultrawide)',
      cameraMP: 50,
      selfieCamera: '32 MP, f/2.4',
      os: 'OxygenOS 14.0 based on Android 14',
      network: '5G Dual SIM, Wi-Fi 7, Bluetooth 5.4',
    },
    warrantyStatus: 'Active Global Warranty',
    estimatedValue: '$749 - $799 USD',
  }
};

/**
 * Returns mock device for a given IMEI.
 * If the IMEI exists in our static mock database, returns that device.
 * Otherwise, generates a realistic dynamic mock response using the TAC code.
 */
export function getMockDeviceForIMEI(imei: string): DeviceSpec {
  const cleanIMEI = imei.replace(/\D/g, '');
  
  if (MOCK_DEVICES[cleanIMEI]) {
    return MOCK_DEVICES[cleanIMEI];
  }

  // Generate dynamic flagship mock device if any arbitrary valid IMEI is typed
  const lastDigit = parseInt(cleanIMEI.slice(-1) || '0', 10);
  const isBlacklisted = lastDigit === 7;
  const isLocked = lastDigit === 4;

  const defaultStatusText = isBlacklisted ? 'BLACKLISTED' : isLocked ? 'CARRIER_LOCKED' : 'CLEAN';

  return {
    id: `dev_${cleanIMEI.slice(0, 8)}`,
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    marketName: `iPhone 15 Pro (Space Black) [IMEI TAC: ${cleanIMEI.slice(0, 8)}]`,
    color: 'Space Black',
    releaseYear: 2023,
    modelNumber: `A3102-TAC-${cleanIMEI.slice(0, 6)}`,
    tacCode: cleanIMEI.slice(0, 8),
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
    benchmarkScore: 1640000 + (lastDigit * 10000),
    batteryHours: 22 + (lastDigit % 5),
    security: {
      isClean: !isBlacklisted && !isLocked,
      statusText: defaultStatusText,
      gsmaStatus: isBlacklisted ? 'Reported Stolen' : 'Clean / Passed',
      carrierLock: isLocked ? 'Locked (Verizon)' : 'Unlocked',
      icloudFmiStatus: isBlacklisted ? 'Locked (On)' : 'Clean (Off)',
      blacklistDate: isBlacklisted ? '2024-05-10' : undefined,
      blacklistReason: isBlacklisted ? 'Carrier Unpaid Financial Obligation' : undefined,
      countryOfOrigin: 'United States',
    },
    hardware: {
      chipset: 'Apple A17 Pro (3nm Bionic Engine)',
      cpu: 'Hexa-core (2x Performance, 4x Efficiency)',
      gpu: 'Apple 6-core Neural GPU',
      ram: '8 GB LPDDR5X',
      ramGB: 8,
      storage: '256 GB High-Speed NVMe',
      batteryCapacity: '3274 mAh Li-Ion',
      batterymAh: 3274,
      chargingSpeed: '27W USB-PD 3.0, 15W MagSafe',
      displaySize: '6.1" Super Retina XDR OLED',
      displayResolution: '1179 x 2556 pixels (~460 ppi)',
      refreshRate: '120Hz ProMotion',
      mainCamera: '48 MP Main + 12 MP Ultra Wide + 12 MP 3x Telephoto',
      cameraMP: 48,
      selfieCamera: '12 MP TrueDepth Camera with Autofocus',
      os: 'iOS 17.5.1',
      network: '5G Ultra Wideband, Wi-Fi 6E, Bluetooth 5.3',
    },
    warrantyStatus: isBlacklisted ? 'Void (Device Flagged)' : 'Limited Warranty (Expires Dec 2026)',
    estimatedValue: isBlacklisted ? '$0 USD (Blacklisted)' : '$850 - $920 USD',
  };
}

export const SAMPLE_IMEIS = [
  { label: 'Clean iPhone 15 Pro', imei: '358912345678901', status: 'Clean' },
  { label: 'Clean Galaxy S24 Ultra', imei: '354421098765432', status: 'Clean' },
  { label: 'Carrier Locked Pixel 8 Pro', imei: '351234987654321', status: 'Locked' },
  { label: 'Blacklisted iPhone 14 Pro', imei: '359876543210987', status: 'Blacklisted' },
];

export const ALL_COMPARISON_DEVICES: DeviceSpec[] = [
  MOCK_DEVICES['358912345678901'],
  MOCK_DEVICES['354421098765432'],
  MOCK_DEVICES['351234987654321'],
  MOCK_DEVICES['864321098765432'],
];
