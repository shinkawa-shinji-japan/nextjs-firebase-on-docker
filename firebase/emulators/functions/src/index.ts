import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();

/* eslint-disable */
export const helloWorld = functions.https.onRequest(
  async (request: functions.Request, response: functions.Response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    const now = new Date();
    await db
      .collection("test")
      .doc(JSON.stringify(now))
      .set({ message: "i can use firestore!" });

    response.send("Hello world from functions!");
  }
);

export const createUserDocument = functions.auth
  .user()
  .onCreate(async (userRecord: admin.auth.UserRecord) => {
    // userRecord.toJSON に不具合があるため、解消されるまでは下記のコードを実行する
    const {
      uid,
      email,
      displayName,
      photoURL,
      phoneNumber,
      disabled,
      providerData,
      customClaims,
      passwordSalt,
      passwordHash,
      tokensValidAfterTime,
    } = userRecord;

    const now = new Date();

    await db
      .collection("users")
      .doc(uid)
      .set({
        email,
        displayName,
        photoURL,
        phoneNumber,
        disabled,
        providerData,
        customClaims,
        passwordSalt,
        passwordHash,
        tokensValidAfterTime,
        createdAt: JSON.stringify(now),
      });

    // userRecord.toJSON に不具合が解消されたら下記のコードで実行する
    //   await db
    //   .collection("user")
    //   .doc(userRecord.uid)
    //   .set(JSON.parse(JSON.stringify(userRecord)));
  });

/* eslint-disable */
