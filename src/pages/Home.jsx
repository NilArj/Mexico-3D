import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import {
  Text,
  Float,
  Environment,
  MeshReflectorMaterial,
} from "@react-three/drei";

import bgImage from "../images/chichen3.jpg";
import image1 from "../images/diademuertos.jpg";
import image2 from "../images/mariachi.jpg";
import image3 from "../images/tequila.jpg";
import image4 from "../images/chichen2.jpg";

const CustomTexts = () => {
  return (
    <>
      <Text
        color={"gray"}
        maxWidth={5}
        anchorX="center"
        anchorY="top"
        position={[0, 3.6, 0]}
        fontSize={0.15}
      >
        Nilvia Arjona Project
      </Text>
      <Float
        speed={2} // Animation speed, defaults to 1
        rotationIntensity={0.6} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[0.1, -0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Text
          curveRadius={-8}
          outlineWidth={0.1}
          outlineColor={"#f2f1ee"}
          color={"#537188"}
          maxWidth={3}
          anchorX="center"
          anchorY="top"
          position={[0.1, 2.6, 0]}
          fontSize={1}
        >
          MEXICO
        </Text>
      </Float>
    </>
  );
};

const CustomBackground = () => {
  const texture = useLoader(THREE.TextureLoader, bgImage);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.offset.set(0, 0);
  texture.repeat.set(1, 1);

  return (
    <Float
      speed={1} // Animation speed, defaults to 1
      rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
      floatIntensity={0.2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <mesh scale={[20, 9.7, 1]} position={[0, 0, -1]}>
        <meshBasicMaterial map={texture} />
        <planeGeometry args={[1, 1]} />
      </mesh>
    </Float>
  );
};

const Images = () => {
  const images = [
    // Left
    {
      position: [-1.8, 0, 2],
      rotation: [0, Math.PI / 6, 0],
      url: image2,
      item: 2,
    },
    // Front

    {
      position: [0, 0, 2.7],
      rotation: [0, 0, 0],
      url: image1,
      item: 1,
    },
    // Right

    {
      position: [1.8, 0, 2],
      rotation: [0, -Math.PI / 2.5, 0],
      url: image4,
      item: 4,
    },
  ];

  return (
    <>
      {images.map((item, index) => {
        const texture = useLoader(THREE.TextureLoader, item.url);
        return (
          <mesh key={index} position={item.position}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={texture} />
          </mesh>
        );
      })}
    </>
  );
};

const Home = () => {
  return (
    <Canvas>
      <group>
        <CustomBackground />
      </group>
      <CustomTexts />
      <Images />
      <Environment preset="city" />
    </Canvas>
  );
};

export default Home;
