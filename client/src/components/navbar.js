import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AppBar, Toolbar, Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Notifications as NotificationIcon } from '@material-ui/icons';

import WrappedButton from './wrappedButton';
import PostButton from './postButton';


class Navbar extends Component {
    render() {

        const { authenticated } = this.props;

        return (
            <AppBar>
                <Toolbar className="nav-container">
                    { authenticated ? (
                        <Fragment>
                            <PostButton/>

                            <Link to="/">
                                <WrappedButton title="Home">
                                    <HomeIcon className="nav-icon"/>
                                </WrappedButton>
                            </Link>

                            <WrappedButton title="Notifications">
                                <NotificationIcon className="nav-icon"/>
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
