import { useState, useEffect } from 'react';
import ClockWrapper from '../styles/ClockWrapper';
import { Typography } from '@mui/material';
function Clock() {
  const [date, setDate] = useState<Date>(new Date());

  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  return (
    <ClockWrapper>
      <Typography component="h4" variant="h4">
        {date.toLocaleTimeString()}
      </Typography>
    </ClockWrapper>
  );
}
export default Clock;
