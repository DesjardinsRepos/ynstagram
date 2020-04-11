import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import { Typography } from '@material-ui/core';

export default ({ body = 'undefined', date = undefined }) => (

    <Fragment>
        <Typography variant="body2" color="textSecondary"> {dayjs(date).fromNow()} </Typography>
		<Typography variant="body1">{body}</Typography>
    </Fragment>
)
