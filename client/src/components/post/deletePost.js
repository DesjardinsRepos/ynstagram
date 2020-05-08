import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';

import WrappedButton from '../base/wrappedButton';
import { deletePost } from '../../redux/actions/dataActions';
import styles from '../../styles/deletePost';

class DeletePost extends Component {

    state = {
        open: false
    };

    doOpen = () => {
        this.setState({ open: true });
    }
    
    doClose = () => {
        this.setState({ open: false });
    }

    deletePost = () => {
        this.props.deletePost(this.props.post.postId);
        this.setState({ open: false });
    }

    render() {

        const { 
            classes, 
            user: { authenticated, credentials: { handle } },
            post: { userHandle } 
        } = this.props;

        return (
            authenticated && userHandle === handle ? (
                <Fragment>
                    
                    <WrappedButton title="delete Post" onClick={this.doOpen} btnClassName={classes.deleteButton}>
                        <DeleteOutline color="secondary"/>
                    </WrappedButton>

                    <Dialog open={this.state.open} onClose={this.doClose} fullWidth maxWidth="sm">
                        <DialogTitle>Are you sure you want to delete that post?</DialogTitle>

                        <DialogActions>
                            <Button onClick={this.doClose} color="primary">Cancel</Button>
                            <Button onClick={this.deletePost} color="secondary">Delete</Button>
                        </DialogActions>
                    </Dialog>
                </Fragment>
            ) : (
                null
            )
        )
    }
}

DeletePost.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapState = state => ({
    user: state.user
})

export default connect(mapState, { deletePost })(withStyles(styles)(DeletePost));
