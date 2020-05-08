import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { CardContent, Card,  Grid } from '@material-ui/core';

import styles from '../../styles/post';
import DeletePost from './deletePost';
import PostDialog from './postDialog';
import LikeButton from './likeButton';
import CommentButton from '../base/commentButton';
import PostBody from '../base/postBody';
import Date from '../base/date';
import UserHandle from '../base/userHandle';
import UserImage from '../base/userImage';
import Space from '../base/space';

class post extends Component {

    render() {

        const { 
            classes, 
            post, 
            post : { body, createdAt, userImage, userHandle, postId, likeCount, commentCount }, 
            user: { 
                authenticated, 
                credentials: { handle }
            }
        } = this.props 
        
        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>

                    <Grid container spacing={2} justify="center">

                        <Grid item xs={12} sm={3} style={{ textAlign: 'center'}}>
                            <UserImage image={userImage} size="100px"/>
                                <Space small/>
                            <UserHandle userHandle={userHandle}/>
                            <Date date={createdAt} mode='fromNow'/>
                        </Grid>

                        <Grid item xs={12} sm={9} className={classes.right}>
                            <PostBody body={body} className={classes.body}/>
                                <Space space="50px"/>

                            <div className={classes.interaction}>

                                <LikeButton postId={postId} padding='0'/> <span>{likeCount}</span>
                                <CommentButton postId={postId} userHandle={userHandle} openDialog={this.props.openDialog} count={commentCount}/>
                                <PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog} type="expand"/>
                                <DeletePost post={post}/>
                            </div>
                        </Grid>
                    </Grid>
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
