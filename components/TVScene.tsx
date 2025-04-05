'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import {
  Environment,
  ContactShadows,
  Plane,
  Center,
} from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import { TubeTV } from '@/components/3d/TubeTV'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Microphone } from '@/components/3d/Microphone'
import { useSpring, a } from '@react-spring/three'

export default function TVScene() {
  const spotRef = useRef<THREE.SpotLight>(null!)

  return (
    <div className="w-full h-screen-minus-navbar bg-black">
      <Canvas
        shadows
        camera={{ position: [0, 1, 3], fov: 20 }}
        gl={{
          toneMappingExposure: 0.9,
          preserveDrawingBuffer: true,
        }}
        style={{ backgroundColor: '#0e0e0e' }}
      >
        <Suspense fallback={null}>
          <SceneContent spotRef={spotRef} />
        </Suspense>
      </Canvas>
    </div>
  )


  function SceneContent({ spotRef }: { spotRef: React.RefObject<THREE.SpotLight> }) {
    const [isMobile, setIsMobile] = useState(false)
    const [isTablet, setIsTablet] = useState(false)
    const [ready, setReady] = useState(false)

    useEffect(() => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)

      requestAnimationFrame(() => {
        setReady(true)
      })
    }, [])


    // Flickering light
    useFrame(({ clock }) => {
      const t = clock.getElapsedTime()
      const base = 13
      const flicker = Math.sin(t * 3) * 0.1
      if (spotRef.current) {
        spotRef.current.intensity += (base + flicker - spotRef.current.intensity) * 0.05
      }
    })

    // Spring animation for fade-in
    const tvSpring = useSpring({
      from: { opacity: 0 },
      to: { opacity: ready ? 1 : 0 },
      config: { tension: 80, friction: 26 },
      delay: 300,
    })

    const micSpring = useSpring({
      from: { opacity: 0 },
      to: { opacity: ready ? 1 : 0 },
      config: { tension: 80, friction: 24 },
      delay: 700,
    })


    if (!ready) return null;

    return (
      <>
        <color attach="background" args={['#0e0e0e']} />
        <fog attach="fog" args={['#0a0a0a', 5, 15]} />
        <ambientLight intensity={0.05} />

        <spotLight
          ref={spotRef}
          position={[0.8, 2, 0]}
          color="#dffeff"
          angle={0.4}
          penumbra={1}
          intensity={15}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <pointLight position={[0.6, 2, -3]} intensity={0.3} color="#dffeff" />

        <Environment preset="city" environmentIntensity={0.035} />

        <group
          position={
            isMobile
              ? [0.08, -0.2, 0.2]
              : isTablet
                ? [0.3, -0.23, 0.2]
                : [0.5, -0.25, 0.2]
          }
        >
          <a.group style={{ opacity: tvSpring.opacity }}>
            <Center top rotation={[0, Math.PI / 0.59, 0]}>
              <TubeTV scale={isMobile ? 10 : isTablet ? 13 : 16} />
            </Center>
          </a.group>

          <a.group style={{ opacity: micSpring.opacity }}>
            <Center
              top
              position={
                isMobile
                  ? [-0.1, 0, -0.3]
                  : isTablet
                    ? [-0.2, 0, -0.3]
                    : [-0.3, 0, -0.3]
              }
              rotation={[0, Math.PI / 0.59, 0]}
            >
              <Microphone
                scale={isMobile ? 0.2 : isTablet ? 0.225 : 0.25}
                rotation={[0, Math.PI / -2.5, 0]}
              />
            </Center>
          </a.group>

          {/* Plane reste en dehors de l'animation */}
          <Plane
            args={[30, 30]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.001, 0]}
            receiveShadow
          >
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.6}
              metalness={0.2}
            />
          </Plane>
        </group>


        <ContactShadows position={[0.6, 0, 0]} opacity={0.3} scale={10} blur={2} />

        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.5} intensity={1.5} />
        </EffectComposer>
      </>
    )
  }
}