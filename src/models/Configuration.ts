import Generation from './Generation';
import { Timestamp } from '@firebase/firestore';

export type Configuration = {
  boardSize: number;
  initialGeneration: Generation;
};

export type StoredConfiguration = {
  name: string;
  authorName: string;
  createdAt: Timestamp;
  boardSize: number;
  initialGeneration: string;
};

export type ParsedConfiguration = {
  id: string;
  name: string;
  authorName: string;
  createdAt: Date;
  boardSize: number;
  initialGeneration: Generation;
};

export type ConfigurationInput = {
  name: string;
  authorName: string;
  createdAt: Timestamp;
  boardSize: number;
  initialGeneration: string;
};
