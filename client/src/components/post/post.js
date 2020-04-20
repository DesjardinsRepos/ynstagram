import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { CardContent, CardMedia, Card } from '@material-ui/core';

import styles from '../../styles/post';
import DeletePost from './deletePost';
import PostDialog from './postDialog';
import LikeButton from './likeButton';
import CommentButton from '../base/commentButton';
import PostBody from '../base/postBody';
import Date from '../base/date';
import UserHandle from '../base/userHandle';

class post extends Component {

    render() {

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

                    <UserHandle userHandle={userHandle}/>
                    
                    <Date date={createdAt} mode='fromNow'/>

                    <PostBody body={body} className={classes.body}/>

                    <div>
                        <LikeButton postId={postId} padding='0'/> <span>{likeCount}</span>

                        <CommentButton postId={postId} userHandle={userHandle} openDialog={this.props.openDialog} count={commentCount}/>

                        <PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog} type="expand"/>

                        {deleteButton}
                    </div>
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
