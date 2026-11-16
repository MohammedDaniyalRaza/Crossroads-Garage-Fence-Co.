import React, { createContext, useCallback, useContext, useState } from 'react';

const SESSION_KEY = 'crossroads_intro_seen';

function hasSeenLoaderInSession(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function markLoaderSeenInSession(): void {
  try {
    window.sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // Ignore storage restrictions in private modes
  }
}

interface LoaderContextValue {
  showLoader: boolean;
  appReady: boolean;
  completeLoader: () => void;
}

const LoaderContext = createContext<LoaderContextValue>({
  showLoader: false,
  appReady: true,
  completeLoader: () => {},
});

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showLoader, setShowLoader] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !hasSeenLoaderInSession();
  });

  const [appReady, setAppReady] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return hasSeenLoaderInSession();
  });

  const completeLoader = useCallback(() => {
    markLoaderSeenInSession();
    try {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('app:ready'));
    } catch {
      // ignore
    }
    setShowLoader(false);
    setAppReady(true);
  }, []);

  return (
    <LoaderContext.Provider value={{ showLoader, appReady, completeLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

export function useLoader() {
  return useContext(LoaderContext);
}
