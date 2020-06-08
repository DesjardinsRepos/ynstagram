import React, { Fragment, useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Dialog,  DialogContent, LinearProgress as Progress } from '@material-ui/core';
import { Close as CloseIcon, ExpandMore as ExpandIcon, Chat as ChatIcon } from '@material-ui/icons';

import { connect } from 'react-redux';
import { getPost, clearErrors } from '../../redux/actions/dataActions';

import WrappedButton from '../base/wrappedButton';
import styles from '../../styles/postDialog';
import LikeButton from './likeButton';
import CommentButton from '../base/commentButton';
import Comments from './comments';
import CommentForm from './commentForm';
import Date from '../base/date';
import UserHandle from '../base/userHandle';
import PostBody from '../base/postBody';
import UserImage from '../base/userImage';
import Space from '../base/space';

const mapState = state => ({
    post: state.data.post,
    ui: state.ui
});

const mapActions = {
    getPost: getPost,
    clearErrors: clearErrors
};

export default connect(mapState, mapActions)((withStyles(styles)(({ type, postId, userHandle, openDialog, post, ui, getPost, clearErrors, classes }) => {

    const [ open, setOpen ] = useState(false);
    const [ oldPath, setOldPath ] = useState('');
    const [ newPath, setNewPath ] = useState('');

    const doOpen = () => {
        let oldPath = window.location.pathname, newPath = `/users/${userHandle}/post/${postId}`;
        if(oldPath === newPath) oldPath = `/users/${userHandle}`;

        window.history.pushState(null, null, newPath);

        setNewPath(newPath);   
        setOldPath(oldPath);

        getPost(postId);
        setOpen(true);
    };

    const doClose = () => {

        window.history.pushState(null, null, oldPath);
        setOpen(false);
        clearErrors();
    };

    useEffect(() => {
        if (openDialog) doOpen();
    });   

    const { body, createdAt, likeCount, commentCount, userImage, comments } = post;
    const { loading } = ui;

    return(  
        <Fragment>
            <WrappedButton onClick={doOpen} title={type === "expand" ? "See more" : "Show comments"} tipClassName={classes.expandButton}>
                {type === "expand" ? <ExpandIcon color="primary"/> : <ChatIcon color="primary"/>}
            </WrappedButton>

            <Dialog open={open} onClose={doClose} fullWidth maxWidth="sm" className={classes.dialog}>

                {loading && (<Progress size={30} className={classes.progress}/>)}

                <WrappedButton title="Close" onClick={doClose} tipClassName={classes.closeButton}>
                    <CloseIcon/>
                </WrappedButton>

                <DialogContent className={classes.dialogContent}>
                    {!loading ? (
                        <Fragment>
                            <Grid container spacing={1}>
                                <Grid item sm={4}>

                                    <UserImage image={userImage} size="calc(90px + 1vw)" maxSize="120px"/>
                                </Grid>
                                <Grid item sm={8} className={classes.userInfo}>

                                    <UserHandle userHandle={userHandle}/>
                                    <Date date={createdAt}/>
                                    <LikeButton postId={postId} padding='0'/> <span>{likeCount}</span>
                                    <CommentButton count={commentCount}/>
                                </Grid>
                            </Grid>
                        
                            <PostBody body={body} className={classes.body}/>
                            <CommentForm postId={postId} userHandle={userHandle}/>
                                <Space small/>
                            
                            <Comments comments={comments}/>
                                <Space small/>
                        </Fragment>

                    ) : ( 
                        <Space space="200px"/>
                    )}
                </DialogContent>
            </Dialog>
        </Fragment>
    )
})));
