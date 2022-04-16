import React from 'react';
import { Typography } from '@mui/material';
import { meanTemp, convertNow } from '../utils/tempConversion';
import { useAppSelector } from '../Store/hooks';
interface Props {
  temperature: any;
  text?: string;
  textSize?: 'h4' | 'h5' | 'h6';
}
export default function Temperature(props: Props) {
  const isCelsius = useAppSelector((state) => state.isCelsius);
  return (
    <Typography
      margin={'10px'}
      variant={props.textSize ? props.textSize : 'h4'}
      component={props.textSize ? props.textSize : 'h4'}
    >
      {props.text && props.text + ' - '}
      {isCelsius.value
        ? convertNow(
            'f',
            meanTemp(
              props.temperature.Maximum.Value,
              props.temperature.Minimum.Value
            )
          )
        : convertNow(
            'c',
            meanTemp(
              props.temperature.Maximum.Value,
              props.temperature.Minimum.Value
            )
          )}
    </Typography>
  );
}
