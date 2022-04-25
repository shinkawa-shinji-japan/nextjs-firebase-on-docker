import { app } from '@/src/utils/firebase/init';
import {
  getFirestore,
  // connectFirestoreEmulator
} from 'firebase/firestore';

const db = getFirestore(app);
// ローカルエミュレータを使いたい場合はコメントをオフにする。
// if (process.env.NODE_ENV === "development") {
//   connectFirestoreEmulator(db, "localhost", 8080);
// }

export { db };
