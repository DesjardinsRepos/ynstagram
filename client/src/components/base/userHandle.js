import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

export default ({ userHandle, variant = 'h5', style }) => (

    <Typography variant={variant} component={Link} to={`/users/${userHandle}`} color="primary" style={style}> 
        {userHandle}
    </Typography>
)
