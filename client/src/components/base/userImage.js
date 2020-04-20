import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import styles from '../../styles/userImage';

class UserImage extends Component { //rewrite into functional component

    render() {

        var { image, classes, size } = this.props;

        if(!size) size = '200px';

        return (
            <Fragment>
                <div className={classes.wrapper}>
                    <img src={image} alt="" className={classes.image} style={{ height: size, width: size }}/>
                </div>
            </Fragment>
        )
    }
}

UserImage.propTypes = {
    classes: PropTypes.object.isRequired,
    image : PropTypes.string.isRequired,
    size: PropTypes.string
}

export default withStyles(styles)(UserImage);
