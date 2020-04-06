import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { withStyles } from '@material-ui/core/styles';
import { Typography, CardContent, CardMedia, Card } from '@material-ui/core';
import { Chat as ChatIcon }from '@material-ui/icons';

import styles from '../../styles/post';
import WrappedButton from '../wrappedButton';
import DeletePost from './deletePost';
import PostDialog from './postDialog';
import LikeButton from './likeButton';

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
        ) : (<div></div>)

        return (
            <Card className={classes.card}>

                <CardMedia className={classes.image} image={userImage} title="Profile Image"/>

                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary"> {userHandle} </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary"> {dayjs(createdAt).fromNow()} </Typography>
					<Typography variant="body1">{body}</Typography>

                    <LikeButton postId={postId}/>
                    <span>{likeCount} Likes </span>

                    <WrappedButton title="comments">
                        <ChatIcon color="primary"/>
                    </WrappedButton>
                    <span>{commentCount} comments</span>

                    <PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog}/>
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
