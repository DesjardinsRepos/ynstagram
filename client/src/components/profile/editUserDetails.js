import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Edit as EditIcon } from '@material-ui/icons';

import styles from '../../styles/userProfile';
import WrappedButton from '../base/wrappedButton';
import { editUserDetails } from '../../redux/actions/userActions';

class EditUserDetails extends Component {

    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    mapUserDetailsToState(credentials) {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        });
    }

    doOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.credentials);
    }

    doClose = () => {
        this.setState({ open: false });
    }

    doSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.doClose();
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount() {

        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }

    render() {

        const { classes } = this.props;

        return (
            <Fragment>  
                <WrappedButton title="Edit details" onClick={this.doOpen} btnClassName={classes.button}>
                        <EditIcon color="primary"/>
                </WrappedButton>

                <Dialog open={this.state.open} onClose={this.onClose} fullWidth maxWidth="sm">

                    <DialogTitle>Edit your profile Information</DialogTitle>
                    
                    <DialogContent>
                        <form>
                            <TextField name="bio" type="text" label="bio" multiline rows="3" placeholder="Write something about yourself" 
                            className={classes.textField} value={this.state.bio} fullWidth onChange={this.onChange}/>

                            <TextField name="website" type="text" label="website" placeholder="your own website" 
                            className={classes.textField} value={this.state.website} fullWidth onChange={this.onChange}/>
                            
                            <TextField name="location" type="text" label="location" placeholder="where you currently live" 
                            className={classes.textField} value={this.state.location} fullWidth onChange={this.onChange}/>
                        </form>
                    </DialogContent>

                    <DialogActions> 
                        <Button onClick={this.doClose} color="primary">cancel</Button>
                        <Button onClick={this.doSubmit} color="primary">submit</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditUserDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapState = state => ({
    credentials: state.user.credentials
})

export default connect(mapState, { editUserDetails })(withStyles(styles)(EditUserDetails));
