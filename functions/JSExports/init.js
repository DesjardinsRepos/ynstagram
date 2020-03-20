const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
const firebase = require('firebase');
const app = require('express')(); // requires express and creates new object

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://id-ynstagram.firebaseio.com",
    storageBucket: 'id-ynstagram.appspot.com'
});

const db = admin.firestore();
const storage = admin.storage();

const firebaseConfig = { 
    apiKey: "AIzaSyADmS0dA7kLROFR0in1K-9m4KB9hOozYuQ", 
    authDomain: "id-ynstagram.firebaseapp.com", 
    databaseURL: "https://id-ynstagram.firebaseio.com", 
    projectId: "id-ynstagram", 
    storageBucket: "id-ynstagram.appspot.com", 
    messagingSenderId: "886652971045", 
    appId: "1:886652971045:web:30a9a78a77d3c6ca4737cc", 
    measurementId: "G-MX1GED61B5" 
};
firebase.initializeApp(firebaseConfig);


module.exports = { functions, admin, db, storage, firebaseConfig, firebase, app };

