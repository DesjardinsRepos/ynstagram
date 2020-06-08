import React, { Fragment } from 'react';
import PostDialog from '../post/postDialog';
import { Chat as ChatIcon } from '@material-ui/icons';
import WrappedButton from './wrappedButton';

export default ({ count, postId, userHandle, openDialog }) => (

    <Fragment>
        {postId ? (
            <PostDialog postId={postId} userHandle={userHandle} openDialog={openDialog} type="comment"/>
            
        ) : (
            <WrappedButton title="Comment">
                <ChatIcon color="primary"/>
            </WrappedButton>
        )}

        <span>{count}</span>
    </Fragment>
)
