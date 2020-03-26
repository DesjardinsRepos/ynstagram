import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Button, LinearProgress, Card, CardContent} from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';

import MainIcon from '../ressources/images/MainIcon.png';

import styles from '../styles/signinFormStyles';

class SignupPage extends Component {

    constructor() {

        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors: {}
        }
    }

    onSubmit = event => {

        event.preventDefault();

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle

        };

        this.setState({
            loading: true
        });
        
        axios.post('/signup', newUserData)
            .then(result => {

                localStorage.setItem('FBAuthToken', `Bearer ${result.data.token}`);

                this.setState({
                    loading: false
                });
                this.props.history.push('/'); //redirect to '/'
            })
            .catch(e => {
                this.setState({
                    errors: e.response.data,
                    loading: false
                });
            });
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;

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

                            <TextField id="confirmPassword" name="confirmPassword" type="confirmPassword" label="confirm Password" className={classes.textField} value={this.state.confirmPassword} 
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
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SignupPage);
