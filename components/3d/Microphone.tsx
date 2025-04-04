
import * as THREE from 'three'
import React, { JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh
    Object_6: THREE.Mesh
    Object_8: THREE.Mesh
    Object_10: THREE.Mesh
    Object_12: THREE.Mesh
    Object_14: THREE.Mesh
    Object_16: THREE.Mesh
    Object_18: THREE.Mesh
    Object_20: THREE.Mesh
    Object_22: THREE.Mesh
    Object_24: THREE.Mesh
    Object_25: THREE.Mesh
    Object_27: THREE.Mesh
    Object_29: THREE.Mesh
    Object_31: THREE.Mesh
    Object_33: THREE.Mesh
    Object_35: THREE.Mesh
    Object_37: THREE.Mesh
  }
  materials: {
    ['hitam.002']: THREE.MeshStandardMaterial
    base: THREE.MeshStandardMaterial
    hitam_metalic: THREE.MeshStandardMaterial
    black: THREE.MeshStandardMaterial
    ['case_metal.001']: THREE.MeshStandardMaterial
    ['ALUMINIUM.073']: THREE.MeshStandardMaterial
  }
  animations: THREE.AnimationClip[]
}

export function Microphone(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/microphone.glb') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group position={[-12.717, 22.789, -17.673]} scale={0.041}>
        <mesh geometry={nodes.Object_24.geometry} material={materials['case_metal.001']} castShadow receiveShadow />
        <mesh geometry={nodes.Object_25.geometry} material={materials['ALUMINIUM.073']} castShadow receiveShadow />
      </group>
      <mesh geometry={nodes.Object_4.geometry} material={materials['hitam.002']} position={[-12.531, 22.844, -17.673]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.142} castShadow receiveShadow />
      <mesh geometry={nodes.Object_6.geometry} material={materials.base} position={[-12.521, 22.595, -17.673]} rotation={[0, Math.PI / 2, 0]} scale={0.019} castShadow receiveShadow />
      <mesh geometry={nodes.Object_8.geometry} material={materials.hitam_metalic} position={[-12.717, 22.466, -17.673]} rotation={[-Math.PI, Math.PI / 4, -Math.PI]} scale={[0.125, 0.135, 0.125]} castShadow receiveShadow />
      <mesh geometry={nodes.Object_10.geometry} material={materials.hitam_metalic} position={[-12.717, 22.576, -17.673]} rotation={[-Math.PI, Math.PI / 4, -Math.PI]} scale={[0.125, 0.135, 0.125]} castShadow receiveShadow />
      <mesh geometry={nodes.Object_12.geometry} material={materials.black} position={[-12.717, 22.699, -17.673]} rotation={[0, Math.PI / 2, 0]} scale={[0.123, 0.133, 0.123]} castShadow receiveShadow />
      <mesh geometry={nodes.Object_14.geometry} material={materials.black} position={[-12.717, 22.453, -17.673]} rotation={[Math.PI, Math.PI / 2, 0]} scale={[0.123, 0.133, 0.123]} castShadow receiveShadow />
      <mesh geometry={nodes.Object_16.geometry} material={materials.base} position={[-12.846, 22.566, -17.673]} rotation={[Math.PI / 2, 0.752, -Math.PI / 2]} scale={[0.011, 0.02, 0.02]} castShadow receiveShadow />
      <mesh geometry={nodes.Object_18.geometry} material={materials.base} position={[-12.846, 22.566, -17.673]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={[0.02, 0.017, 0.02]} castShadow receiveShadow />
      <mesh geometry={nodes.Object_20.geometry} material={materials.base} position={[-12.894, 22.52, -17.673]} rotation={[Math.PI / 2, 0.744, -Math.PI / 2]} scale={0.023} castShadow receiveShadow />
      <mesh geometry={nodes.Object_22.geometry} material={materials.black} position={[-12.717, 22.788, -17.673]} scale={0.04} castShadow receiveShadow />
      <mesh geometry={nodes.Object_27.geometry} material={materials.base} position={[-12.894, 22.52, -17.673]} rotation={[Math.PI / 2, 0.744, -Math.PI / 2]} scale={0.023} castShadow receiveShadow />
      <mesh geometry={nodes.Object_29.geometry} material={materials.black} position={[-12.717, 22.421, -17.673]} castShadow receiveShadow />
      <mesh geometry={nodes.Object_31.geometry} material={materials.black} position={[-13.068, 22.367, -17.664]} rotation={[0, 0, -0.794]} scale={0.036} castShadow receiveShadow />
      <mesh geometry={nodes.Object_33.geometry} material={materials.black} position={[-13.28, 22.158, -17.669]} rotation={[0, 0, -0.794]} scale={0.048} castShadow receiveShadow />
      <mesh geometry={nodes.Object_35.geometry} material={materials.black} position={[-13.318, 21.72, -17.667]} scale={0.034} castShadow receiveShadow />
      <mesh geometry={nodes.Object_37.geometry} material={materials.black} position={[-13.318, 21.045, -17.667]} scale={0.034} castShadow receiveShadow />
    </group>
  )
}

useGLTF.preload('/models/microphone.glb')
