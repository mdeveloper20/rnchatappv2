import React from 'react';
import ChatApp from './src/ChatApp';
import {initializeApp} from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBU0ineUYdpLPBB9dTldNxkSLx4kVdyrq0',
  authDomain: 'chat2020-6725a.firebaseapp.com',
  databaseURL: 'https://chat2020-6725a.firebaseio.com',
  projectId: 'chat2020-6725a',
  storageBucket: 'chat2020-6725a.appspot.com',
  messagingSenderId: '428637473414',
  appId: '1:428637473414:web:2adf43974660f923961f07',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const App = () => {
  return <ChatApp />;
};

export default App;
