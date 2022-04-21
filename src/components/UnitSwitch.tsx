//npm packages
import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
//redux
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { setUnit } from '../reduxSlices/isCelsiusSlice';

export default function UnitSwitch() {
  const isCelsius = useAppSelector((state) => state.isCelsius);
  const dispatch = useAppDispatch();

  const handleDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUnit());
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            onChange={handleDarkMode}
            checked={isCelsius.value}
            aria-label="unit switch"
          />
        }
        label={
          isCelsius.value ? <DeviceThermostatIcon /> : <DeviceThermostatIcon />
        }
      />
    </FormGroup>
  );
}
