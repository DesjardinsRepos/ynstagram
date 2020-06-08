import React from 'react';
import { Typography } from '@material-ui/core';

export default ({ body, className }) => (
		<Typography variant="body1" className={className}>{body}</Typography>
)
