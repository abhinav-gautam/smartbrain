import firebase from 'firebase/app';
import 'firebase/storage';

  // Your web app's Firebase configuration
  //{FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_STORAGE_BUCKET, FIREBASE_PROJECT_ID, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID}=process.env
  var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN ,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: "image-upload-form.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage()

  export {storage, firebase as default};