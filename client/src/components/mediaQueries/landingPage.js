import React from 'react';
import { Grid } from '@material-ui/core';

import UserProfile from '../profile/userProfile';
import getWindowDimensions from '../../hooks/getWindowDimensions';

export default ({ children }) => {
  return( getWindowDimensions().width >= 1024 ? (

    <Grid container spacing={2} justify="center">
      <Grid item xs={12} sm={8}>
        {children}
      </Grid>
      <Grid item xs={12} sm={4}>
        <UserProfile/>
      </Grid>
    </Grid>
 
  ) : (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} sm={12}>
        {children}
      </Grid>
    </Grid>
  ))
}