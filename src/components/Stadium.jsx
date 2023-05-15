import { Canvas, useLoader } from "@react-three/fiber";
import { Stage, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useState } from "react";

const Stadium = () => {
  const [loaded, setLoaded] = useState(false);
  const gltf = useLoader(GLTFLoader, "camp_nou_stadium.glb");

  useEffect(() => {
    const handleContextLost = (e) => {
      e.preventDefault();
      setLoaded(false);
    };
    const canvas = document.querySelector("canvas");
    canvas.addEventListener("webglcontextlost", handleContextLost, false);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost, false);
    };
  }, []);

  if (!loaded) {
    gltf.scene.scale.multiplyScalar(1 / 100); // adjust scalar factor to match your scene scale
    gltf.scene.position.x = 20; // once rescaled, position the model where needed
    gltf.scene.position.z = -20;
    setLoaded(true);
  }

  return (
    <div className="content-section">
      <Canvas
        shadows
        camera={{ position: [-1, 6, 8], fov: 35 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Stage
          intensity={0.3}
          preset="rembrandt"
          adjustCamera={1.1}
          environment="night"
        >
          <primitive object={gltf.scene} castShadow receiveShadow />

          <OrbitControls
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 1.9}
            enabledPan={true}
            enableRotate={true}
            enableZoom={true}
          />
        </Stage>
      </Canvas>
    </div>
  );
};

export default Stadium;
