import React, { Fragment } from 'react';
import { connect } from 'react-redux';

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

const mapState = state => ({ // i dont know why, but the website is somehow buggy without this. its not even used in this code
    user: state.user
})

export default connect(mapState)(withStyles(styles)( ({ classes, post, openDialog, post : 
    { body, createdAt, userImage, userHandle, postId, likeCount, commentCount }}) => {

    const onProfileView = window.location.pathname.includes('/users/'); // if compnent is rendered on profile 

    return(
        <Card className={classes.card}>
            <CardContent className={classes.content}>

                    <Grid container spacing={2} justify="center">
                        { onProfileView ? (  
                            <Fragment>
                                <Date date={createdAt} mode="fromNow"/>
                                <Space small/>
                            </Fragment>
                        ) : (

                            <Grid item xs={12} sm={3} style={{ textAlign: 'center'}}>
                                <UserImage image={userImage} size="100px"/>
                                    <Space small/>
                                <UserHandle userHandle={userHandle}/>
                                <Date date={createdAt} mode='fromNow'/>
                            </Grid>
                        )}

                        <Grid item xs={12} sm={ onProfileView ? 12 : 9 } className={classes.right}>
                            <PostBody body={body} className={classes.body}/>
                                <Space space="50px"/>

                            <div className={classes.interaction}>
                                <LikeButton postId={postId} padding='0'/> <span>{likeCount}</span>
                                <CommentButton postId={postId} userHandle={userHandle} count={commentCount}/>
                                <PostDialog postId={postId} userHandle={userHandle} openDialog={openDialog} type="expand"/>
                                <DeletePost post={post}/>
                            </div>
                        </Grid>
                    </Grid>
            </CardContent>
        </Card>
    )
}));
