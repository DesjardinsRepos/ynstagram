import React from 'react';
import PropTypes from 'prop-types';

import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { LocationOn as LocationIcon, Link as LinkIcon, CalendarToday as CalendarIcon } from '@material-ui/icons';

import noImg from '../ressources/images/defaultProfilePicture.png';
import styles from '../styles/profileSkeleton';

const ProfileSkeleton = props => {

    const { classes } = props; //are global classes unused?

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={noImg} alt="profile" className="profile-image"/>
                </div>

                <hr className={classes.invisibleSeperator}/>

                <div className="profile-details">
                    <div className={classes.handle}/>

                    <hr className={classes.invisibleSeperator}/>

                    <div className={classes.fullLine}/>
                    <div className={classes.fullLine}/>
                    <div className={classes.halfLine}/>

                    <hr className={classes.invisibleSeperator}/>

                    <LocationIcon color="primary"/><span>Location</span>

                    <hr className={classes.invisibleSeperator}/>

                    <LinkIcon color="primary"/> https://website.com

                    <hr className={classes.invisibleSeperator}/>

                    <CalendarIcon color="primary"/> Joined date
                </div>
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton);
