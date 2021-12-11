import { usersConfigurationsCollection } from '../utils/firebase';
import { StoredConfiguration } from '../models/Configuration';
import useLoggedInUser from '../hooks/useLoggedInUser';
import parseConfigurations from './utils/parseConfigurations';
import { useEffect, useState } from 'react';
import { onSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';

const useUsersConfigurations = () => {
  const user = useLoggedInUser();
  const [configurations, setConfigurations] = useState<QueryDocumentSnapshot<StoredConfiguration>[]>([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(usersConfigurationsCollection(user.uid), (snapshot) => {
        setConfigurations(snapshot.docs);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return parseConfigurations(configurations);
};

export default useUsersConfigurations;
