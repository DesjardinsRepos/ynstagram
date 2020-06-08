import React from 'react';

import { Person as MenuIcon } from '@material-ui/icons';

import WrappedButton from './wrappedButton';
import getDevice from '../../hooks/getDevice';

export default ({ doOpen }) => {
    const device = getDevice(600, 1024);

    return( 
        device !== 'pc' ? (
            device === 'tablet' ? (

                <WrappedButton title="see more" onClick={doOpen} style={{ position: 'absolute', top: '8px', left: '8px' }}>
                    <MenuIcon className="nav-icon"/>
                </WrappedButton>

            ) : (
                <WrappedButton title="see more" onClick={doOpen} style={{ position: 'absolute', top: '3px', left: '3px' }}>
                    <MenuIcon className="nav-icon"/>
                </WrappedButton>
            )
        ) : (
            null
        )
    );
}