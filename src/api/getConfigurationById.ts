import { configurationDocument, usersConfigurationDocument } from '../utils/firebase';
import { Configuration } from '../models/Configuration';
import { getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import getErrorMessage from '../utils/getErrorMsg';

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

const getConfigurationById = async (configId: string, isPrivate: boolean, user: User | undefined) => {
  try {
    let doc;

    if (isPrivate) {
      if (!user) {
        return { config: DEFAULT_CONFIGURATION, errorMsg: 'You must be logged in to view this configuration.' };
      }
      doc = usersConfigurationDocument(user.uid, configId);
    } else {
      doc = configurationDocument(configId);
    }
    const docSnap = await getDoc(doc);

    if (docSnap.exists()) {
      const storedConfig = docSnap.data();
      return {
        config: {
          ...storedConfig,
          initialGeneration: JSON.parse(storedConfig.initialGeneration),
        },
      };
    } else {
      return { config: DEFAULT_CONFIGURATION, errorMsg: `Configuration with ID ${configId} does not exist.` };
    }
  } catch (err) {
    return {
      config: DEFAULT_CONFIGURATION,
      errorMsg: getErrorMessage(err),
    };
  }
};

export default getConfigurationById;
