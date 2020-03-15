const functions = require('firebase-functions');

const admin = require('firebase-admin');
const serviceAccount = require("C:\\Users\\Fabian\\source\\repos\\ynstagram\\functions\\serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://id-ynstagram.firebaseio.com"
});

const db = admin.firestore();

const app = require('express')(); // requires express and creates new object

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
const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const isEmpty = (string) => {
    if (string.trim() === '') return true
    else return false;
} 
const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegEx)) return true; else return false;
}
const validateInput = (email, password, confirmPassword, handle) => {

    let exceptions = {};

    if (isEmpty(email)) exceptions.email = 'Email must not be empty';
    else if (!isEmail(email)) exceptions.email = 'Must be a valid email adress';

    if (isEmpty(password)) exceptions.password = 'Password must not be empty';
    else if (password !== confirmPassword) exceptions.confirmPassword = 'Passwords are not the same';

    if (isEmpty(handle)) exceptions.handle = 'Username must not be empty';

    return exceptions;
}


app.get('/posts', (request, response) => { //"posts" is url showed finally
    db.collection('posts').orderBy('createdAt', 'desc').get()
        .then(data => { 
            let posts = [];
            data.forEach(doc => {
                posts.push({
                    postId: doc.id,
                    ...doc.data() // return all properties
                });
            });
            return response.json(posts);
        })
        .catch(e => console.error(e));
})

app.post('/post', (request, response) => {
    const newPost = {
        body: request.body.body, 
        userHandle: request.body.userHandle, 
        createdAt: new Date().toISOString()
    };

    db.collection('posts').add(newPost)
        .then(doc => {
            response.json({ message: `document ${doc.id} created sucessfully`});
        })
        .catch(e => {
            response.status(500).json({error: 'something went wrong'})
            console.error(e);
        });
});



app.post('/signup', (request, response) => {
    const newUser = {
        email: request.body.email,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        handle: request.body.handle
    }
    
    let exceptions = validateInput(newUser.email, newUser.password, newUser.confirmPassword, newUser.handle);
    if (Object.keys(exceptions).length > 0) return response.status(400).json(exceptions);

    let token, userId;
    db.doc(`/users/${newUser.handle}`).get()
    .then( doc => { 
        if (doc.exists) {
            return response.status(400).json({hadle: 'this handle is already taken'});
        } else {
            return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
    })
    .then(data => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then (idToken => { // idtoken is from previous return
        token = idToken;
        const userCredentials = {
            handle: newUser.handle,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            userId
        };
        return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
        return response.status(201).json({ token });
    })
    .catch(e => {

        console.error(e);
        if (e.code === 'auth/email-already-in-use') {
            return response.status(400).json({email: 'Email is already in use' });
        } else {
            return response.status(500).json({error: e.code});
        }
    })
});

app.post('/login', (request, response) => {
    const user = {
        email: request.body.email,
        password: request.body.password
    }

    let exceptions = {};

    if(isEmpty(user.email)) exceptions.email = 'Email must not be empty';
    if(isEmpty(user.password)) exceptions.password = 'Password must not be empty';

    if(Object.keys(exceptions).length > 0) return response.status(400).json(exceptions);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return response.json({token});
        })
        .catch(e => {
            console.error(e);

            if(e.code === 'auth/wrong-password') 
                return response.status(403).json({general: 'Wrong password'});

            else return response.status(500).json({error: e.code});
        })
})


exports.api = functions.region('europe-west1').https.onRequest(app);

// 1:19:33