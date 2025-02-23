import { useState, useCallback } from 'react';
import { Geolocation } from '@capacitor/geolocation';

const useCurrentLocation = () => {
  const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [error, setError] = useState(null);

  const getCurrentLocation = async() => {
    Geolocation.getCurrentPosition()
      .then(resp => {
        setLocation({
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude
        });
      })
      .catch(err => {
        console.error('Error obteniendo la ubicación', err);
        setError(err);
      });
  };

  return {
    location,
    error,
    getCurrentLocation
  };
};

export default useCurrentLocation;
