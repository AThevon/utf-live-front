'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export default function SceneLights() {
  const spotRef = useRef<THREE.SpotLight>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (spotRef.current) {
      spotRef.current.intensity = 14.5 + Math.abs(Math.sin(t * 1.5)) * 0.3
    }
  })

  return (
    <>
      <ambientLight intensity={0.05} />

      <spotLight
        ref={spotRef}
        position={[1.4, 3, 0]}
        color="#dffeff"
        angle={0.4}
        penumbra={1}
        intensity={15}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <pointLight
        position={[0.2, 2, -3]}
        intensity={0.3}
        color="#00ffff"
      />
    </>
  )
}
