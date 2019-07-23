import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB9ddeBgRtiM0qWYwRDrdjJ2oPkzy91obM",
    authDomain: "bingo-5724e.firebaseapp.com",
    databaseURL: "https://bingo-5724e.firebaseio.com",
    projectId: "bingo-5724e",
    storageBucket: "bingo-5724e.appspot.com",
    messagingSenderId: "348168330140",
    appId: "1:348168330140:web:53270948a2bb66bc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
