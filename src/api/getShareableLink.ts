import Generation from '../models/Generation';
import { User } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { sharedConfigurationsCollection } from '../utils/firebase';
import createConfigurationInput from './utils/createConfigurationInput';
import getErrorMessage from '../utils/getErrorMsg';

const getShareableLink = async (generation: Generation, boardSize: number, user: User | undefined) => {
  const newConfig = createConfigurationInput(generation, boardSize, user);
  try {
    const doc = await addDoc(sharedConfigurationsCollection, newConfig);
    return { link: `${window.location.origin}/configurations/${doc.id}` };
  } catch (err) {
    return {
      errorMsg: getErrorMessage(err),
    };
  }
};

export default getShareableLink;
