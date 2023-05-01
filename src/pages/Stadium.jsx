import { Canvas } from "@react-three/fiber";
import { Stage, OrbitControls, Gltf } from "@react-three/drei";

const Stadium = () => {
  return (
    <div className="content-section">
      <Canvas shadows camera={{ position: [-1, 6, 8], fov: 35 }}>
        <Stage
          intensity={0.3}
          preset="rembrandt"
          adjustCamera={1.1}
          environment="night"
        >
          <Gltf castShadow receiveShadow src="camp_nou_stadium.glb" />
        </Stage>
        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.9}
          makeDefault
        />
      </Canvas>
    </div>
  );
};

export default Stadium;
