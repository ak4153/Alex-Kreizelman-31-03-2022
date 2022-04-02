import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { NavBarWrapper, NavLinkWrapper } from '../styles/NavBarWrapper';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Store } from '../Store/Provider';
import { Grid } from '@mui/material';
import UnitSwitch from './UnitSwitch';

export const Navbar: React.FC = () => {
  const { state, dispatch } = React.useContext(Store);

  const handleDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_DARKMODE' });
  };

  return (
    <NavBarWrapper>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sharp
          </Typography>
          <Grid container spacing={3} justifyContent="flex-end">
            <Grid item>
              <Button color="inherit">
                <NavLinkWrapper to="/">
                  <Typography>Weather</Typography>
                </NavLinkWrapper>
              </Button>

              <Button color="inherit">
                <NavLinkWrapper to="favorites">
                  <Typography>Favorites</Typography>
                </NavLinkWrapper>
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            {' '}
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    onChange={handleDarkMode}
                    checked={state.darkMode}
                    aria-label="login switch"
                  />
                }
                label={state.darkMode ? <DarkModeIcon /> : <LightModeIcon />}
              />
            </FormGroup>
          </Grid>
          <Grid item>
            {' '}
            <UnitSwitch />
          </Grid>
        </Toolbar>
      </AppBar>
    </NavBarWrapper>
  );
};
