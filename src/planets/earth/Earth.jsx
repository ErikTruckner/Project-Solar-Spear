import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import Moon from './Moon'
import ISS from './ISS'

const Earth = ({ displacementScale, position }) => {
  const earthRef = useRef()
  const earthPositionRef = useRef(position)

  const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] =
    useTexture([
      '/assets/earth_day.jpg',
      '/assets/earth_normal.jpg',
      '/assets/earth_specular.jpg',
      '/assets/earth_displacement.jpg',
    ])

  useFrame(() => {
    earthRef.current.rotation.y += 0.002
    earthPositionRef.current = earthRef.current.position
  })

  return (
    <group position={position} ref={earthRef}>
      <mesh receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={earthTexture}
          normalMap={earthNormalMap}
          specularMap={earthSpecularMap}
          shininess={100}
          displacementMap={earthDisplacementMap}
          displacementScale={displacementScale}
        />
      </mesh>
      <Moon />
      <ISS />
    </group>
  )
}

export default Earth
