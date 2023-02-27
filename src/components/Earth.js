/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: PatelDev (https://sketchfab.com/PatelDev)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/earth-f7a76c63ff1846afb2d606e5c8369c15
title: Earth
*/

import React, { useState, useCallback } from 'react'
import { useGLTF } from '@react-three/drei'
// import { a } from '@react-spring/three'; // Can't build by webpack issue 
import Plane from './Plane'; 

const LON_OFFSET = - Math.PI / 2;

const Earth = ({ marker }) => {
  const [ isZoom, setIsZoom ] = useState(false);
  const { nodes, materials } = useGLTF(`../asset/mesh/earth.gltf`)

  const { lat, lon } = marker;
  const latRot = (lat * Math.PI / 180);
  const lonRot = -(lon * Math.PI / 180) + LON_OFFSET;

  const { scale, markerPosition, earthRotation }= {
    scale: isZoom ? 4 : 2,
    markerPosition: isZoom ? [0, 0, 4.5] : [0, 0, 2.5],
    earthRotation: [latRot, lonRot, 0]
  }

  const handleEarthClick = useCallback(() => {
    setIsZoom(prev => !prev)
  }, [setIsZoom]);

  return (
    <>
      <group scale={scale} dispose={null} rotation={earthRotation}
        onClick={handleEarthClick}
      >
        <group scale={1.13}>
          <mesh geometry={nodes.Object_4.geometry} material={materials['Scene_-_Root']} />
        </group>
      </group>
      {marker.type === 'plane' ? (
        <Plane id={marker.id} position={markerPosition} rotation={marker.rotation} />
      ) :
      <mesh position={markerPosition}>
        <sphereGeometry args={[0.01]}/>
        <meshStandardMaterial color={'orange'} />
      </mesh>
      }
    </>
  )
}

useGLTF.preload(`../asset/mesh/earth.gltf`);
export default Earth;