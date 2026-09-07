import { NextRequest, NextResponse } from 'next/server';
import { validateIMEIInput } from '@/lib/imeiValidator';
import { getMockDeviceForIMEI } from '@/lib/mockDeviceData';
import { DeviceSpec } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imei } = body;

    if (!imei || typeof imei !== 'string') {
      return NextResponse.json(
        { success: false, error: 'IMEI parameter is required' },
        { status: 400 }
      );
    }

    const cleanIMEI = imei.replace(/\D/g, '');
    const validation = validateIMEIInput(cleanIMEI);

    if (!validation.isLuhnValid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.errorMessage || 'Invalid 15-digit IMEI checksum (Luhn algorithm failed)',
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.IMEI_API_KEY;

    // If external API key is set in environment variables, attempt live external fetch
    if (apiKey) {
      try {
        const externalApiUrl = process.env.IMEI_API_ENDPOINT || 'https://api.imeicheck.net/v1/check';
        const response = await fetch(externalApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'X-API-Key': apiKey,
          },
          body: JSON.stringify({ imei: cleanIMEI }),
          cache: 'no-store',
        });

        if (response.ok) {
          const apiData = await response.json();
          // Transform external API payload into standard DeviceSpec format
          const formattedDevice: DeviceSpec = {
            id: apiData.id || `dev_${cleanIMEI.slice(0, 8)}`,
            brand: apiData.brand || 'Apple',
            model: apiData.model || 'iPhone 15 Pro',
            marketName: apiData.market_name || apiData.model || `Device [IMEI: ${cleanIMEI}]`,
            color: apiData.color || 'Space Black',
            releaseYear: apiData.release_year || 2024,
            modelNumber: apiData.model_number || 'A3102',
            tacCode: cleanIMEI.slice(0, 8),
            imageUrl: apiData.image_url || 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
            benchmarkScore: apiData.benchmark_score || 1640000,
            batteryHours: apiData.battery_hours || 23,
            security: {
              isClean: apiData.security?.is_clean ?? true,
              statusText: apiData.security?.status_text || 'CLEAN',
              gsmaStatus: apiData.security?.gsma_status || 'Clean / Passed',
              carrierLock: apiData.security?.carrier_lock || 'Unlocked',
              icloudFmiStatus: apiData.security?.icloud_status || 'Clean (Off)',
              countryOfOrigin: apiData.country || 'United States',
            },
            hardware: {
              chipset: apiData.chipset || 'Apple A17 Pro (3nm)',
              cpu: apiData.cpu || 'Hexa-core',
              gpu: apiData.gpu || 'Apple GPU 6-core',
              ram: apiData.ram || '8 GB LPDDR5X',
              ramGB: apiData.ram_gb || 8,
              storage: apiData.storage || '256 GB NVMe',
              batteryCapacity: apiData.battery_capacity || '3274 mAh Li-Ion',
              batterymAh: apiData.battery_mah || 3274,
              chargingSpeed: apiData.charging_speed || '27W USB-PD',
              displaySize: apiData.display_size || '6.1" OLED 120Hz',
              displayResolution: apiData.display_resolution || '1179 x 2556',
              refreshRate: apiData.refresh_rate || '120Hz',
              mainCamera: apiData.main_camera || '48 MP Main',
              cameraMP: apiData.camera_mp || 48,
              selfieCamera: apiData.selfie_camera || '12 MP',
              os: apiData.os || 'iOS 17.5',
              network: apiData.network || '5G NR, eSIM',
            },
            warrantyStatus: apiData.warranty_status || 'Active Manufacturer Coverage',
            estimatedValue: apiData.estimated_value || '$899 USD',
          };

          return NextResponse.json({
            success: true,
            source: 'live_external_api',
            data: formattedDevice,
          });
        }
      } catch (externalErr) {
        console.warn('External IMEI API call failed, falling back to mock provider:', externalErr);
      }
    }

    // Fallback to internal database / mock generator
    const mockDevice = getMockDeviceForIMEI(cleanIMEI);

    return NextResponse.json({
      success: true,
      source: apiKey ? 'mock_fallback' : 'internal_mock_database',
      data: mockDevice,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imei = searchParams.get('imei');

  if (!imei) {
    return NextResponse.json(
      { success: false, error: 'IMEI query parameter is required' },
      { status: 400 }
    );
  }

  const cleanIMEI = imei.replace(/\D/g, '');
  const mockDevice = getMockDeviceForIMEI(cleanIMEI);

  return NextResponse.json({
    success: true,
    source: 'internal_mock_database',
    data: mockDevice,
  });
}
