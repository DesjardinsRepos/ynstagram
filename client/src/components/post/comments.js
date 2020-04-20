import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import styles from '../../styles/comments';
import UserImage from '../base/userImage';

class Comments extends Component {
    render() {

        const { comments, classes } = this.props;

        return (
            <Grid container>
                {comments.map(comment => {
                    
                    const { body, createdAt, userImage, userHandle } = comment;

                    return (
                        <Fragment key={createdAt}>

                            <hr className={classes.visibleSeperator}/>

                            <Grid item sm={12} style={{ marginBottom: '10px'}}>
                                <Grid container className={classes.grid}>

                                    <Grid item sm={2}>
                                        <UserImage image={userImage} size="80px"/>
                                    </Grid>

                                    <Grid item sm={10}>
                                        <div className={classes.commentBody}>
                                            <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
                                                {userHandle}
                                            </Typography>

                                            <Typography variant="body2" color="textSecondary">
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>

                                            <hr className={classes.invisibleSeperator}/>

                                            <Typography variant="body1">{body}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Fragment>
                    )
                })}
            </Grid>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments);
