import { useHelper } from '@react-three/drei'
import AnimatedStars from './AnimatedStars'
import { useRef } from 'react'
import Earth from './Earth'
import * as THREE from 'three'

const MainContainer = () => {
  const directionalLightRef = useRef()
  const directionalLightRefTwo = useRef()
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, 'hotpink')
  useHelper(directionalLightRefTwo, THREE.DirectionalLightHelper, 1, 'hotpink')
  return (
    <>
      <AnimatedStars />
      {/* <directionalLight
        ref={directionalLightRef}
        position={[0, 0, 10]}
        intensity={1}
        // color={0xff0000}
      />
      <directionalLight ref={directionalLightRefTwo} position={[0, 0, -10]} /> */}
      <ambientLight />

      <Earth position={[0, 0, 0]} displacementScale={0.02} />
    </>
  )
}

export default MainContainer
