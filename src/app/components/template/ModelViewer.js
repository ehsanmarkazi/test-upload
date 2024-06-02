"use client"
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';

const Model = ({ url, onLoad }) => {
  const { scene, materials } = useGLTF(url, true, undefined, (loader) => {
    loader.manager.onLoad = onLoad;
  });

  // بررسی و تنظیم مواد
  Object.values(materials).forEach((material) => {
    material.needsUpdate = true;
    material.castShadow = true;
    material.receiveShadow = true;
  });

  return <primitive object={scene} />;
};

const ModelViewer = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full h-screen relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      )}
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <directionalLight 
          castShadow 
          position={[5, 10, 5]} 
          intensity={1} 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        <spotLight position={[15, 20, 5]} angle={0.3} intensity={1} castShadow />
        <Model url={url} onLoad={handleLoad} />
        <Environment preset="sunset" />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
