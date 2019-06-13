import firebase from 'firebase/app';
import 'firebase/storage';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBZXspwx1TmrNE0ULmUGcDijN2spaG7-VQ",
    authDomain: "image-upload-form.firebaseapp.com",
    databaseURL: "https://image-upload-form.firebaseio.com",
    projectId: "image-upload-form",
    storageBucket: "image-upload-form.appspot.com",
    messagingSenderId: "312767696860",
    appId: "1:312767696860:web:9d626f3f2ba4a79a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage()

  export {storage, firebase as default};