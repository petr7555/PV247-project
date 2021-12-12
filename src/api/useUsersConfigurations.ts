import { usersConfigurationsCollection } from '../utils/firebase';
import { StoredConfiguration } from '../models/Configuration';
import useLoggedInUser from '../hooks/useLoggedInUser';
import parseConfigurations from './utils/parseConfigurations';
import { useEffect, useState } from 'react';
import { onSnapshot, orderBy, query, QueryDocumentSnapshot } from 'firebase/firestore';

const useUsersConfigurations = () => {
  const user = useLoggedInUser();
  const [configurations, setConfigurations] = useState<QueryDocumentSnapshot<StoredConfiguration>[]>([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        query(usersConfigurationsCollection(user.uid), orderBy('createdAt', 'desc')),
        (snapshot) => {
          setConfigurations(snapshot.docs);
        },
      );
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return parseConfigurations(configurations);
};

export default useUsersConfigurations;
