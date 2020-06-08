import React, { Fragment } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Typography } from '@material-ui/core';

export default ({ date, mode }) => (
    <Fragment>
        {mode ? (
            mode === 'fromNow' && <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center'}}> {dayjs.extend(relativeTime)(date).fromNow()}</Typography>
        ) : (
            <Typography variant="body2" color="textSecondary"> {dayjs(date).format('h:mm a, MMMM DD YYYY')}</Typography>
        )}
    </Fragment>
)
