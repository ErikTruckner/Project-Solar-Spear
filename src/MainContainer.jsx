import {
  useHelper,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
} from '@react-three/drei'
import AnimatedStars from './AnimatedStars'
import { useRef, useEffect, useState } from 'react'

import * as THREE from 'three'

import UseCameraPositionLogging from './hooks/CameraPositionLogging'

import Earth from './planets/earth/Earth'
import Sun from './planets/sun/Sun'
import { Perf } from 'r3f-perf'

const MainContainer = () => {
  return (
    <>
      <Perf />
      <GizmoHelper
        alignment='bottom-right' // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
      >
        <GizmoViewport
          axisColors={['red', 'green', 'blue']}
          labelColor='black'
        />
        {/* alternative: <GizmoViewcube /> */}
      </GizmoHelper>
      <OrbitControls />
      <UseCameraPositionLogging event='mousedown' />
      <AnimatedStars />
      {/* <directionalLight
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        ref={directionalLightRef}
        position={[0, 0, 10]}
        intensity={1}
        // color={0xff0000}
      />
      <directionalLight
        castShadow
        ref={directionalLightRefTwo}
        position={[0, 0, -10]}
      /> */}
      <ambientLight intensity={0.1} />
      <Sun />

      <Earth position={[7, 0, 0]} displacementScale={0.05} />
    </>
  )
}

export default MainContainer
