const { functions, admin, db, firebase, app } = require('./JSExports/init.js');
const { getPosts, doPost, signUp, signIn, uploadImage, addUserDetails, getAuthenticatedUser, getPost, commentPost } = require('./JSExports/functions.js');
const { FBAuth } = require('./JSExports/exports.js');

app.get('/posts', getPosts);
app.get('/post/:postId', getPost);
app.post('/post/:postId/comment', FBAuth, commentPost);

app.post('/post', FBAuth, doPost);


app.post('/signup', signUp);
app.post('/signin', signIn);
app.get('/user', FBAuth, getAuthenticatedUser);
app.post('/user', FBAuth, addUserDetails);
app.post('/user/image', FBAuth, uploadImage);


exports.api = functions.region('europe-west1').https.onRequest(app);

// 2:56:38