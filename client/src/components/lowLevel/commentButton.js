import React, { Fragment } from 'react';
import WrappedButton from '../wrappedButton';
import { Chat as ChatIcon } from '@material-ui/icons';

export default ({ count = 'cout not defined' }) => (

    <Fragment>
        <WrappedButton title="comments" padding="5px">
            <ChatIcon color="primary" />
        </WrappedButton>
        <span>
            {count}
        </span>
    </Fragment>
)
