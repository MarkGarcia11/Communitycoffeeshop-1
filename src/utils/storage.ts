export function readStoredArray<T>(key: string, fallback: T[]): T[] {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const value: unknown = JSON.parse(saved);
    if (!Array.isArray(value) || value.some((item) => !item || typeof item !== "object")) return fallback;
    return value as T[];
  } catch {
    return fallback;
  }
}

export function readStoredNumber(key: string, fallback: number): number {
  try {
    const saved = localStorage.getItem(key);
    if (saved === null) return fallback;
    const value = Number(saved);
    return Number.isFinite(value) && value >= 0 ? value : fallback;
  } catch {
    return fallback;
  }
}

export function writeStoredValue(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage restrictions must not prevent the branding or site from loading.
  }
}