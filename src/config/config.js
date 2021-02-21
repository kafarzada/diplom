import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

  var firebaseConfig = {
    apiKey: "AIzaSyBuRoYCi_2hUKL8TgNJQMf2ZeNC89FSC8I",
    authDomain: "diplom-b45da.firebaseapp.com",
    projectId: "diplom-b45da",
    storageBucket: "diplom-b45da.appspot.com",
    messagingSenderId: "883805923042",
    appId: "1:883805923042:web:0d8707742fc359e40ce0bb",
    measurementId: "G-11DY8P2T4M"
  };

  firebase.initializeApp(firebaseConfig)
  firebase.firestore().settings({
    timestampsInSnapshots: true
  })

  export default firebase
  