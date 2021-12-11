import { useState, useEffect } from 'react';

const getOfflineStatus = () => {
  return typeof navigator !== 'undefined' ? !navigator.onLine : false;
};

const useOfflineStatus = () => {
  const [isOffline, setIsOffline] = useState(getOfflineStatus());

  const goOnline = () => setIsOffline(false);

  const goOffline = () => setIsOffline(true);

  useEffect(() => {
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return isOffline;
};

export default useOfflineStatus;
