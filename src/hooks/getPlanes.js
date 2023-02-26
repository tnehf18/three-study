import { useState, useCallback, useEffect } from 'react';
import { calcDistance, calcRotation, samplePlanes } from '../utils/utils';

const API_URL = 'https://opensky-network.org/api/states/all';
const BOUNDS_SIZE = 2;

const getPlanes = (location) => {
  const [planes, setPlanes] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);

  const { lat, lon } = location || {lat: 37.5062528, lon: 126.8383744};
  const url = `${API_URL}?lamin=${lat - BOUNDS_SIZE}&lomin${lon - BOUNDS_SIZE}&lamax=${lon + BOUNDS_SIZE}&lomax=${lon + BOUNDS_SIZE}`;

  const fetchPlanes = useCallback(() => {
    if (fetchCount >= 2) return;

    fetch(url).then(res => {
      if (res.status !== 200) {
        alert(`Failed to get planes Info From API.`);
        console.log(res);
        return samplePlanes[fetchCount];
      }
      
      return res.json().then(data => data.states);
    })
    .then(planes => {
      const fetchedPlanes = planes.map(plane => {
        const [id, , origin, , , lon, lat] = plane;
        const distance = calcDistance(lat, lon, location.lat, location.lon);
  
        return {
          id,
          origin,
          lat,
          lon,
          type: "plane",
          rotation: 0,
          distance
        }
      });
      return fetchedPlanes;
    })
    .then(fetchedPlanes => {
      setPlanes(curPlanes => {
        const newPlanes = fetchedPlanes.filter(fp => !curPlanes.some(cp => cp.id === fp.id));
        const oldPlanes = fetchedPlanes
          .filter(fp => curPlanes.some(cp => cp.id === fp.id))
          .map(plane => {
            const { lat, lon} = plane;
            const curPlane = curPlanes.find(cp => cp.id === plane.id);
            const { lat: prevLat, lon: prevLon, rotation: prevRotation } = curPlane;
            const rotation = lat !== prevLat || lon !== prevLon ? calcRotation(lat, lon, prevLat, prevLon) : prevRotation;
  
            return ({
              ...plane,
              rotation,
            })
          });
  
        const newState = [...oldPlanes, ...newPlanes];
        console.log(`${oldPlanes.length} updated. ${newPlanes.length} added.`);
        return newState.sort((a, b) => a.distance - b.distance);
      });
  
      setFetchCount(prev => prev+1);
    });
  }, [fetchCount, setFetchCount, setPlanes, location]);

  useEffect(() => {
		if (location) {
			fetchPlanes();
		}
  }, [location, fetchPlanes]);

  return planes;
}

export default getPlanes;