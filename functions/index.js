const { functions, admin, db, firebase, app } = require('./JSExports/init.js');
const { getPosts, doPost, signUp, signIn, uploadImage, addUserDetails, getAuthenticatedUser, 
        getPost, commentPost, likePost, unlikePost, deletePost } = require('./JSExports/functions.js');
const { FBAuth } = require('./JSExports/exports.js');


app.get('/posts', getPosts);
app.get('/post/:postId', getPost);
app.post('/post', FBAuth, doPost);
app.delete('/post/:postId', FBAuth, deletePost);

app.post('/post/:postId/comment', FBAuth, commentPost);
app.get('/post/:postId/like', FBAuth, likePost);
app.get('/post/:postId/unlike', FBAuth, unlikePost);

app.post('/signup', signUp);
app.post('/signin', signIn);
app.get('/user', FBAuth, getAuthenticatedUser);
app.post('/user', FBAuth, addUserDetails);
app.post('/user/image', FBAuth, uploadImage);


exports.api = functions.region('europe-west1').https.onRequest(app);

exports.commentNotification = functions.region('europe-west1').firestore.document('comments/{id}') // using db trigger
    .onCreate((snapshot) => {
        db.doc(`/posts/${snapshot.data().postId}`).get()
        .then(doc => {
			if(doc.exists) {
				return db.doc(`/notifications/${snapshot.id}`).set({
					createdAt: new Date().toISOString(),
					recipient: doc.data().userHandle,
					sender: snapshot.data().userHandle,
					type: 'comment', 
					read: false,
					postId: doc.id
				});
			}
		})
		.then(() => {
			return;
		})
		.catch(e => {
			console.error(e);
			return;
		});
    });

// 3:37:00