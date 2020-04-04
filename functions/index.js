const { functions, admin, db, firebase, app } = require('./JSExports/init.js');
const { getPosts, doPost, signUp, signIn, uploadImage, addUserDetails, getAuthenticatedUser, 
        getPost, commentPost, likePost, unlikePost, deletePost, getUserDetails, markNotificationsRead } = require('./JSExports/functions.js');
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
app.get('/user/:handle', getUserDetails);
app.post('/notifications', FBAuth, markNotificationsRead);


exports.api = functions.region('europe-west1').https.onRequest(app);

//db triggers

exports.commentNotification = functions.region('europe-west1').firestore.document('comments/{id}') 
    .onCreate((snapshot) => {

        return db.doc(`/posts/${snapshot.data().postId}`).get()
        	.then(doc => {

				if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle) { // dont get notifications by commenting own posts
					return db.doc(`/notifications/${snapshot.id}`).set({
						createdAt: new Date().toISOString(),
						recipient: doc.data().userHandle,
						sender: snapshot.data().userHandle,
						type: 'comment', // remove that later
						read: false,
						postId: doc.id
					});
				}
			})
			.catch(e => console.error(e));
	})
	
exports.onProfilePictureChange = functions.region('europe-west1').firestore.document('/users/{userId}')
	.onUpdate((change) => {

		if(change.before.data().imageUrl !== change.after.data().imageUrl) {

			const batch = db.batch();
			return db.collection('posts').where('userHandle', '==', change.before.data().handle).get()
				.then(data => {
					data.forEach(doc => {
						const post = db.doc(`/posts/${doc.id}`);
						batch.update(post, { userImage: change.after.data().imageUrl});
					})
					return batch.commit();
				});
			// delete old picture

		} else {
			return true;
		}
	})

exports.onPostDelete = functions.region('europe-west1').firestore.document('/posts/{postId}')
	.onDelete((snapshot, context) => {

		const postId = context.params.postId;
		const batch = db.batch();

		return db.collection('comments').where('postId', '==', postId).get()
			.then(data => {
				data.forEach(doc => {
					batch.delete(db.doc(`/comments/${doc.id}`));
				})
				return db.collection('likes').where('postId', '==', postId).get();
			})
			.then(data => {
				data.forEach(doc => {
					batch.delete(db.doc(`/likes/${doc.id}`));
				})
				return db.collection('notifications').where('postId', '==', postId).get();
			})
			.then(data => {
				data.forEach(doc => {
					batch.delete(db.doc(`/notifications/${doc.id}`));
				})
				return batch.commit();
			})
			.catch(e => {
				console.error(e);
			});
	})

// 9:50:00