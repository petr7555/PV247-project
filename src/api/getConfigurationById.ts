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

const getConfigurationById = async (id: string) => {
  try {
    const docSnap = await getDoc(configurationDocument(id));
    if (docSnap.exists()) {
      const storedConfig = docSnap.data();
      return {
        config: {
          ...storedConfig,
          initialGeneration: JSON.parse(storedConfig.initialGeneration),
        },
      };
    } else {
      return { config: DEFAULT_CONFIGURATION, errorMsg: `Configuration with ID ${id} does not exist.` };
    }
  } catch (e) {
    return {
      config: DEFAULT_CONFIGURATION,
      errorMsg: (e as { message?: string })?.message ?? 'An unknown error has occurred.',
    };
  }
};

export default getConfigurationById;
