import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Group } from 'three'
import Moon from './Moon'

const Earth = ({ displacementScale, position }) => {
  const earthRef = useRef()
  const groupRef = useRef(new Group())
  const { camera } = useThree()

  const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] =
    useTexture([
      '/assets/earth_day.jpg',
      '/assets/earth_normal.jpg',
      '/assets/earth_specular.jpg',
      '/assets/earth_displacement.jpg',
    ])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    const earthSpeed = 0.002
    const moonSpeed = 0.05 / 2
    earthRef.current.rotation.y = time * earthSpeed
    groupRef.current.rotation.y = time * moonSpeed
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={earthRef}>
        {/* Radius , X-axis , Y-axis */}
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          map={earthTexture}
          normalMap={earthNormalMap}
          specularMap={earthSpecularMap}
          displacementMap={earthDisplacementMap}
          displacementScale={displacementScale}
        />
      </mesh>
      <Moon distance={2} speed={0.05} radius={0.3} />
    </group>
  )
}

export default Earth
