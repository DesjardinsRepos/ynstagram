import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Menu, MenuItem, IconButton, Tooltip, Typography, Badge } from '@material-ui/core';
import { Notifications as NotificationIcon, Favorite as HearthFilled, Chat as ChatIcon }from '@material-ui/icons';

import { markNotificationsRead } from '../redux/actions/userActions';

class Notifications extends Component {

    state = {
        anchorEl: null
    }

    doOpen = event => {
        this.setState({ anchorEl: event.target });
    }

    doClose = () => {
        this.setState({ anchorEl: null });
    }

    onMenuOpened = () => {
        let unreadNotificationIds = this.props.notifications
            .filter(n => !n.read)
            .map(n => n.notificationId);

        this.props.markNotificationsRead(unreadNotificationIds);
    }

    render() {

        dayjs.extend(relativeTime);

        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

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

        let shownNotifications = notifications && notifications.length > 0 ? (
            notifications.map(n => {

                const verb = n.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(n.createdAt).fromNow();
                const iconColor = n.read ? 'primary' : 'secondary';

                const icon = n.type === 'like' ? (
                    <HearthFilled color={iconColor} style={{ marginRight: 10 }}/>
                ) : (
                    <ChatIcon color={iconColor} style={{ marginRight: 10 }}/>
                );

                return (
                    <MenuItem key={n.createdAt} onClick={this.doClose}>
                        {icon}
                        <Typography component={Link} variant="body1" to={`/users/${n.recipient}/post/${n.postId}`}>
                            {n.sender} {verb} your post {time}
                        </Typography>
                    </MenuItem>
                );
            })
        ) : (
            <MenuItem onClick={this.doClose}>
                You have no notifications yet
            </MenuItem>
        );

        return (
            <Fragment>
                <Tooltip placement="top" title="Notifications">
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.doOpen}>
                        {notificationIcon}
                    </IconButton>
                </Tooltip>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.doClose} onEntered={this.onMenuOpened}>
                    {shownNotifications}
                </Menu>
            </Fragment>
        )
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
};

const mapState = state => ({
    notifications: state.user.notifications
});

export default connect(mapState, { markNotificationsRead })(Notifications);
