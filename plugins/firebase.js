// src/firebase.js
import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// import { getStorage } from 'firebase/storage'



const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  // measurementId: process.env.FIREBASE_MEASUREMENT_ID
}


if (process.env.NODE_ENV == 'development') {  
  console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
  console.log('Project name:', process.env.FIREBASE_PROJECT_ID)
  console.log('firebaseConfig:', firebaseConfig);
};


const app = initializeApp(firebaseConfig)
// const firebaseAuth = getAuth(app)
const db = getFirestore(app);
// const storage = getStorage(app);
// console.debug('firebaseAuth', firebaseAuth)


export { db }

// export { firebaseAuth, db, storage }