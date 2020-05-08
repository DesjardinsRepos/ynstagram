import React from 'react';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Person as MenuIcon } from '@material-ui/icons';

import WrappedButton from './wrappedButton';

const Menu = ({ doOpen }) => {
    const required = !useMediaQuery('(min-width:1024px)');
    const smallSizeRequired = useMediaQuery('(min-width:600px)');

    return( 
        required ? (
            smallSizeRequired ? (

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
export default Menu;