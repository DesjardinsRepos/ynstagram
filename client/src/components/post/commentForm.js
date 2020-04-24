import React, { Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField } from '@material-ui/core';

import { createComment } from '../../redux/actions/dataActions';
import { clearErrors } from '../../redux/actions/dataActions';
import styles from '../../styles/commentForm';


class CommentForm extends Component {

    state = {
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors });

        } else if(!nextProps.ui.loading) {
            this.setState({ body: ''});
        }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    doSubmit = event => {
        this.props.clearErrors();// temporary fix
        this.setState({ errors: {} });
        event.preventDefault();
        this.props.createComment(this.props.postId, { body: this.state.body });
    }

    render() {

        const { classes, authenticated, authenticatedUser } = this.props;
        const errors = this.state.errors;

        const commentForm = authenticated ? (

            <Grid item sm={12} style={{ textAlign: 'center', width: '100%' }}>
                
                <form onSubmit={this.doSubmit}>
                    <TextField name="body" tyle="text" label={`comment as ${authenticatedUser} `} error={errors.comment ? true : false} helperText={errors.comment}
                    value={this.state.body} onChange={this.onChange} fullWidth className={classes.textField} variant="outlined" multiline/>

                    <hr className={classes.invisibleSeperator}/>

                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </form>
            </Grid>
        ) : null

        return commentForm;
    }
}

CommentForm.propTypes = {
    ui: PropTypes.object.isRequired, 
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,

    authenticatedUser: PropTypes.string,
    clearErrors: PropTypes.func.isRequired,
    createComment: PropTypes.func.isRequired
}

const mapState = state => ({
    ui: state.ui, 
    authenticated: state.user.authenticated,
    authenticatedUser: state.user.credentials.handle
})

export default connect(mapState, { createComment, clearErrors })(withStyles(styles)(CommentForm));
