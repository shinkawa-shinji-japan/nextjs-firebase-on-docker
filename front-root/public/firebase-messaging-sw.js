importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
  // apiKey: process.env.NEXT_PUBLIC_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  apiKey: 'AIzaSyAs1y_UnDRSHlSEfnG7OR_yAhi0C8Kmrn8',
  authDomain: 'with-nextjs-develop.firebaseapp.com',
  projectId: 'with-nextjs-develop',
  storageBucket: 'with-nextjs-develop.appspot.com',
  messagingSenderId: '867334506996',
  appId: '1:867334506996:web:86e67b2724dd0d1e0751a1',
  measurementId: 'G-0C5TL49XEW',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // // Customize notification here
  // const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: '通知があります。ご確認ください。',
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
