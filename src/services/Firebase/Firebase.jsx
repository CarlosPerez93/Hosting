import React from 'react'
import { FirebaseProvider } from '@useweb/use-firebase'
import firebase from "firebase/compat/app";
import { getMessaging } from 'firebase/messaging';
import { firebaseConfig } from '../../common/utils/firebaseConfig'


const firebaseApp = firebase.initializeApp(firebaseConfig)
const messaging = getMessaging(firebaseApp)

const envIsDev = process.env.NODE_ENV === 'development'

const vapidKey = 'BD8e0zirtZLt0CCVeSZiVhhe_vEM3qSiXsWcVQnFUngNDiwmrvq7SAC41-yirAng-udxKfYEFHwHUIAJMlgVWi0' // vapidKey is required

export default function Firebase({ children }) {
  return (
    <FirebaseProvider
      firebaseConfig={firebaseConfig}
      firebaseApp={firebaseApp}
      envIsDev={envIsDev}
      messaging={messaging}
      messagingOptions={{
        vapidKey,
      }}
    >
      {children}
    </FirebaseProvider>
  )
}