import { useEffect, useState } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  User,
  getAuth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  // connectAuthEmulator,
} from 'firebase/auth';

import { app } from '@/src/utils/firebase/init';

export const auth = getAuth(app);
// if (process.env.NODE_ENV === "development") {
//   connectAuthEmulator(auth, "http://localhost:9099");
// }

export type UserState = User | null;

const userState = atom<UserState>({
  key: 'firebaseUserState',
  default: null,
  dangerouslyAllowMutability: true,
});

export const logout = (): Promise<void> => {
  return signOut(auth);
};

export const useAuth = (): boolean => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, [setUser]);

  return isLoading;
};

export const useUser = (): UserState => {
  return useRecoilValue(userState);
};
