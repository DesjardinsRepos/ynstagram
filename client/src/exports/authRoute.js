import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';    //connect to state
import PropTypes from 'prop-types';

const authRoute = ({ component: Component, authenticated, ...rest}) => (
        <Route {...rest} render={(props) => authenticated === true ? // checking true compulsive? 
            <Redirect to='/'/> : <Component {...props}/>}/>
    );

const mapState = state => ({
    authenticated: state.user.authenticated
    //get user data?
});

authRoute.propTypes = {
    user: PropTypes.object // not required? only temp fix
};

export default connect(mapState)(authRoute);