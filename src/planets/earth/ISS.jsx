import { useGLTF, useHelper } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const ISS = () => {
  const meshRef = useRef()
  const memoizedISS = useMemo(() => {
    return useGLTF('/ISSModel/ISS_stationary.gltf')
  }, [])

  // create a bounding box helper for the mesh
  //   useHelper(meshRef, THREE.BoxHelper, 'cyan')
  const xAxis = 2
  useFrame(({ clock }) => {
    meshRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.6) * xAxis
    meshRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.6) * xAxis
  })

  return (
    <mesh>
      <primitive
        ref={meshRef}
        object={memoizedISS.scene}
        position={[xAxis, 0.5, 0]}
        scale={0.005}
      />
    </mesh>
  )
}

export default ISS
