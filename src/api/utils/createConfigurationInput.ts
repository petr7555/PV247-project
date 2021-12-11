import { ConfigurationInput } from '../../models/Configuration';
import getUniqueName from '../../utils/getUniqueName';
import getAuthorName from './getAuthorName';
import Generation from '../../models/Generation';
import { User } from 'firebase/auth';
import { Timestamp } from '@firebase/firestore';

const createConfigurationInput = (
  generation: Generation,
  boardSize: number,
  user: User | undefined,
  configName?: string,
): ConfigurationInput => ({
  name: configName ?? getUniqueName(),
  authorName: getAuthorName(user),
  createdAt: Timestamp.now(),
  boardSize,
  initialGeneration: JSON.stringify(generation),
});

export default createConfigurationInput;
