import { useState, useEffect } from 'react';

/**
 * Custom hook that synchronizes React state with browser localStorage.
 * Safely handles missing keys, invalid JSON, or restricted storage access,
 * and never overwrites valid saved data (including an empty array) with initialValue.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }
      const parsed = JSON.parse(item);
      if (Array.isArray(initialValue) && !Array.isArray(parsed)) {
        return initialValue;
      }
      return parsed;
    } catch (error) {
      console.warn(`Failed to read localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Failed to write localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
