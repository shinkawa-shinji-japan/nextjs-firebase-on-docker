import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { app } from '@/src/utils/firebase/init';

export const fetchToken = (onFetchToken: Function) => {
  const fcmMessaging = getMessaging(app);

  return getToken(fcmMessaging, {
    vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        onFetchToken(currentToken);
        console.log('current token for client: ', currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        onFetchToken(null);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
};

export const onMessageListener = () => {
  const fcmMessaging = getMessaging(app);

  return new Promise((resolve) => {
    onMessage(fcmMessaging, (payload) => {
      resolve(payload);
    });
  });
};
