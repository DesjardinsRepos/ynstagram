import React, { Fragment, Component } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

class Date extends Component {

    render() {

        const { date, mode } = this.props;

        dayjs.extend(relativeTime);

        return (
            <Fragment>
                {mode ? (
                    mode === 'fromNow' && <Typography variant="body2" color="textSecondary"> {dayjs(date).fromNow()}</Typography>
                ) : (
                    <Typography variant="body2" color="textSecondary"> {dayjs(date).format('h:mm a, MMMM DD YYYY')}</Typography>
                )}
            </Fragment>
        )
    }
}

Date.propTypes = {
    date: PropTypes.string,
    mode: PropTypes.string
}

export default Date;
