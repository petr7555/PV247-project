import { usersConfigurationsCollection } from '../utils/firebase';
import { addDoc } from 'firebase/firestore';
import Generation from '../models/Generation';
import { User } from 'firebase/auth';
import createConfigurationInput from './utils/createConfigurationInput';
import getErrorMessage from '../utils/getErrorMsg';

const addConfigurationToUser = async (
  generation: Generation,
  boardSize: number,
  user: User | undefined,
  configName: string,
): Promise<{ errorMsg?: string }> => {
  if (user) {
    try {
      const newConfig = createConfigurationInput(generation, boardSize, user, configName);
      await addDoc(usersConfigurationsCollection(user.uid), newConfig);
      return {};
    } catch (err) {
      return {
        errorMsg: getErrorMessage(err),
      };
    }
  } else {
    return {
      errorMsg: 'You must be logged in to save configuration.',
    };
  }
};

export default addConfigurationToUser;
