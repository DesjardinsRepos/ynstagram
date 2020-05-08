import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

import { Dialog,  DialogContent, LinearProgress as Progress } from '@material-ui/core';
import { Close as CloseIcon, ExpandMore as ExpandIcon, Chat as ChatIcon } from '@material-ui/icons';

import WrappedButton from '../base/wrappedButton';
import UserProfile from '../profile/userProfile';
import { withStyles } from '@material-ui/core/styles';

import Menu from './menu';
import styles from '../../styles/menuDialog';
class MenuDialog extends Component {
    state = {
        open: false
    }

    doOpen = () => {
        this.setState({ open: true });
    }

    doClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { classes, ui: { loading } } = this.props;

        return (
            <Fragment>
                <Menu doOpen={this.doOpen}/>

                <Dialog open={this.state.open} onClose={this.doClose} fullWidth maxWidth="sm">

                    <WrappedButton title="Close" onClick={this.doClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </WrappedButton>

                    <DialogContent className={classes.dialogContent}>
                        <UserProfile/>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

const mapState = state => ({
    ui: state.ui
});

export default connect(mapState, {})(withStyles(styles)(MenuDialog));