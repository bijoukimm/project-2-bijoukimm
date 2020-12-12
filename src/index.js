import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DOGS from './Breeds.json';
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

ReactDOM.render(<BrowserRouter><App dogs={DOGS}/></BrowserRouter>, document.getElementById('root')); 
// we need to add a 'root' section in our html
// also set the prop element for App

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAEf59xIcwMnVvvheQYc4K6_kbQkz4wmOU",
    authDomain: "care-for-paws-8d7e4.firebaseapp.com",
    projectId: "care-for-paws-8d7e4",
    storageBucket: "care-for-paws-8d7e4.appspot.com",
    messagingSenderId: "138517543912",
    appId: "1:138517543912:web:043a2b9aadf3c60825425d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

