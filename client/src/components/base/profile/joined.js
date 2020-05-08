import React, { Fragment } from 'react';
import { CalendarToday as CalendarIcon } from '@material-ui/icons';
import dayjs from 'dayjs';


export default ({ date, small }) => (
    <Fragment>
        { small ? (
            <small>Joined {dayjs(date).format('MMM YYYY')}</small>
        ) : (
            <Fragment>
                <CalendarIcon color="primary"/>{' '}
                <span>Joined {dayjs(date).format('MMM YYYY')}</span>
            </Fragment>
        )}
    </Fragment>
)
