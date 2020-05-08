import React, { Fragment } from 'react';
import Space from '../space';
import { LocationOn as LocationIcon, Link as LinkIcon, CalendarToday as CalendarIcon, Edit as EditIcon, ExitToApp as ExitIcon } from '@material-ui/icons';


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
