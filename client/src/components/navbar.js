import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AppBar, Toolbar, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import NotificationIcon from '@material-ui/icons/Notifications';

import WrappedButton from './wrappedButton';


class Navbar extends Component {
    render() {

        const { authenticated } = this.props;

        return (
            <AppBar>
                <Toolbar className="nav-container">
                    { authenticated ? (
                        <Fragment>
                            <WrappedButton title="create a Post">
                                <AddIcon color="primary"/>
                            </WrappedButton>

                            <Link to="/">
                                <WrappedButton title="Home">
                                    <HomeIcon color="primary"/>
                                </WrappedButton>
                            </Link>

                            <WrappedButton title="Notifications">
                                <NotificationIcon color="primary"/>
                            </WrappedButton>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color="inherit" component={Link} to="/signin"> signin </Button>
                            <Button color="inherit" component={Link} to="/"> home </Button>
                            <Button color="inherit" component={Link} to="signup"> signup </Button>
                        </Fragment>

                    )}





                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapState = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapState)(Navbar);
