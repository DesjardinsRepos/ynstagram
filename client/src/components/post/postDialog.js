import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, TextField, Dialog,  DialogContent, DialogTitle, LinearProgress as CircularProgress } from '@material-ui/core';
import { Close as CloseIcon, ExpandMore as ExpandIcon, Chat as ChatIcon } from '@material-ui/icons';

import { connect } from 'react-redux';
import { getPost } from '../../redux/actions/dataActions';

import WrappedButton from '../wrappedButton';
import styles from '../../styles/postDialog';
import LikeButton from './likeButton';
import Comments from './comments';
import CommentForm from './commentForm';

class PostDialog extends Component {

    state = {
        open: false
    }

    doOpen = () => {
        this.setState({ open: true });
        this.props.getPost(this.props.postId);
    }

    doClose = () => {
        this.setState({ open: false });
    }

    render() {
        const {
            classes, 
            post: { postId,body, createdAt, likeCount, commentCount, userImage, userHandle, comments },
            ui: { loading }
        } = this.props;

        const dialogContent = !loading ? (
            <Fragment>
                <Grid container spacing={1}>
                    <Grid item sm={3}>
                        <img src={userImage} alt="Profile" className={classes.profileImage}/>
                    </Grid>
                    <Grid item sm={7} className={classes.userInfo}>
                        <Typography component={Link} to={`/users/${userHandle}`} color="primary" variant="h5">
                            {userHandle}
                        </Typography>
                    
                        <hr className={classes.invisibleSeperator}/>

                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>

                        <hr className={classes.invisibleSeperator}/>

                        <LikeButton postId={postId}/> <span>{likeCount} likes</span>

                        <WrappedButton title="comments">
                            <ChatIcon color="primary"/>
                        </WrappedButton>
                        <span>{commentCount} comments</span>

                    </Grid>
                    <Typography variant="body1" className={classes.body}>
                        {body}
                    </Typography>

                    <CommentForm postId={postId}/>
                </Grid>
                
                <Comments comments={comments}/>

            </Fragment>

        ) : ( 
        <div className={classes.placeholder}></div> 
        )

        return (
            <Fragment>
                <WrappedButton onClick={this.doOpen} title="See more" tipClassName={classes.expandButton}>
                    <ExpandIcon color="primary"/>
                </WrappedButton>

                <Dialog open={this.state.open} onClose={this.doClose} fullWidth maxWidth="sm">

                    {loading && (<CircularProgress size={30} className={classes.progress}/>)}

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
    postId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
}

const mapState = state => ({
    post: state.data.post,
    ui: state.ui
});

const mapActions = {
    getPost
};

export default connect(mapState, mapActions)(withStyles(styles)(PostDialog));