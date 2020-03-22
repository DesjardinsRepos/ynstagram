import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';


class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/signin"> signin </Button>
                    <Button color="inherit" component={Link} to="/"> home </Button>
                    <Button color="inherit" component={Link} to="signup"> signup </Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar
