import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import Moon from './Moon'

const Earth = ({ displacementScale }) => {
  const earthRef = useRef()

  const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] =
    useTexture([
      '/assets/earth_day.jpg',
      '/assets/earth_normal.jpg',
      '/assets/earth_specular.jpg',
      '/assets/earth_displacement.jpg',
    ])

  useFrame(() => {
    earthRef.current.rotation.y += 0.002
  })

  return (
    <group>
      <mesh ref={earthRef} receiveShadow castShadow>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={earthTexture}
          normalMap={earthNormalMap}
          // normalScale={[0.2, 0.2]}
          specularMap={earthSpecularMap}
          shininess={100}
          displacementMap={earthDisplacementMap}
          displacementScale={displacementScale}
        />
      </mesh>
      <Moon />
    </group>
  )
}

export default Earth
