const { functions, admin, db, firebase, app } = require('./JSExports/init.js');
const { getPosts, doPost, signUp, signIn, uploadImage, addUserDetails, getAuthenticatedUser, 
        getPost, commentPost, likePost, unlikePost } = require('./JSExports/functions.js');
const { FBAuth } = require('./JSExports/exports.js');

app.get('/posts', getPosts);
app.get('/post/:postId', getPost);
app.post('/post', FBAuth, doPost);

app.post('/post/:postId/comment', FBAuth, commentPost);
app.get('/post/:postId/like', FBAuth, likePost);
app.get('/post/:postId/unlike', FBAuth, unlikePost);

app.post('/signup', signUp);
app.post('/signin', signIn);
app.get('/user', FBAuth, getAuthenticatedUser);
app.post('/user', FBAuth, addUserDetails);
app.post('/user/image', FBAuth, uploadImage);


exports.api = functions.region('europe-west1').https.onRequest(app);

// 3:20:00