import { configurationDocument, usersConfigurationDocument } from '../utils/firebase';
import { Configuration } from '../models/Configuration';
import { getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import getErrorMessage from '../utils/getErrorMsg';

export const DEFAULT_CONFIGURATION: Configuration = {
  boardSize: 20,
  initialGeneration: [
    [20, 11],
    [20, 12],
    [20, 13],
    [25, 12],
    [26, 11],
    [26, 12],
    [26, 13],
    [27, 11],
    [27, 10],
    [27, 13],
    [27, 14],
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
