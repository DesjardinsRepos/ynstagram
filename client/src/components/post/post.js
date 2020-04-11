import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { withStyles } from '@material-ui/core/styles';
import { Typography, CardContent, CardMedia, Card } from '@material-ui/core';

import styles from '../../styles/post';
import DeletePost from './deletePost';
import PostDialog from './postDialog';
import LikeButton from './likeButton';
import CommentButton from '../lowLevel/commentButton';
import PostBody from '../lowLevel/postBody';

class post extends Component {

    render() {
        dayjs.extend(relativeTime); // add plugin

        const { 
            classes, 
            post : { body, createdAt, userImage, userHandle, postId, likeCount, commentCount }, 
            user: { 
                authenticated, 
                credentials: { handle }
            }
        } = this.props  

        const deleteButton = authenticated && userHandle === handle ? (
            <DeletePost postId={postId}/>
        ) : (null)

        return (
            <Card className={classes.card}>

                <CardMedia className={classes.image} image={userImage} title="Profile Image"/>

                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary"> {userHandle} </Typography>
                    
                    <PostBody body={body} date={createdAt}/>

                    <LikeButton postId={postId} padding='5px'/> <span>{likeCount}</span>

                    <CommentButton count={commentCount}/>

                    <PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog}/>

                    {deleteButton}
                </CardContent>

            </Card>
        )
    }
}

post.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapState = state => ({
    user: state.user
})

export default connect(mapState)(withStyles(styles)(post));
