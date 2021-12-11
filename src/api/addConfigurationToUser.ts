import { usersConfigurationsCollection } from '../utils/firebase';
import { addDoc } from 'firebase/firestore';
import Generation from '../models/Generation';
import { User } from 'firebase/auth';
import createConfigurationInput from './utils/createConfigurationInput';

const addConfigurationToUser = async (
  generation: Generation,
  boardSize: number,
  user: User | undefined,
  configName: string,
) => {
  if (user) {
    try {
      const newConfig = createConfigurationInput(generation, boardSize, user, configName);
      await addDoc(usersConfigurationsCollection(user.uid), newConfig);
    } catch (err) {
      console.error(err);
    }
  }
};

export default addConfigurationToUser;
