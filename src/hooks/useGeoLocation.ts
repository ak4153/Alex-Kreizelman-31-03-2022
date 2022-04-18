import { useEffect, useState } from 'react';

interface Coords {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export const useGeoLocation = () => {
  const [geoLocationError, setGeoLocationError] = useState<string>();
  const [geoLocation, setGeoLocation] = useState<Coords>();

  const success = (e: GeolocationPosition) => {
    setGeoLocation(
      (prevState: Coords) =>
        (prevState = {
          coords: {
            latitude: e.coords.latitude,
            longitude: e.coords.longitude,
          },
        })
    );
  };
  const fail = (error: GeolocationPositionError) => {
    setGeoLocationError(error.message);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoLocationError("Geo location isn't supported");
      return;
    } else {
      navigator.geolocation.getCurrentPosition(success, fail, {
        enableHighAccuracy: false,
        timeout: 5000,
      });
    }
  }, []);

  return { geoLocation, geoLocationError };
};
