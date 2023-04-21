import { useHelper } from '@react-three/drei'
import AnimatedStars from './AnimatedStars'
import { useRef, useEffect } from 'react'

import * as THREE from 'three'

import UseCameraPositionLogging from './hooks/UseCameraPositionLogging'

import Earth from './planets/earth/Earth'

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

  const directionalLightRef = useRef()
  const directionalLightRefTwo = useRef()
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'hotpink')
  useHelper(directionalLightRefTwo, THREE.DirectionalLightHelper, 1, 'hotpink')

  return (
    <>
      <UseCameraPositionLogging event='mousedown' />
      <AnimatedStars />
      <directionalLight
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
      />
      <ambientLight />

      <Earth position={[0, 0, 0]} displacementScale={0.05} />
    </>
  )
}

export default MainContainer
