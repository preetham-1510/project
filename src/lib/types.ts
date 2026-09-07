export interface SecurityStatus {
  isClean: boolean;
  statusText: 'CLEAN' | 'BLACKLISTED' | 'CARRIER_LOCKED' | 'FLAGGED';
  gsmaStatus: 'Clean / Passed' | 'Reported Stolen' | 'Unpaid Balance' | 'Restricted';
  carrierLock: 'Unlocked' | 'Locked (AT&T)' | 'Locked (T-Mobile)' | 'Locked (Verizon)';
  icloudFmiStatus: 'Clean (Off)' | 'Locked (On)' | 'Unknown';
  blacklistDate?: string;
  blacklistReason?: string;
  countryOfOrigin: string;
}

export interface DeviceHardware {
  chipset: string;
  cpu: string;
  gpu: string;
  ram: string;
  ramGB: number;
  storage: string;
  batteryCapacity: string;
  batterymAh: number;
  chargingSpeed: string;
  displaySize: string;
  displayResolution: string;
  refreshRate: string;
  mainCamera: string;
  cameraMP: number;
  selfieCamera: string;
  os: string;
  network: string;
}

export interface DeviceSpec {
  id: string;
  brand: string;
  model: string;
  marketName: string;
  color: string;
  releaseYear: number;
  modelNumber: string;
  tacCode: string;
  imageUrl: string;
  benchmarkScore: number; // AnTuTu / Geekbench relative score
  batteryHours: number;
  security: SecurityStatus;
  hardware: DeviceHardware;
  warrantyStatus: string;
  estimatedValue: string;
}

export interface IMEICheckRecord {
  id: string;
  imei: string;
  isValid: boolean;
  timestamp: string;
  device: DeviceSpec;
}
