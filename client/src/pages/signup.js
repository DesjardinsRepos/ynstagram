import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Button, LinearProgress, Card, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';

import MainIcon from '../ressources/images/MainIcon.png';
import styles from '../styles/signinForm';

import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

class SignupPage extends Component {

    constructor() {

        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors });
        }
    }

    onSubmit = event => {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        this.setState({ loading: true });

        this.props.signupUser(userData, this.props.history);
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
                    <Card className={classes.card}>

                    {loading && (<LinearProgress/>)}

                    <CardContent className={classes.content}>
                        <img src={MainIcon} className={classes.image} alt=""/>

                        <Typography variant="h2" className={classes.pageTitle}>Sign up</Typography>

                        <form noValidate onSubmit={this.onSubmit}>

                            <TextField id="handle" name="handle" type="text" label="Username" className={classes.textField} value={this.state.handle} 
                            onChange={this.onChange} fullWidth helperText={errors.handle} error={errors.handle ? true : false}/> 
                        
                            <TextField id="email" name="email" type="email" label="Email" className={classes.textField} value={this.state.email}
                            onChange={this.onChange} fullWidth helperText={errors.email} error={errors.email ? true : false}/>

                            <TextField id="password" name="password" type="password" label="Password" className={classes.textField} value={this.state.password} 
                            onChange={this.onChange} fullWidth helperText={errors.password} error={errors.password ? true : false}/> 

                            <TextField id="confirmPassword" name="confirmPassword" type="password" label="confirm Password" className={classes.textField} value={this.state.confirmPassword} 
                            onChange={this.onChange} fullWidth helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false}/> 
                        
                            <Button type="submit" variant="contained" color={"primary"} className={classes.button} disabled={loading}>
                                sign up 
                            </Button> <br/>
                        </form> <br/>

                        <small>Already have an Account? Sign in <Link className={classes.link} to="/signin">here</Link></small>

                    </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

SignupPage.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapState = state => ({
    user: state.user,
    ui: state.ui
});
const mapActions = { signupUser };

export default connect(mapState, mapActions)(withStyles(styles)(SignupPage));
