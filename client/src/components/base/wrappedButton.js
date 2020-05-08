import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';

export default ({ title, children, onClick, btnClassName, tipClassName, padding,  style }) => (
    <Tooltip title={title} className={tipClassName} placement="top" style={{ padding: padding }, style } >
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
)
