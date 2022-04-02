import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
export default function SkeletonLoad() {
  return (
    <Grid container spacing={5} justifyContent="center">
      <Grid item xs={8} md={8}>
        <Skeleton variant="text" />
      </Grid>
      <Grid item xs={8} md={8}>
        <Skeleton variant="circular" width={40} height={40} />
      </Grid>

      <Grid item xs={8} md={8}>
        <Skeleton variant="rectangular" width={210} height={118} />
      </Grid>
    </Grid>
  );
}
