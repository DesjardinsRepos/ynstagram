import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';    //connect to state
import PropTypes from 'prop-types';

const authRoute = ({ component: Component, authenticated, ...rest}) => (
        <Route {...rest} render={(props) => authenticated === true ? // checking true compulsive? 
            <Redirect to='/'/> : <Component {...props}/>}>
        </Route>
    );

const mapState = state => ({
    authenticated: state.user.authenticated
});

authRoute.propTypes = {
    user: PropTypes.object
};

export default connect(mapState)(authRoute);