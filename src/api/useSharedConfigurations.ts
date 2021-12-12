import { sharedConfigurationsCollection } from '../utils/firebase';
import { StoredConfiguration } from '../models/Configuration';
import parseConfigurations from './utils/parseConfigurations';
import { useEffect, useState } from 'react';
import { onSnapshot, orderBy, query, QueryDocumentSnapshot } from 'firebase/firestore';

const useSharedConfigurations = () => {
  const [configurations, setConfigurations] = useState<QueryDocumentSnapshot<StoredConfiguration>[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(sharedConfigurationsCollection, orderBy('createdAt', 'desc')), (snapshot) => {
      setConfigurations(snapshot.docs);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return parseConfigurations(configurations);
};

export default useSharedConfigurations;
