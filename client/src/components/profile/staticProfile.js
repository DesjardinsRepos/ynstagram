import React, { Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';

import styles from '../../styles/staticProfile';
import UserImage from '../base/userImage';
import UserHandle from '../base/userHandle';
import Space from '../base/space';
import Location from '../base/profile/location';
import Website from '../base/profile/website';
import Joined from '../base/profile/joined';
import Bio from '../base/profile/bio';

import getDevice from '../../hooks/getDevice';

export default withStyles(styles)( ({ classes, profile: { handle, createdAt, imageUrl, bio, website, location }}) => {

    const device = getDevice(720, 1320);

    return (
        <Fragment>
            { device === 'mobile' ? (
                <Fragment>  
                    <Space/>

                    <Paper className={classes.paper}>
                        <UserImage image={imageUrl} className={classes.imgMobile} size="150px"/>

                        <Space/>

                        <div style={{ textAlign: 'center' }}>  
                            <UserHandle userHandle={handle} variant="h4"/>
                                <Space horizontal/>

                            <Joined date={createdAt} small/>
                        </div>

                        <div className="profile-details">
                            <Space space="20px"/>

                            <Bio bio={bio}/>

                                <Space small/>
                            <Location location={location}/>

                            <Website website={website}/>
                        </div>
                    </Paper>
                </Fragment>
            ) : (

                <Fragment>  
                    <Space/>

                    <Paper className={classes.paper}>
                        <Space small/>

                        { device === 'pc' ? (
                            <UserImage image={imageUrl} className={classes.imgPc} size="150px"/>
                        ) : (
                            <UserImage image={imageUrl} className={classes.imgTablet} size="150px"/>
                        )}

                        <UserHandle userHandle={handle} variant="h4" style={{ marginLeft: 'calc(25% + 80px)'}}/>
                            <Space horizontal/>
                        <Joined date={createdAt} small/>
                            <Space space="50px"/>

                        <div className="profile-details">
                            <Grid container spacing={2} justify="center">
                                <Grid item xs={12} sm={7}>

                                    <Bio bio={bio}/>
                                </Grid>

                                    <Grid item xs={12} sm={5}>
                                    <Location location={location}/>
                                    <Website website={website}/>
                                </Grid>
                            </Grid>
                        </div>
                    </Paper>
                </Fragment>
            )}
        </Fragment>
    )
});