import firebase from 'firebase/compat/app';
import "firebase/compat/database";



const firebaseConfig = {
  apiKey: "AIzaSyDlDLiBdaKErSJ-W6ntTUB2bdEwXuVea7Q",
  authDomain: "react-firebase-6a7f2.firebaseapp.com",
  projectId: "react-firebase-6a7f2",
  storageBucket: "react-firebase-6a7f2.appspot.com",
  messagingSenderId: "656676138329",
  appId: "1:656676138329:web:23a140c411290f32ccb048"
};


const fireDb= firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
