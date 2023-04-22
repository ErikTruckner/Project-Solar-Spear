import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useCallback } from 'react'
import * as THREE from 'three'

// const Moon = () => {
//   const moonRef = useRef()

//   const [moonTexture] = useTexture(['/assets/moon_map.jpg'])
//   const xAxis = 5
//   useFrame(({ clock }) => {
//     // orbital rotation
//     moonRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.6) * xAxis
//     moonRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.6) * xAxis
//     // axis rotation
//     moonRef.current.rotation.y += 0.005
//   })

//   return (
//     <mesh castShadow receiveShadow ref={moonRef} position={[xAxis, 0, 0]}>
//       {/* Radius , X-axis , Y-axis */}
//       <sphereGeometry args={[0.5, 32, 32]} />
//       <meshPhongMaterial map={moonTexture} />
//     </mesh>
//   )
// }

const Moon = React.memo(() => {
  const moonRef = useRef()
  const [moonTexture] = useTexture(['/assets/moon_map.jpg'])
  const clockRef = useRef(new THREE.Clock())

  const updateMoonPosition = useCallback(() => {
    const xAxis = 5
    moonRef.current.position.x =
      Math.sin(clockRef.current.getElapsedTime() * 0.6) * xAxis
    moonRef.current.position.z =
      Math.cos(clockRef.current.getElapsedTime() * 0.6) * xAxis
    moonRef.current.rotation.y += 0.005
  }, [])

  useFrame(() => {
    updateMoonPosition()
  })

  return (
    <mesh castShadow receiveShadow ref={moonRef} position={[5, 0, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshPhongMaterial
        map={moonTexture}
        normalMap={moonTexture}
        emissiveMap={moonTexture}
        emissive={0xffffff}
        emissiveIntensity={0.02}
      />
    </mesh>
  )
})

export default Moon
