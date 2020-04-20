import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

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

class PostDialog extends Component {

    state = {
        open: false,
        oldPath: '', 
        newPath: ''
    }

    componentDidMount() {
        if(this.props.openDialog) {
            this.doOpen();
        }
    }

    doOpen = () => {

        const { userHandle, postId } = this.props;

        let oldPath = window.location.pathname, newPath = `/users/${userHandle}/post/${postId}`;
        if(oldPath === newPath) oldPath = `/users/${userHandle}`;

        window.history.pushState(null, null, newPath);

        this.setState({ open: true, oldPath, newPath });
        this.props.getPost(this.props.postId);
    }

    doClose = () => {

        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
    }

    render() {
        const {
            classes, 
            post: { postId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments },
            ui: { loading }
        } = this.props;

        const dialogContent = !loading ? (
            <Fragment>
                <Grid container spacing={1}>
                    <Grid item sm={4}>
                        <UserImage image={userImage} size="110px"/>
                    </Grid>
                    <Grid item sm={8} className={classes.userInfo}>

                        <UserHandle userHandle={userHandle}/>
                    
                        <Date date={createdAt}/>

                        <LikeButton postId={postId} padding='0'/> <span>{likeCount}</span>

                        <CommentButton count={commentCount}/>
                    </Grid>

                    <PostBody body={body} className={classes.body}/>

                    <CommentForm postId={postId} userHandle={userHandle}/>
                </Grid>
                
                <Comments comments={comments}/>

                <br className={classes.invisibleSeperator}/>

            </Fragment>

        ) : ( 
            <div className={classes.placeholder}></div> 
        )

        return (
            <Fragment>
                <WrappedButton onClick={this.doOpen} title={this.props.type === "expand" ? "See more" : "Show comments"} tipClassName={classes.expandButton}>
                    {this.props.type === "expand" ? <ExpandIcon color="primary"/> : <ChatIcon color="primary"/>}
                </WrappedButton>

                <Dialog open={this.state.open} onClose={this.doClose} fullWidth maxWidth="sm">

                    {loading && (<Progress size={30} className={classes.progress}/>)}

                    <WrappedButton title="Close" onClick={this.doClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </WrappedButton>

                    <DialogContent className={classes.dialogContent}>
                        {dialogContent}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired, 
    userHandle: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,

    type: PropTypes.string
};

const mapState = state => ({
    post: state.data.post,
    ui: state.ui
});

const mapActions = {
    getPost,
    clearErrors
};

export default connect(mapState, mapActions)(withStyles(styles)(PostDialog));