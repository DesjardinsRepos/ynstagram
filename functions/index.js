const { functions, admin, db, firebase, app } = require('./JSExports/init.js');
const { getPosts, doPost, signUp, signIn, uploadImage } = require('./JSExports/functions.js');
const { FBAuth } = require('./JSExports/exports.js');

app.get('/posts', getPosts);

app.post('/post', FBAuth, doPost);

app.post('/signup', signUp);

app.post('/signin', signIn);

app.post('/user/image', FBAuth, uploadImage)

exports.api = functions.region('europe-west1').https.onRequest(app);

// 2:10:00