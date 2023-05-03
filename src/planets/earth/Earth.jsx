import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import Moon from './Moon'
import ISS from './ISS'

const Earth = React.memo(({ displacementScale }) => {
  const earthRef = useRef()
  const clockRef = useRef(new THREE.Clock())

  const { camera } = useThree()

  const [hovered, setHovered] = useState(false)
  const [followingEarth, setFollowingEarth] = useState(false)
  const [cameraPosition, setCameraPosition] = useState(
    new THREE.Vector3(16.14, 8.32, 19.81)
  )
  const [cameraTarget, setCameraTarget] = useState(new THREE.Vector3(0, 0, 0))

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
    const angle = clockRef.current.getElapsedTime() * 0.2
    const distance = 10
    const x = Math.sin(angle) * distance
    const z = Math.cos(angle) * distance
    earthRef.current.position.set(x, 0, z)
    earthRef.current.rotation.y += 0.006
  }, [])

  const toggleFollowingEarth = () => {
    setFollowingEarth((prevFollowingEarth) => !prevFollowingEarth)
  }

  useFrame(() => {
    updateEarthPosition()
    TWEEN.update()

    const earthPosition = earthRef.current.position

    if (followingEarth) {
      const targetPosition = new THREE.Vector3(
        earthPosition.x + 10,
        earthPosition.y + 2,
        earthPosition.z + 5
      )

      new TWEEN.Tween(cameraPosition)
        .to(targetPosition, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          setCameraPosition(cameraPosition)
        })
        .start()

      // Create a new tween for cameraTarget
      new TWEEN.Tween(cameraTarget)
        .to(earthPosition, 2000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          setCameraTarget(cameraTarget)
        })
        .start()
    } else {
      const targetPosition = new THREE.Vector3(16.14, 8.32, 19.81)

      new TWEEN.Tween(cameraPosition)
        .to(targetPosition, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          setCameraPosition(cameraPosition)
        })
        .start()

      // Create a new tween for cameraTarget
      new TWEEN.Tween(cameraTarget)
        .to(new THREE.Vector3(0, 0, 0), 2000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          setCameraTarget(cameraTarget)
        })
        .start()
    }

    camera.position.copy(cameraPosition)
    camera.lookAt(cameraTarget)
    camera.updateProjectionMatrix()
  })

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  return (
    <group ref={earthRef} onClick={toggleFollowingEarth}>
      <mesh
        castShadow
        receiveShadow
        // Use pointerEvents to change cursor on hover
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}>
        {/*  */}

        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={earthTexture}
          normalMap={earthNormalMap}
          emissiveMap={earthEmissiveMap}
          emissive={0xffffff}
          emissiveIntensity={hovered ? 20 : 1.5}
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
})

export default Earth
