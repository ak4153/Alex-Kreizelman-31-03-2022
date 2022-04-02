import React from 'react';
interface Props {
  weatherIcon: number;
}
const WeatherIcon = (props: Props) => {
  const { weatherIcon } = props;
  return (
    <img
      src={`https://developer.accuweather.com/sites/default/files/${
        weatherIcon / 10 < 1 ? '0' + weatherIcon : weatherIcon
      }-s.png`}
      alt="weatherIcon"
    />
  );
};
export default WeatherIcon;
