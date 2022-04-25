import { atom } from 'recoil';

export const sampleAtomValue = atom({
  key: 'SampleAtomValue',
  default: 'Hello Atom!',
});
