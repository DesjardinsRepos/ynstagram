import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Button, LinearProgress, Card, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

import MainIcon from '../ressources/images/MainIcon.png';
import Space from '../components/base/space';
import styles from '../styles/signinForm';

class SigninPage extends Component {

    constructor() {

        super();
        this.state = {
            email: 'Test-User@email.com',
            password: 'testuser',
            errors: {}
        }
    }

    static getDerivedStateFromProps(props) {

        if(props.ui.errors) {
            return { errors: props.ui.errors };

        } else {
            return null;
        }
    }

    onSubmit = event => {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes, ui: { loading } } = this.props;
        const { errors } = this.state;

        return (
            
            <Grid container className={classes.container}>
                <Grid item sm className={classes.form}>
                    <Card>

                    {loading && (<LinearProgress/>)}

                    <CardContent className={classes.content}>
                        <img src={MainIcon} className={classes.image} alt=""/>

                        <Typography variant="h2" className={classes.pageTitle}>Login</Typography>

                        <form noValidate onSubmit={this.onSubmit}>
                            <TextField id="email" name="email" type="email" label="Email" className={classes.textField} value={this.state.email}
                            onChange={this.onChange} fullWidth helperText={errors.email} error={errors.email ? true : false}/>

                            <TextField id="password" name="password" type="password" label="Password" className={classes.textField} value={this.state.password} 
                            onChange={this.onChange} fullWidth helperText={errors.password} error={errors.password ? true : false}/>
                        
                            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                                signin 
                            </Button>
                        </form>
                        
                            <Space small/>
                        <small>Don't have an Account? Sign up <Link className={classes.link} to="/signup" color="secondary">here</Link></small>

                    </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

SigninPage.propTypes = {
    classes: PropTypes.object.isRequired,
    // mapped states from redux
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
};

const mapState = state => ({ // maps state to props
    user: state.user,
    ui: state.ui
});

const mapActions = { loginUser };

export default connect(mapState, mapActions)(withStyles(styles)(SigninPage));
