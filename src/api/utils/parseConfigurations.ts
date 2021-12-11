import { ParsedConfiguration, StoredConfiguration } from '../../models/Configuration';
import { QueryDocumentSnapshot } from 'firebase/firestore';

const parseConfigurations = (configurations: QueryDocumentSnapshot<StoredConfiguration>[]) => {
  const parsedConfigurations: ParsedConfiguration[] = [];

  configurations.forEach((configDoc) => {
    const data = configDoc.data();
    parsedConfigurations.push({
      id: configDoc.id,
      ...data,
      createdAt: data.createdAt.toDate(),
      initialGeneration: JSON.parse(data.initialGeneration),
    });
  });

  return parsedConfigurations;
};

export default parseConfigurations;
