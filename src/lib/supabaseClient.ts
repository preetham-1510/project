import { createClient } from '@supabase/supabase-js';
import { IMEICheckRecord } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const LOCAL_STORAGE_HISTORY_KEY = 'imei_verifier_recent_searches';

/**
 * Save IMEI lookup result to history (Supabase DB + LocalStorage fallback)
 */
export async function saveIMEICheckToHistory(record: IMEICheckRecord): Promise<void> {
  // Always save to LocalStorage for instant UI response
  try {
    const existing = getLocalHistory();
    // Filter out duplicate IMEI if it exists, add new to beginning, cap at 10 items
    const filtered = existing.filter((item) => item.imei !== record.imei);
    const updated = [record, ...filtered].slice(0, 10);
    localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('LocalStorage access failed', e);
  }

  // Save to Supabase if configured
  if (supabase) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id || null;

      await supabase.from('imei_searches').insert({
        user_id: userId,
        imei: record.imei,
        is_valid: record.isValid,
        device_brand: record.device.brand,
        device_model: record.device.model,
        security_status: record.device.security.statusText,
        device_payload: record.device,
        created_at: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Supabase search save failed, used fallback storage:', err);
    }
  }
}

/**
 * Fetch last 5 searches from Supabase or LocalStorage fallback
 */
export async function fetchRecentSearches(): Promise<IMEICheckRecord[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('imei_searches')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          id: item.id,
          imei: item.imei,
          isValid: item.is_valid,
          timestamp: item.created_at,
          device: item.device_payload,
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch failed, loading local history fallback:', err);
    }
  }

  return getLocalHistory().slice(0, 5);
}

function getLocalHistory(): IMEICheckRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
