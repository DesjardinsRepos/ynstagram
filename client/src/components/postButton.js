import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Button, TextField, Dialog,  DialogContent, DialogTitle, CircularProgress } from '@material-ui/core';
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons';

import { connect } from 'react-redux';
import { createPost, clearErrors } from '../redux/actions/dataActions';

import WrappedButton from './base/wrappedButton';
import styles from '../styles/postButton';

class postButton extends Component {

    state = {
        open: false,
        body: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.ui.errors) {
            this.setState({
                errors: nextProps.ui.errors
            });
        } else if(!nextProps.ui.loading) {
            this.setState({ body: '',open: false, errors: {} }); // doclose will cause loop
        }
    }

    doOpen = () => {
        this.setState({ open: true });
    }

    doClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    doSubmit = event => {
        event.preventDefault();
        this.props.createPost({ body: this.state.body });
    }

    render() {

        const { errors } = this.state;
        const { classes, ui: { loading }} = this.props;

        return (
            <Fragment>
                <WrappedButton onClick={this.doOpen} title="Create a post">
                    <AddIcon className="nav-icon"/>
                </WrappedButton>

                <Dialog open={this.state.open} onClose={this.doClose} fullWidth maxWidth="sm">
                    <WrappedButton title="Close" onClick={this.doClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </WrappedButton>

                    <DialogTitle>Create a Post</DialogTitle>

                    <DialogContent>
                        <form onSubmit={this.doSubmit}>
                            <TextField name="body" type="text" label="body" multiline rows="3" error={errors.body ? true : false} 
                            helperText={errors.body} className={classes.textField} onChange={this.onChange} fullWidth/>

                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                Submit
                                {loading && (<CircularProgress size={30} className={classes.progressSpinner}/>)}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

postButton.propTypes = {
    createPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired
};

const mapState = state => ({
    ui: state.ui
})

export default connect(mapState, { createPost, clearErrors })(withStyles(styles)(postButton));
