/**
 * Performs Luhn Algorithm Check (MOD 10) on a 15-digit IMEI number
 */
export function validateLuhnIMEI(imei: string): boolean {
  const cleanIMEI = imei.replace(/\D/g, '');
  if (cleanIMEI.length !== 15) return false;

  let sum = 0;
  for (let i = 0; i < 15; i++) {
    let digit = parseInt(cleanIMEI.charAt(i), 10);
    
    // Double every second digit starting from the second-to-last (index 13, 11, 9, etc.)
    // In a 15-digit IMEI (0-indexed 0 to 14), odd indices (1, 3, 5, 7, 9, 11, 13) are doubled.
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }

  return sum % 10 === 0;
}

export function formatIMEI(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 15);
  return digits;
}

export function formatIMEIDisplay(imei: string): string {
  const digits = imei.replace(/\D/g, '');
  if (digits.length <= 8) return digits;
  if (digits.length <= 14) return `${digits.slice(0, 8)} - ${digits.slice(8)}`;
  return `${digits.slice(0, 8)} - ${digits.slice(8, 14)} - ${digits.slice(14)}`;
}

export function getTacCode(imei: string): string {
  const digits = imei.replace(/\D/g, '');
  return digits.length >= 8 ? digits.slice(0, 8) : '';
}

export interface IMEIValidationResult {
  isValidLength: boolean;
  isNumericOnly: boolean;
  isLuhnValid: boolean;
  errorMessage?: string;
}

export function validateIMEIInput(input: string): IMEIValidationResult {
  const cleanInput = input.replace(/\s+/g, '');
  const isNumericOnly = /^\d*$/.test(cleanInput);
  const isValidLength = cleanInput.length === 15;
  const isLuhnValid = isValidLength && isNumericOnly && validateLuhnIMEI(cleanInput);

  let errorMessage: string | undefined = undefined;
  if (!isNumericOnly) {
    errorMessage = 'IMEI must contain numbers only';
  } else if (cleanInput.length > 0 && cleanInput.length < 15) {
    errorMessage = `15 digits required (${cleanInput.length}/15)`;
  } else if (cleanInput.length === 15 && !isLuhnValid) {
    errorMessage = 'Invalid checksum (Luhn check failed)';
  }

  return {
    isValidLength,
    isNumericOnly,
    isLuhnValid,
    errorMessage,
  };
}
