import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { withStyles } from '@material-ui/core/styles';
import { Typography, CardContent, CardMedia, Card } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import HearthFilled from '@material-ui/icons/Favorite';
import HearthEmpty from '@material-ui/icons/FavoriteBorder';

import { likePost, unlikePost } from '../redux/actions/dataActions';
import styles from '../styles/post';
import WrappedButton from './wrappedButton';
import DeletePost from './deletePost';

class post extends Component {

    likedPost = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.post.postId))
            return true;
        else return false;
    }

    likePost = () => {
        this.props.likePost(this.props.post.postId);
    }

    unlikePost = () => {
        this.props.unlikePost(this.props.post.postId);
    }

    render() {
        dayjs.extend(relativeTime); // add plugin

        const {  classes, 
                 post : { 
                     body, 
                     createdAt,  
                     userImage, 
                     userHandle, 
                     postId, 
                     likeCount, 
                     commentCount
                 }, 
                 user: {
                     authenticated,
                     credentials: { 
                         handle
                     }
                 }
              } = this.props  

        const likeButton = !authenticated ? (
            <WrappedButton title="Like">
                <Link to="/signin">
                    <HearthEmpty color="primary"/>
                </Link>
            </WrappedButton>
        ) : (
            this.likedPost() ? (
                <WrappedButton title="remove Like" onClick={this.unlikePost}>
                    <HearthFilled color="primary"/>
                </WrappedButton>
            ) : (
                <WrappedButton title="Like" onClick={this.likePost}>
                    <HearthEmpty color="primary"/>
                </WrappedButton>
            )
        )

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

                    {likeButton}
                    <span>{likeCount} Likes </span>

                    <WrappedButton title="comments">
                        <ChatIcon color="primary"/>
                    </WrappedButton>
                    <span>{commentCount} comments</span>
                </CardContent>

            </Card>
        )
    }
}
post.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}


const mapState = state => ({
    user: state.user
})

const mapActions = {
    likePost,
    unlikePost
}

export default connect(mapState, mapActions)(withStyles(styles)(post));
