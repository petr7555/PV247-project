import Generation from '../models/Generation';
import { User } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { configurationsCollection } from '../utils/firebase';
import createConfigurationInput from './utils/createConfigurationInput';

const getShareableLink = async (generation: Generation, boardSize: number, user: User | undefined) => {
  const newConfig = createConfigurationInput(generation, boardSize, user);
  const doc = await addDoc(configurationsCollection, newConfig);
  return `${window.location.origin}/configurations/${doc.id}`;
};

export default getShareableLink;
