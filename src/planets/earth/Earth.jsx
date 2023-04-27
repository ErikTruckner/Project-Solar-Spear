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
  const [clicked, click] = useState(false)
  const [followEarth, setFollowEarth] = useState(false)
  //
  //
  const { camera } = useThree()
  const originalCameraPosition = new THREE.Vector3(16.14, 8.32, 19.81)

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

  const handleClick = () => {
    const earthPosition = earthRef.current.position
    const cameraPosition = camera.position
    const tweenDuration = 4000 // in milliseconds

    if (followEarth) {
      // If already following the Earth, move the camera back to its original position
      const targetPosition = originalCameraPosition

      const toOriginalTween = new TWEEN.Tween(cameraPosition)
      toOriginalTween.to(targetPosition, tweenDuration)
      toOriginalTween.easing(TWEEN.Easing.Quadratic.Out)
      toOriginalTween.onUpdate(() => {
        camera.position.copy(cameraPosition)
        camera.lookAt(new THREE.Vector3(0, 0, 0))
        camera.updateProjectionMatrix()
      })
      toOriginalTween.start()

      setFollowEarth(false)
    } else {
      // If not following the Earth, move the camera to look at the Earth
      const targetPosition = new THREE.Vector3(
        earthPosition.x,
        earthPosition.y + 2,
        earthPosition.z + 5
      )

      const earthPositionClone = earthPositionRef.current.clone()
      cameraPosition.set(
        earthPositionClone.x + 0,
        earthPositionClone.y + 2,
        earthPositionClone.z + 5
      )

      const toEarthTween = new TWEEN.Tween(cameraPosition)
      toEarthTween.to(targetPosition, tweenDuration)
      toEarthTween.easing(TWEEN.Easing.Quadratic.Out)
      toEarthTween.onUpdate(() => {
        camera.position.copy(cameraPosition)
        camera.lookAt(earthPosition)
      })
      toEarthTween.start()

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
    } else {
      const cameraPosition = camera.position
      cameraPosition.set(
        originalCameraPosition.x,
        originalCameraPosition.y,
        originalCameraPosition.z
      )
    }
  })

  return (
    <group ref={earthRef} onClick={handleClick}>
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
