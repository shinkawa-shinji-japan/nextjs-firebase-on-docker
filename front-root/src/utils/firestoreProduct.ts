import { app } from '@/src/utils/firebase/init';
import {
  // doc,
  addDoc,
  // setDoc,
  getFirestore,
  collection,
} from 'firebase/firestore';

const db = getFirestore(app);

// ローカルエミュレータを使いたい場合はコメントをオフにする。しかし、FirestoreのStripeExtensionがFirebase上でしか使えないから、ローカルのFirestoreにアクセスした方が良い機会は少ないと思う。
// if (process.env.NEXT_PUBLIC_MODE === "LOCAL_DEVELOP") {
//   connectFirestoreEmulator(db, "localhost", 8080);
// }

export const addProduct = async ({ /* uid,*/ productName }: any) => {
  const now = new Date();

  return await addDoc(collection(db, 'products'), {
    name: productName,
    time: now,
  });
};
