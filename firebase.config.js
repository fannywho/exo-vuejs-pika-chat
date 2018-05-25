import firebase from 'firebase';

// config from firebase to run on your app
var config = {
  apiKey: "AIzaSyBfj-MmnUHTsUcXoWBlchtMiQTx70NRVZw",
  authDomain: "chat-miaou-vue.firebaseapp.com",
  databaseURL: "https://chat-miaou-vue.firebaseio.com",
  projectId: "chat-miaou-vue",
  storageBucket: "chat-miaou-vue.appspot.com",
  messagingSenderId: "987211512496"
};

// call firebaseApp()to initialize connection between firebase and your app
export const firebaseApp = firebase.initializeApp(config);

// use database() everywhere you want in your app
export const database = firebase.database();

// database ref to get messages from firebase
export const messageRef = database.ref('messages');
// database ref to get users from firebase
export const usersRef = database.ref('users');
