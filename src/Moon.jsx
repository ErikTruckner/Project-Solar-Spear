import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const Moon = ({ distance, speed, radius }) => {
  const meshRef = useRef()
  const orbitAngle = useRef(0)
  const rotationAngle = useRef(0)

  useFrame(({ clock }) => {
    const moonSpeed = 0.5
    const orbitSpeed = moonSpeed / distance
    orbitAngle.current = orbitSpeed * clock.elapsedTime
    rotationAngle.current += moonSpeed * clock.elapsedTime

    const x = Math.cos(orbitAngle.current) * distance
    const z = Math.sin(orbitAngle.current) * distance
    meshRef.current.position.set(x, 0, z)

    meshRef.current.rotation.y = rotationAngle.current
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial color='#ffffff' />
    </mesh>
  )
}

export default Moon
