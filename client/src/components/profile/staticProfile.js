import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { withStyles } from '@material-ui/core/styles';
import { Link as MuiLink, Paper, Typography } from '@material-ui/core';
import { LocationOn as LocationIcon, Link as LinkIcon, CalendarToday as CalendarIcon } from '@material-ui/icons';

import styles from '../../styles/staticProfile';

const StaticProfile = props => {

    const { 
        classes, 
        profile: { 
            handle, 
            createdAt, 
            imageUrl, 
            bio, 
            website, 
            location 
        } 
    } = props; // NO THIS!!

    return (
        <Paper className={classes.paper}>
                <div className={classes.profile}>

                    <div className="image-wrapper">
                        <img src={imageUrl} alt="" className="profile-image"/>
                    </div><hr/>

                    <div className="profile-details">

                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant='h5'>
                            {handle}
                        </MuiLink><hr/>

                        {bio && <Typography variant="body2">{bio}</Typography>}<hr/>

                        {location && (
                            <Fragment>
                                <LocationIcon color="primary"/>
                                <span>{location}</span>
                                <hr/>
                            </Fragment>
                        )}

                        {website && (
                            <Fragment>
                                <LinkIcon color="primary"/>
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                            </Fragment>
                        )}
                        
                        <CalendarIcon color="primary"/>{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                </div>
            </Paper>
    )

}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile);
