const { functions, admin, db, storage, firebase, firebaseConfig } = require('./init.js');

const { FBAuth, isEmail, isEmpty, validateInput, getUserDetails } = require('./exports.js');

exports.getPosts = (request, response) => { //"posts" is url showed finally

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
        .catch(e => {
            console.error(e);
            response.status(500).json({error: e.code});
        });
};

exports.doPost = (request, response) => {

    const newPost = {
        body: request.body.body, 
        userHandle: request.user.handle, 
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
};

exports.signUp = (request, response) => {

    const newUser = {
        email: request.body.email,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        handle: request.body.handle
    }
    
    let { valid, exceptions } = validateInput(newUser, 'signUp');
    if(!valid) return response.status(400).json(exceptions);

    const noImg = 'defaultProfilePicture.png'
    let userId;

    db.doc(`/users/${newUser.handle}`).get()
    .then( doc => { 
        if (doc.exists) {
            return response.status(400).json({handle: 'this handle is already taken'});
        } else {
            return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
    })
    .then(data => { // WHEN RETURNING HANDLE IN USE THIS IS PERFORMED ANYWAY
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then (token => { 
        const userCredentials = {
            handle: newUser.handle,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/ProfilePictures%2F${noImg}?alt=media`,
            userId
        };
        db.doc(`/users/${newUser.handle}`).set(userCredentials);

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
};

exports.signIn = (request, response) => {

    const user = {
        email: request.body.email,
        password: request.body.password
    }

    let { valid, exceptions } = validateInput(user, 'signIn');
    if(!valid) return response.status(400).json(exceptions);

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
};

exports.uploadImage = (request, response) => { // using busboy from npm 

    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busBoy = new BusBoy({ headers: request.headers });
    
    let imageFileName;
    let imageHolder = {};

    busBoy.on('file', (fieldname, file, filename, encoding, mimetype) => {

        if(!mimetype.includes('image')) {
            return response.status(400).json({error: 'wrong file type submitted'});
        }
        
        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${Math.round(Math.random()*100000000000)}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);

        imageHolder = { filepath, mimetype };
        file.pipe(fs.createWriteStream(filepath)); // create file
    });

    busBoy.on('finish', () => {        
        storage.bucket().upload(imageHolder.filepath, {
            resumable: false, 
            destination: `ProfilePictures/${imageFileName}`,
            metadata: {
                metadata: {
                    firebaseStorageDownloadTokens: Math.round(Math.random()*100000000000), // wozu jetzt mal ganz im ernst
                    contentType: imageHolder.mimetype
                }
            }
        })
        .then(() => {
            console.log(imageFileName);
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/ProfilePictures%2F${imageFileName}?alt=media`;
            console.error(imageUrl);
            return db.doc(`/users/${request.user.handle}`).update({ imageUrl });
        })
        .then(() => {
            return response.json({ message: 'Image uploaded succesfully' });
        })
        .catch(e => {
            console.error(e);
            return response.status(500).json({ error: e.code });
        });
    });

    busBoy.end(request.rawBody);
};

exports.addUserDetails = (request, response) => {

    db.doc(`/users/${request.user.handle}`).update(getUserDetails(request.body))
        .then(() => {
            return response.json({ message: 'Deatils added succesfully'});
        })
        .catch(e => {
            console.error(e);
            return response.status(500).json({error: e.code});
        });
};

exports.getAuthenticatedUser = (request, response) => {

    let userData = {};

    db.doc(`/users/${request.user.handle}`).get()
        .then(doc => {
            if (doc.exists) {
                userData.credentials = doc.data();
                return db.collection('likes').where('userHandle', '==', request.user.handle).get();
            }
        })
        .then(data => {
            userData.likes =[];
            data.forEach(doc => {
                userData.likes.push(doc.data());
            });
            return response.json(userData);
        })
        .catch(e => {
            console.error(e);
            return response.status(500).json({ error: e.code });
        });

};

exports.getPost = (request, response) => {

    let postData = {};
    db.doc(`/posts/${request.params.postId}`).get()
        .then(doc => {

            if(!doc.exists) {
                return response.status(404).json({ error: 'post not found'});
            } else {

                postData = doc.data();
                postData.postId = doc.id;
                db.collection('comments').orderBy('createdAt', 'desc').where('postId', '==', request.params.postId).get()
                    .then(data => {
                        postData.comments = [];
                        data.forEach(doc => {
                            postData.comments.push(doc.data());
                        });
                        return response.json(postData);
                    });
            }
        })
        .catch(e => {
            console.error(e);
            response.status(500).json({ error: e.code });
        });
};

exports.commentPost = (request, response) => {

    if(request.body.body.trim() === '') return response.status(400).json({ error: 'Must not be empty'});

    const newComment = {
        body: request.body.body,
        createdAt: new Date().toISOString(),
        postId: request.params.postId,
        userHandle: request.user.handle,
        userImage: request.user.imageUrl // to get profile pic directly from comment, no further fetching
    };

    //this needs to be removed later
    //if(newComment.userImage == undefined) newComment.userImage = "https://firebasestorage.googleapis.com/v0/b/id-ynstagram.appspot.com/o/ProfilePictures%2F11925540475.png?alt=media";

    db.doc(`/posts/${request.params.postId}`).get()
        .then(doc => {
            if(!doc.exists) {
                return response.status(404).json({ error: 'Post not found'});
            }
            return db.collection('comments').add(newComment);
        })
        .then(() => {
           response.json(newComment);
        })
        .catch(e => {
            console.error(e);
            response.status(500).json({error: 'Something went wrong here: ' + e.code});
        })
};

//check commentpost for bugs







