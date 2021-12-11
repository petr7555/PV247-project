import Generation from '../models/Generation';
import { User } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { sharedConfigurationsCollection } from '../utils/firebase';
import createConfigurationInput from './utils/createConfigurationInput';

const getShareableLink = async (generation: Generation, boardSize: number, user: User | undefined) => {
  const newConfig = createConfigurationInput(generation, boardSize, user);
  const doc = await addDoc(sharedConfigurationsCollection, newConfig);
  return `${window.location.origin}/configurations/${doc.id}`;
};

export default getShareableLink;
