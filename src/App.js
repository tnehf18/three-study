import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from "@react-three/drei";
import Earth from './components/Earth';
import ControlPanel from './components/ControlPanel';
import getGeoloaction from './hooks/getGeolocation';
import getPlanes from './hooks/getPlanes';

import './css/index.css';

const noCoords = {
  id: 'noCoords',
  type: 'island',
  lat: 0,
  lng: 0,
}

const App = () => {
  const [activeMarkerId, setActiveMarkerId] = useState('user');
  const userLocation = getGeoloaction();
  setTimeout(function() {

  }, 1 * 1000);
  const planes = getPlanes(userLocation);

  const markers = userLocation ? [{ id: 'user', type: 'person', ...userLocation }, ...planes] : [...planes];   
  const activeMarker = markers.find((marker) => marker.id === activeMarkerId);

  return (
    <>
      <div className='title'>
        <h1>3D Nearby Plane Tracker</h1>
      </div>
      <Canvas style={{
        height: 'calc(100vh - 170px)',
        width: '100vw'
      }}>
        <pointLight position={[10, 5, 10]} />
        <Earth marker={activeMarker || noCoords} />
        <Stars />
      </Canvas>
      <div className='controls'>
        <ControlPanel markers={markers} activeMarkerId={activeMarkerId} setActiveMarkerId={setActiveMarkerId} />
      </div>
    </>
  )
};
export default App;