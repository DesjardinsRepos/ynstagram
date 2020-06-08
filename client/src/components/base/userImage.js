import React, { Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';

import styles from '../../styles/userImage';

export default withStyles(styles)(({ image, classes, size = '200px', className = classes.wrapper, maxSize }) => 
    <Fragment>
        <div className={className}>
            <img src={image} alt="" className={classes.image} style={{ height: size, width: size, maxWidth: maxSize, maxHeight: maxSize }}/>
        </div>
    </Fragment>
);
