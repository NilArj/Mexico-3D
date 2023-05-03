import { Canvas, useThree } from "@react-three/fiber";
import { Center, Text3D, OrbitControls } from "@react-three/drei";

const Home = () => {
  return (
    <div className="content-section">
      <Canvas orthographic></Canvas>
    </div>
  );
};

export default Home;
