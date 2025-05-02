// src/utils/localStorageHelpers.ts

// Save data to localStorage
export const saveToLocalStorage = (key: string, value: any): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error saving to localStorage: ${error}`);
      }
    }
  };
  
  // Get data from localStorage
  export const getFromLocalStorage = <T>(key: string): T | null => {
    if (typeof window !== 'undefined') {
      try {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
      } catch (error) {
        console.error(`Error retrieving from localStorage: ${error}`);
        return null;
      }
    }
    return null;
  };
  
  // Remove an item from localStorage
  export const removeFromLocalStorage = (key: string): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing from localStorage: ${error}`);
      }
    }
  };
  
  // Clear all data from localStorage
  export const clearLocalStorage = (): void => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.clear();
      } catch (error) {
        console.error(`Error clearing localStorage: ${error}`);
      }
    }
  };
  