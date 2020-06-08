import React, { Fragment } from 'react';

import { LocationOn as LocationIcon } from '@material-ui/icons';

import Space from '../space';

export default ({ location }) => (
    <Fragment>
        {location && (
            <Fragment>
                <LocationIcon color="primary"/>
                <span>{location}</span>
                <Space space="10px"/>
            </Fragment>
        )}
    </Fragment>
)
