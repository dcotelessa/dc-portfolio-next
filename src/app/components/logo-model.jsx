import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { bounce } from "../../utils/bounce";

export function Model(props) {
  const { nodes: blueNodes, materials: blueMaterials } = useGLTF(
    "/dc-letter-blue.gltf",
  );
  const { nodes: whiteNodes, materials: whiteMaterials } = useGLTF(
    "/dc-letter-white.gltf",
  );

  const modelRef = useRef();

  const zBounce = bounce(50);
  const spinBounce = bounce(50, 0.25, 3);

  useFrame(({ clock }) => {
    modelRef.current.rotation.z =
      (spinBounce.getPosition(clock.getElapsedTime() * 5) +
        Math.cos(clock.getElapsedTime()) * 2) /
      7;
    modelRef.current.position.z = zBounce.getPosition(clock.getElapsedTime());
  });

  return (
    <group {...props} dispose={null} ref={modelRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={blueNodes["LetterBlock-Blue"].geometry}
        material={blueMaterials.Mat_1}
        position={[0, -10, 0]}
        rotation={[-0.1, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={whiteNodes["LetterBlock-White"].geometry}
        material={whiteMaterials.Mat_1}
        position={[0, -10, 0]}
        rotation={[-0.1, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/dc-letter-blue.gltf");
useGLTF.preload("/dc-letter-white.gltf");
