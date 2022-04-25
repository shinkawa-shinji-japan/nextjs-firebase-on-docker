import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/src/utils/firebase/firestore/db';

type PropsUpdateFcmToken = {
  uid: string;
  fcmToken: string;
};
export const updateFcmToken = async ({ uid, fcmToken }: PropsUpdateFcmToken) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      fcmToken,
      updatedAt: serverTimestamp(),
    });
  } else {
    setDoc(docRef, {
      fcmToken,
      updatedAt: serverTimestamp(),
    });
  }
};

type PropsUpdateDisplayName = {
  uid: string;
  displayName: string;
};
export const updateDisplayName = async ({ uid, displayName }: PropsUpdateDisplayName) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      displayName,
      updatedAt: serverTimestamp(),
    });
  } else {
    setDoc(docRef, {
      displayName,
      updatedAt: serverTimestamp(),
    });
  }
};
