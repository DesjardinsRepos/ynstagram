import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';

export default ({ title, children, onClick, btnClassName, tipClassName }) => (
    <Tooltip title={title} className={tipClassName}>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
)