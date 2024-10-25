import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function AnimatedSphere() {
  const sphereRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    sphereRef.current.position.y = Math.sin(t) * 0.2;
    sphereRef.current.rotation.y += 0.01;
  });

  return (
    <Sphere ref={sphereRef} args={[1, 32, 32]}>
      <meshStandardMaterial
        color="#4F46E5"
        wireframe
        emissive="#4F46E5"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
}

const ThreeScene = () => {
  return (
    <Canvas className="absolute inset-0 -z-10">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AnimatedSphere />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default ThreeScene;