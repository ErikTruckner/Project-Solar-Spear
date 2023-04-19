import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const Moon = () => {
  const moonRef = useRef()

  const [moonTexture] = useTexture(['/assets/moon_map.jpg'])

  useFrame(({ clock }) => {
    moonRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.2) * 4
    moonRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.2) * 4
    moonRef.current.rotation.y += 0.005
  })

  return (
    <mesh ref={moonRef} position={[4, 0, 0]} receiveShadow castShadow>
      {/* Radius , X-axis , Y-axis */}
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshPhongMaterial map={moonTexture} />
    </mesh>
  )
}

export default Moon
