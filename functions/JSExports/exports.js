const { admin, db } = require('./init.js');


const isEmpty = (string) => {

    if (string.trim() === '') return true
    else return false;
} 

const isEmail = (email) => {

    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegEx)) return true; else return false;
}

const validateInput = (user, type) => {

    let exceptions = {};

    if (type === 'signUp') {

        if (isEmpty(user.email)) exceptions.email = 'Email must not be empty';
        else if (!isEmail(user.email)) exceptions.email = 'Must be a valid email adress';

        if (isEmpty(user.password)) exceptions.password = 'Password must not be empty';
        else if (user.password !== user.confirmPassword) exceptions.confirmPassword = 'Passwords are not the same';

        if (isEmpty(user.handle)) exceptions.handle = 'Username must not be empty';

        return {
            exceptions,
            valid: Object.keys(exceptions).length === 0 ? true : false
        }
    }
    else if (type === 'signIn') {

        if(isEmpty(user.email)) exceptions.email = 'Email must not be empty';
        if(isEmpty(user.password)) exceptions.password = 'Password must not be empty';

        return {
            exceptions,
            valid: Object.keys(exceptions).length === 0 ? true : false
        }
    }
}

const FBAuth = (request, response, next) => {

    let idToken;

    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
        idToken = request.headers.authorization.split('Bearer ')[1];

    } else {
        console.error('No token found');
        return response.status(403).json({error: 'Unauthorized'});
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => { 
            request.user = decodedToken; //middleware adds decoded token to request data
            return db.collection('users').where('userId', '==', request.user.uid).limit(1).get();
        })
        .then(data => {
            request.user.handle = data.docs[0].data().handle; // data() extracts data from doc[]
            request.user.imageUrl = data.docs[0].data().imageUrl;
            return next();
        })
        .catch(e => {
            console.error('Error while verifying token ', e);
            response.status(403).json(e); // e is already a json so no fancy {} stuff
        });
}

const getUserDetails = data => {
    let userDetails = {};

    if(!isEmpty(data.bio.trim())) userDetails.bio = data.bio;

    if(!isEmpty(data.website.trim())) {

        if(data.website.trim().substring(0, 4) !== 'http') {
            userDetails.website = `http://${data.website.trim()}`;

        } else {
            userDetails.website = data.website;
        }
    }
    
    if(!isEmpty(data.location.trim())) userDetails.location = data.location;

    return userDetails;
}

module.exports = { FBAuth, isEmail, isEmpty, validateInput, getUserDetails };