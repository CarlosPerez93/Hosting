importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyANI5uT2bEPnMpIHtra8KKtWB_HqNUjHyA",
  authDomain: "iivo-eceb1.firebaseapp.com",
  projectId: "iivo-eceb1",
  storageBucket: "iivo-eceb1.appspot.com",
  messagingSenderId: "110776237075",
  appId: "1:110776237075:web:2e15b694e22cb7d02b13e6",
  measurementId: "G-KJFNCG84Q7",
};

firebase.initializeApp(firebaseConfig);

messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  if (event.action) {
    clients.openWindow(event.action);
  }
  event.notification.close();
});
