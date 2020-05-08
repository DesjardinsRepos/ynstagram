import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';


export default ({ bio }) => (
    <Fragment>
        { bio ? (
            <Typography variant="body2">{bio}</Typography>
        ) : (
            null
        )}
    </Fragment>
)
