import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Text, Float, Environment, useCursor } from "@react-three/drei";
import { useRoute, useLocation } from "wouter";
import { easing } from "maath";
import getUuid from "uuid-by-string";

import bgImage from "../images/chichen3.jpg";
import image1 from "../images/diademuertos.jpg";
import image2 from "../images/mariachi.jpg";
import image4 from "../images/chichen2.jpg";

const GOLDENRATIO = 1.61803398875;

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

const ImageFrame = ({ url, position, c = new THREE.Color() }) => {
  const texture = useLoader(THREE.TextureLoader, url);
  const frame = useRef();
  const [hovered, setHovered] = useState(false);
  const frameColor = hovered ? "#537188" : "#f2f1ee";
  const [, params] = useRoute("/item/:id");
  const [rnd] = useState(() => Math.random());
  const name = getUuid(url);
  const isActive = params?.id === name;
  useCursor(hovered);
  useFrame((state, dt) => {
    frame.current.material.zoom =
      2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
    easing.damp3(
      frame.current.scale,
      [
        0.85 * (!isActive && hovered ? 0.85 : 1),
        0.9 * (!isActive && hovered ? 0.905 : 1),
        1,
      ],
      0.1,
      dt
    );
    easing.dampC(
      frame.current.material.color,
      hovered ? "blue" : "white",
      0.1,
      dt
    );
  });

  return (
    <Float
      speed={1}
      rotationIntensity={0.1}
      floatIntensity={0.2}
      floatingRange={[0.1, -0.1]}
    >
      <group>
        {/* image */}
        <mesh
          name={name}
          ref={frame}
          onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
          onPointerOut={() => setHovered(false)}
          scale={[1, GOLDENRATIO, 0.05]}
          position={[position[0], position[1], position[2]]}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial map={texture} />
        </mesh>

        {/* frame */}
        <mesh
          castShadow
          receiveShadow
          position={[0, 0, -0.01]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={[1.08, 1.08]} />
          <meshStandardMaterial color={frameColor} />
        </mesh>

        {/* shadow */}
        <mesh
          position={[0, -1.4, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[1.4, 1.4]} />
          <meshStandardMaterial color="#000000" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
};

const Images = ({
  images,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}) => {
  const ref = useRef();
  const clicked = useRef();
  const [, params] = useRoute("/item/:id");
  const [, setLocation] = useLocation();

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      clicked.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  });

  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt);
    easing.dampQ(state.camera.quaternion, q, 0.4, dt);
  });

  return (
    <Float
      speed={1}
      rotationIntensity={0.1}
      floatIntensity={0.2}
      floatingRange={[0.1, -0.1]}
    >
      <group
        ref={ref}
        onClick={(e) => (
          e.stopPropagation(),
          setLocation(
            clicked.current === e.object ? "/" : "/item/" + e.object.name
          )
        )}
        onPointerMissed={() => setLocation("/")}
      >
        {images.map((image) => (
          <ImageFrame
            key={image.item}
            url={image.url}
            position={image.position}
          />
        ))}
      </group>
    </Float>
  );
};

const Home = () => {
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
    <Canvas shadow-map>
      <CustomBackground />
      <CustomTexts />
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 15, 10]} angle={0.3} penumbra={3} castShadow />
      <Images images={images} />
      <Environment preset="city" />
    </Canvas>
  );
};

export default Home;
