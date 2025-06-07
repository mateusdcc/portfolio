import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box as DreiBox, Text } from '@react-three/drei';
import { Box as MuiBox, Typography } from '@mui/material';

const RotatingBox = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <DreiBox ref={meshRef} args={[2, 2, 2]} castShadow receiveShadow>
      <meshStandardMaterial color="#673ab7" />
    </DreiBox>
  );
};

const HeroBanner: React.FC = () => {
  return (
    <MuiBox 
      sx={{
        height: '60vh', 
        width: '100%', 
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', // Needed for absolute positioning of text
        overflow: 'hidden' // Prevent scrollbars from canvas
      }}
    >
      <Canvas 
        shadows // Enable shadows in the scene
        camera={{ position: [0, 2, 8], fov: 50 }} // Adjust camera position and field of view
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={1024} // Optional: for better shadow quality
          shadow-mapSize-height={1024}
        />
        <Suspense fallback={null}>
          <RotatingBox />
          <Text
            position={[0, 0, 3]} // Position the text slightly in front of the box
            fontSize={0.6}
            color="#e0e0e0"
            anchorX="center"
            anchorY="middle"
            maxWidth={10} // To wrap text if it's too long
            textAlign="center"
          >
            Welcome to My Portfolio
          </Text>
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      {/* Fallback content or additional UI elements can go here if needed */}
      {/* This Typography is an example if you want text overlay outside the canvas */}
      {/* <Typography variant="h2" sx={{ color: 'text.primary', zIndex: 1, position: 'relative' }}>
        Welcome!
      </Typography> */}
    </MuiBox>
  );
};

export default HeroBanner;
