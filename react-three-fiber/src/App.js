import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { Model } from "./Model";

export function App() {
  const { color } = useControls({ color: "#153f45" });
  return (
    <div className="App" style={{ background: "#4b4e4e" }}>
      <Canvas shadows camera={{ position: [4, 0, -12], fov: 35 }}>
        <Stage
          intensity={1.5}
          environment="city"
          shadows={{ type: "accumulative", colorBlend: 2, opacity: 2 }}
        >
          <Model color={color} />
        </Stage>
        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
}
