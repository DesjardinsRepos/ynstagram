import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { Typography, CardContent, CardMedia, Card } from '@material-ui/core';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import styles from '../styles/post';

class post extends Component {
    render() {
        dayjs.extend(relativeTime); // add plugin

        const { classes, post : { body, createdAt,  userImage, userHandle, postId, likeCount, commemtCount} } = this.props  //= const classes = this.props.classes 

        return (
            <Card className={classes.card}>

                <CardMedia className={classes.image} image={userImage} title="Profile Image"/>

                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary"> {userHandle} </Typography>
                    <Typography variant="body2" color="textSecondary"> {dayjs(createdAt).fromNow()} </Typography>
					<Typography variant="body1">{body}</Typography>
                </CardContent>

            </Card>
        )
    }
}

export default withStyles(styles)(post);
