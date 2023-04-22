import { useHelper, GizmoHelper, GizmoViewport } from '@react-three/drei'
import AnimatedStars from './AnimatedStars'
import { useRef, useEffect } from 'react'

import * as THREE from 'three'

import UseCameraPositionLogging from './hooks/UseCameraPositionLogging'

import Earth from './planets/earth/Earth'
import Sun from './planets/sun/Sun'
import { Perf } from 'r3f-perf'

const MainContainer = () => {
  // CAMERA LOCATION TRACKER
  // const { camera } = useThree()
  // const cameraRef = useRef(camera)

  // useEffect(() => {
  //   const logCameraPosition = () => {
  //     const { x, y, z } = cameraRef.current.position
  //     const roundedX = Math.round(x * 100) / 100
  //     const roundedY = Math.round(y * 100) / 100
  //     const roundedZ = Math.round(z * 100) / 100
  //     console.log(
  //       `Camera position: x: ${roundedX}, y: ${roundedY}, z: ${roundedZ}`
  //     )
  //   }

  //   cameraRef.current = camera
  //   window.addEventListener('mousedown', logCameraPosition)

  //   return () => {
  //     window.removeEventListener('mousedown', logCameraPosition)
  //   }
  // }, [])

  //

  // const directionalLightRef = useRef()
  // const directionalLightRefTwo = useRef()
  // useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'hotpink')
  // useHelper(directionalLightRefTwo, THREE.DirectionalLightHelper, 1, 'hotpink')

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
