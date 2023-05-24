import { useGLTF } from "@react-three/drei";

export function Model({ color, ...props }) {
  const { nodes, materials } = useGLTF("/datsun.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_1.geometry}
        material={materials.alloy}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_2.geometry}
        material={materials.headlights}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_3.geometry}
        material={materials.black_paint}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_4.geometry}
        material={materials.tire}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_5.geometry}
        material={materials.black_matte}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_6.geometry}
        material={materials.chrome}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_7.geometry}
        material={materials.license}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_8.geometry}
        material={materials.orange_glass}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_9.geometry}
        material={materials.glass}
      ></mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_10.geometry}
      >
        <meshLambertMaterial color={color} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_11.geometry}
        material={materials.red_glass}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_alloy_0_12.geometry}
        material={materials.stickers}
      />
    </group>
  );
}

useGLTF.preload("/datsun.glb");
