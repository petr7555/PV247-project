import { configurationDocument } from '../utils/firebase';
import { Configuration, ParsedConfiguration } from '../models/Configuration';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { FirestoreError, getDoc } from 'firebase/firestore';

export const DEFAULT_CONFIGURATION: Configuration = {
  boardSize: 20,
  initialGeneration: [
    [0, 0],
    [5, 5],
    [3, 3],
    [9, 10],
    [10, 10],
    [11, 10],
    [11, 9],
    [10, 8],
    [79, 6],
  ],
};

const getConfigurationById = async (id: string): Promise<Configuration> => {
  try {
    const docSnap = await getDoc(configurationDocument(id));
    await new Promise((res, rej) => setTimeout(() => res(5), 2000));
    // throw new Error('fail');
    if (docSnap.exists()) {
      const storedConfig = docSnap.data();
      return {
        ...storedConfig,
        initialGeneration: JSON.parse(storedConfig.initialGeneration),
      };
    } else {
      return DEFAULT_CONFIGURATION;
    }
  } catch (e) {
    return DEFAULT_CONFIGURATION;
  }
};

export default getConfigurationById;
