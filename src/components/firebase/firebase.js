import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyANI5uT2bEPnMpIHtra8KKtWB_HqNUjHyA",
  authDomain: "iivo-eceb1.firebaseapp.com",
  projectId: "iivo-eceb1",
  storageBucket: "iivo-eceb1.appspot.com",
  messagingSenderId: "110776237075",
  appId: "1:110776237075:web:2e15b694e22cb7d02b13e6",
  measurementId: "G-KJFNCG84Q7",
};
initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey: `BD8e0zirtZLt0CCVeSZiVhhe_vEM3qSiXsWcVQnFUngNDiwmrvq7SAC41-yirAng-udxKfYEFHwHUIAJMlgVWi0`,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("Token : ", currentToken);
        return currentToken;
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
      // console.log("[firebase-messaging-sw.js] Received  message ", payload);
    });
  });
