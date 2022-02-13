import React from 'react';
import ChatApp from './src/ChatApp';

// Your web app's Firebase configuration

// Initialize Firebase

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyArx1gF0aFnyOExqLtdVGwZK03-3TflPQY',
  authDomain: 'chatappv2-10ec3.firebaseapp.com',
  databaseURL: 'https://chatappv2-10ec3-default-rtdb.firebaseio.com',
  projectId: 'chatappv2-10ec3',
  storageBucket: 'chatappv2-10ec3.appspot.com',
  messagingSenderId: '151530621910',
  appId: '1:151530621910:web:1c30bb9319058e0f187277',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const App = () => {
  return <ChatApp />;
};

export default App;
