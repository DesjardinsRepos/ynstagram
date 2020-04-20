import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

export default ({ userHandle }) => (

    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary"> {userHandle}</Typography>
)
