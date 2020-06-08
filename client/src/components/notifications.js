import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Menu, MenuItem, IconButton, Tooltip, Typography, Badge } from '@material-ui/core';
import { Notifications as NotificationIcon, Favorite as HearthFilled, Chat as ChatIcon }from '@material-ui/icons';

import { markNotificationsRead } from '../redux/actions/userActions';

const mapState = state => ({
    notifications: state.user.notifications
});

const mapActions = {
    markNotificationsRead: markNotificationsRead
};

export default connect(mapState, mapActions)(({ notifications, markNotificationsRead }) => {

    const [ anchorEl, setAnchorEl ] = useState();

    const doOpen = event => {
        setAnchorEl(event.target);
    }

    const doClose = () => {
        setAnchorEl(null )
    }

    const onMenuOpened = () => {
        let unreadNotificationIds = notifications
            .filter(n => !n.read)
            .map(n => n.notificationId);

        markNotificationsRead(unreadNotificationIds);
    }

    let notificationIcon;

    if(notifications && notifications.length > 0) {
        notifications.filter(n => n.read === false).length > 0 ? (
            notificationIcon = (
                <Badge badgeContent={notifications.filter(n => n.read === false).length} color="secondary">
                    <NotificationIcon className="nav-icon"/>
                </Badge>
        )) : (
            notificationIcon = <NotificationIcon className="nav-icon"/>
        )
    } else {
        notificationIcon = <NotificationIcon className="nav-icon"/>
    }

    return (
        <Fragment>
            <Tooltip placement="top" title="Notifications">
                <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={doOpen}>
                    {notificationIcon}
                </IconButton>
            </Tooltip>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={doClose} onEntered={onMenuOpened}>
                { notifications && notifications.length > 0 ? (
                    notifications.map(n => {

                        const verb = n.type === 'like' ? 'liked' : 'commented on';
                        const time = dayjs.extend(relativeTime)(n.createdAt).fromNow();
                        const iconColor = n.read ? 'primary' : 'secondary';

                        const icon = n.type === 'like' ? (
                            <HearthFilled color={iconColor} style={{ marginRight: 10 }}/>
                        ) : (
                            <ChatIcon color={iconColor} style={{ marginRight: 10 }}/>
                        );

                        return (
                            <MenuItem key={n.createdAt} onClick={doClose}>
                                {icon}
                                <Typography component={Link} variant="body1" to={`/users/${n.recipient}/post/${n.postId}`}>
                                    {n.sender} {verb} your post {time}
                                </Typography>
                            </MenuItem>
                        );
                    })
                ) : (
                    <MenuItem onClick={doClose}>You have no notifications yet</MenuItem>
                )}
            </Menu>
        </Fragment>
    )
})