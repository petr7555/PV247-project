import { ParsedConfiguration } from '../models/Configuration';

const filterConfigurations = (configurations: ParsedConfiguration[], searchTerm: string) => {
  const st = searchTerm.toLowerCase();
  return configurations.filter((config) => {
    return config.name.toLowerCase().includes(st) || config.authorName.toLowerCase().includes(st);
  });
};

export default filterConfigurations;
