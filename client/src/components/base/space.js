import React, { Fragment } from 'react';

export default ({ space = '80px', small, horizontal }) => (
    small ? (
        <div style={{ height: '10px' }}/>
    ) : (
        horizontal ? (
            <Fragment>{'          '}</Fragment>
        ) : (
            <div style={{ height: space }}/>
        )
    )
)
