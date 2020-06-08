import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Button, Typography, Paper } from '@material-ui/core';
import {  Edit as EditIcon, ExitToApp as ExitIcon } from '@material-ui/icons';

import { logoutUser, uploadImage } from '../../redux/actions/userActions';
import styles from '../../styles/userProfile';
import EditUserDetails from './editUserDetails';
import WrappedButton from '../base/wrappedButton';
import ProfileSkeleton from '../../exports/profileSkeleton';
import UserImage from '../base/userImage';
import Location from '../base/profile/location';
import Website from '../base/profile/website';
import Joined from '../base/profile/joined';
import Bio from '../base/profile/bio';
import UserHandle from '../base/userHandle';
import Space from '../base/space';

class userProfile extends Component {

    onImageChange = event => {

        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }

    imageButtonClicked = () => {
        const element = document.getElementById('imageInput'); //replace this
        element.click();
    }

    doLogout = () => {
        this.props.logoutUser();
    }

    render() {

        const { 
            classes, 
            user: { 
                loading, 
                authenticated, 
                credentials: { handle, createdAt, imageUrl, bio, website, location }
            }
        } = this.props;

        return !loading ? (authenticated ? (

            <Paper className={classes.paper}>
                <UserImage image={imageUrl}/>
                    <Space small/>

                    <input type="file" id="imageInput" hidden="hidden" onChange={this.onImageChange}/>

                <WrappedButton title="Edit profile picture" onClick={this.imageButtonClicked} btnClassName="button">
                    <EditIcon color="primary"/>
                </WrappedButton>
                
                <div className={classes.profileDetails}>
                    <UserHandle userHandle={handle}/>
                        <Space small/>

                    <Bio bio={bio}/>
                        <Space small/>

                    <Website website={website}/>
                    <Location location={location}/>
                    <Joined date={createdAt}/>
                </div>

                <WrappedButton title="logout" onClick={this.doLogout}>
                    <ExitIcon color="primary"/>
                </WrappedButton>

                <EditUserDetails/>
            </Paper>

        ) : (

            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No Profile found, please log in again.
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/signin">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">
                        Sign up
                    </Button>
                </div>
            </Paper>

        )) : (
            <ProfileSkeleton/>
        )
    }
}

userProfile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapState = state => ({
    user: state.user
});

const mapActions = { logoutUser, uploadImage };

export default connect(mapState, mapActions)(withStyles(styles)(userProfile));
