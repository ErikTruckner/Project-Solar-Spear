import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useMemo, useCallback } from 'react'
import * as THREE from 'three'
import Moon from './Moon'
import ISS from './ISS'

// const Earth = ({ displacementScale }) => {
//   const earthRef = useRef()
//   const earthPositionRef = useRef(new THREE.Vector3(10, 0, 0))

//   const [
//     earthTexture,
//     earthNormalMap,
//     earthSpecularMap,
//     earthDisplacementMap,
//     earthEmissiveMap,
//   ] = useTexture([
//     '/assets/earth_day.jpg',
//     '/assets/earth_normal.jpg',
//     '/assets/earth_specular.jpg',
//     '/assets/earth_displacement.jpg',
//     '/assets/earth_night.jpg',
//   ])

//   useFrame(({ clock }) => {
//     // Calculate the Earth's position based on its angle from the Sun
//     const angle = clock.getElapsedTime() * 0.5
//     const distance = 10
//     const x = Math.sin(angle) * distance
//     const z = Math.cos(angle) * distance
//     earthRef.current.position.set(x, 0, z)
//     earthRef.current.rotation.y += 0.002
//     earthPositionRef.current = earthRef.current.position
//   })

//   return (
//     <group ref={earthRef}>
//       <mesh castShadow receiveShadow>
//         <sphereGeometry args={[1, 64, 64]} />
//         <meshPhongMaterial
//           map={earthTexture}
//           normalMap={earthNormalMap}
//           emissiveMap={earthEmissiveMap}
//           emissive={0xffffff}
//           emissiveIntensity={1.5}
//           specularMap={earthSpecularMap}
//           shininess={100}
//           displacementMap={earthDisplacementMap}
//           displacementScale={displacementScale}
//         />
//       </mesh>
//       <Moon earthPosition={earthPositionRef.current} />
//       <ISS earthPosition={earthPositionRef.current} />
//     </group>
//   )
// }

const Earth = React.memo(({ displacementScale }) => {
  const earthRef = useRef()
  const earthPositionRef = useRef(new THREE.Vector3(10, 0, 0))
  const clockRef = useRef(new THREE.Clock())

  const [
    earthTexture,
    earthNormalMap,
    earthSpecularMap,
    earthDisplacementMap,
    earthEmissiveMap,
  ] = useTexture([
    '/assets/earth_day.jpg',
    '/assets/earth_normal.jpg',
    '/assets/earth_specular.jpg',
    '/assets/earth_displacement.jpg',
    '/assets/earth_night.jpg',
  ])

  const updateEarthPosition = useCallback(() => {
    const angle = clockRef.current.getElapsedTime() * 0.5
    const distance = 10
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    earthRef.current.position.set(x, 0, z)
    earthRef.current.rotation.y += 0.002
    earthPositionRef.current = earthRef.current.position
  }, [])

  useFrame(() => {
    updateEarthPosition()
  })

  return (
    <group ref={earthRef}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={earthTexture}
          normalMap={earthNormalMap}
          emissiveMap={earthEmissiveMap}
          emissive={0xffffff}
          emissiveIntensity={1.5}
          specularMap={earthSpecularMap}
          shininess={100}
          displacementMap={earthDisplacementMap}
          displacementScale={displacementScale}
        />
      </mesh>
      <Moon earthPosition={earthPositionRef.current} />
      <ISS earthPosition={earthPositionRef.current} />
    </group>
  )
})

export default Earth
