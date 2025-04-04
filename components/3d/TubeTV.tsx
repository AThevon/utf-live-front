import * as THREE from 'three'
import React, { JSX, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { AnimationClip } from 'three'
import { GLTF } from 'three-stdlib'
import { useFrame } from '@react-three/fiber'

type GLTFResult = GLTF & {
  nodes: {
    polySurface6_tela_0: THREE.Mesh
    polySurface6_TV_0: THREE.Mesh
    polySurface6_lambert3_0: THREE.Mesh
    ['polySurface6_bot��es_0']: THREE.Mesh
    polySurface6_lambert6_0: THREE.Mesh
  }
  materials: {
    tela: THREE.MeshStandardMaterial
    material: THREE.MeshStandardMaterial
    lambert3: THREE.MeshStandardMaterial
    botes: THREE.MeshStandardMaterial
    lambert6: THREE.MeshStandardMaterial
  }
  animations: AnimationClip[]
}

export function TubeTV(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/tube-tv.glb') as unknown as GLTFResult

  const glitchMat = useRef<THREE.ShaderMaterial>(null)

  useFrame(({ clock }) => {
    if (glitchMat.current) {
      glitchMat.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group position={[0, 5.216, 0]}>
          <mesh geometry={nodes.polySurface6_tela_0.geometry}>
            <shaderMaterial
              ref={glitchMat}
              attach="material"
              args={[{
                uniforms: {
                  uTime: { value: 0 }
                },
                vertexShader: `
                  varying vec2 vUv;
                  void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                  }
                `,
                fragmentShader: `
                  uniform float uTime;
                  varying vec2 vUv;

                  void main() {
                    float scanline = sin(vUv.y * 600.0 + uTime * 10.0) * 0.15;
                    float glitch = step(0.85, fract(sin(dot(vUv * uTime, vec2(12.9898,78.233))) * 43758.5453));
                   vec3 color = vec3(0.0, 0.3, 0.4); // un bon cyan doux
                     float intensity = 1.0 + scanline + glitch * 0.5;
                    gl_FragColor = vec4(color + scanline + glitch * 0.5, 1.0);
                  }
                `,
                transparent: false
              }]}
            />
          </mesh>

          <mesh geometry={nodes.polySurface6_TV_0.geometry} material={materials.lambert3} castShadow receiveShadow />
          <mesh geometry={nodes.polySurface6_lambert3_0.geometry} material={materials.lambert3} castShadow receiveShadow />
          <mesh geometry={nodes['polySurface6_bot��es_0'].geometry} material={materials.lambert3} castShadow receiveShadow />
          <mesh geometry={nodes.polySurface6_lambert6_0.geometry} material={materials.lambert6} castShadow receiveShadow />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/tube-tv.glb')
