import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';

import { Store } from '../Store/Provider';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
export default function UnitSwitch() {
  const { state, dispatch } = React.useContext(Store);

  const handleDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_UNIT' });
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            onChange={handleDarkMode}
            checked={state.isCelsius}
            aria-label="unit switch"
          />
        }
        label={
          state.isCelsius ? <DeviceThermostatIcon /> : <DeviceThermostatIcon />
        }
      />
    </FormGroup>
  );
}
