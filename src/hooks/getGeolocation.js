import { useState, useEffect } from 'react'

const getGeoloaction = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
  	if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        console.log('Current User geolocated', latitude, longitude);
        setLocation({
          lat: latitude,
          lon: longitude
        });
      });
  	} 
    else {
      alert("This site need geolocation to fetch planes around you");
  	}
  }, []);

  return location;
}

export default getGeoloaction;