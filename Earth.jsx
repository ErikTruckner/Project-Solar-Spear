import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import Moon from './Moon'
import ISS from './ISS'

const Earth = React.memo(({ displacementScale }) => {
  const earthRef = useRef()
  const earthPositionRef = useRef(new THREE.Vector3(10, 0, 0))
  const clockRef = useRef(new THREE.Clock())

  //
  const [hovered, hover] = useState(false)

  const [followEarth, setFollowEarth] = useState(false)
  //
  //
  const { camera } = useThree()
  //

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

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  const toggleCamera = () => {
    const earthPosition = earthRef.current.position
    const cameraPosition = camera.position.clone()
    const tweenDuration = 500 // in milliseconds

    if (followEarth) {
      // If already following the Earth, move the camera back to its original position
      new TWEEN.Tween(cameraPosition)
        .to({ x: 16.14, y: 8.32, z: 19.81 }, tweenDuration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          camera.position.copy(cameraPosition)
          camera.lookAt(new THREE.Vector3(0, 0, 0))
          camera.updateProjectionMatrix()
        })
        .start()

      setFollowEarth(false)
    } else {
      // If not following the Earth, move the camera to look at the Earth
      const targetPosition = new THREE.Vector3(
        earthPosition.x,
        earthPosition.y + 2,
        earthPosition.z + 5
      )

      new TWEEN.Tween(cameraPosition)
        .to(targetPosition, tweenDuration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(() => {
          camera.position.copy(cameraPosition)
          camera.lookAt(earthPosition)
        })
        .start()

      setFollowEarth(true)
    }
  }
  //
  useFrame(() => {
    updateEarthPosition()
    if (followEarth) {
      const earthPosition = earthRef.current.position
      const cameraPosition = camera.position
      cameraPosition.set(
        earthPosition.x + 10,
        earthPosition.y + 2,
        earthPosition.z + 5
      )
      camera.lookAt(earthPosition)
    }

    TWEEN.update()
  })

  return (
    <group ref={earthRef} onClick={toggleCamera}>
      <mesh
        castShadow
        receiveShadow
        // NEW ADDITIONS
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
        // Use pointerEvents to change cursor on hover

        style={{ cursor: hovered ? 'pointer' : 'auto' }}>
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
