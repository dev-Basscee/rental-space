import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHouseHeroProps {
  reducedMotion?: boolean;
}

export const ThreeHouseHero: React.FC<ThreeHouseHeroProps> = ({ reducedMotion = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 380;
    const height = container.clientHeight || 340;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3.2, 7.5);
    camera.lookAt(0, 0.8, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(6, 10, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const warmFillLight = new THREE.PointLight(0x8B9A6E, 3.0, 15);
    warmFillLight.position.set(-4, 3, 2);
    scene.add(warmFillLight);

    // Root Group for House
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Ground Platform (Warm Sand Disc)
    const groundGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.35, 48);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xEAE2D6,
      roughness: 0.8,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.18;
    ground.receiveShadow = true;
    worldGroup.add(ground);

    // Grass perimeter ring
    const grassGeo = new THREE.CylinderGeometry(3.4, 3.4, 0.05, 48);
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x8B9A6E,
      roughness: 0.9,
    });
    const grass = new THREE.Mesh(grassGeo, grassMat);
    grass.position.y = 0.02;
    worldGroup.add(grass);

    // House Base / Body
    const houseBodyGeo = new THREE.BoxGeometry(2.4, 1.8, 2.2);
    const houseBodyMat = new THREE.MeshStandardMaterial({
      color: 0xF7F2EB,
      roughness: 0.5,
    });
    const houseBody = new THREE.Mesh(houseBodyGeo, houseBodyMat);
    houseBody.position.y = 1.0;
    houseBody.castShadow = true;
    houseBody.receiveShadow = true;
    worldGroup.add(houseBody);

    // Gable Roof
    const roofShape = new THREE.Shape();
    roofShape.moveTo(-1.45, 0);
    roofShape.lineTo(0, 1.1);
    roofShape.lineTo(1.45, 0);
    roofShape.closePath();

    const extrudeSettings = { depth: 2.5, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.08, bevelThickness: 0.08 };
    const roofGeo = new THREE.ExtrudeGeometry(roofShape, extrudeSettings);
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x2F3626,
      roughness: 0.4,
    });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 1.9, -1.25);
    roof.castShadow = true;
    worldGroup.add(roof);

    // Front Door (Warm Terracotta / Mahogany)
    const doorGeo = new THREE.BoxGeometry(0.65, 1.15, 0.06);
    const doorMat = new THREE.MeshStandardMaterial({
      color: 0xC4684A,
      roughness: 0.4,
    });
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, 0.65, 1.12);
    worldGroup.add(door);

    // Door handle (Brass)
    const handleGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0xF3CD6D,
      metalness: 0.8,
      roughness: 0.2,
    });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.set(0.22, 0.65, 1.16);
    worldGroup.add(handle);

    // Windows (Glowing warm light)
    const windowGeo = new THREE.BoxGeometry(0.5, 0.5, 0.04);
    const windowMat = new THREE.MeshStandardMaterial({
      color: 0xFFF1D0,
      emissive: 0xFFE082,
      emissiveIntensity: 0.6,
      roughness: 0.1,
    });
    
    // Left window
    const winLeft = new THREE.Mesh(windowGeo, windowMat);
    winLeft.position.set(-0.75, 1.1, 1.12);
    worldGroup.add(winLeft);

    // Right window
    const winRight = new THREE.Mesh(windowGeo, windowMat);
    winRight.position.set(0.75, 1.1, 1.12);
    worldGroup.add(winRight);

    // Side window
    const winSide = new THREE.Mesh(windowGeo, windowMat);
    winSide.rotation.y = Math.PI / 2;
    winSide.position.set(1.22, 1.1, 0.1);
    worldGroup.add(winSide);

    // Chimney
    const chimneyGeo = new THREE.BoxGeometry(0.35, 0.8, 0.35);
    const chimneyMat = new THREE.MeshStandardMaterial({ color: 0x8B9A6E, roughness: 0.6 });
    const chimney = new THREE.Mesh(chimneyGeo, chimneyMat);
    chimney.position.set(0.7, 2.5, -0.4);
    worldGroup.add(chimney);

    // 3D Floating Location Pins (Sage Green and Terracotta)
    const pinGroup1 = new THREE.Group();
    const pinConeGeo = new THREE.ConeGeometry(0.18, 0.4, 16);
    const pinSphereGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const pinMat1 = new THREE.MeshStandardMaterial({ color: 0x8B9A6E, metalness: 0.3, roughness: 0.3 });
    const pinCone1 = new THREE.Mesh(pinConeGeo, pinMat1);
    pinCone1.rotation.x = Math.PI;
    const pinHead1 = new THREE.Mesh(pinSphereGeo, pinMat1);
    pinHead1.position.y = 0.25;
    pinGroup1.add(pinCone1);
    pinGroup1.add(pinHead1);
    pinGroup1.position.set(-2.0, 2.3, 1.2);
    worldGroup.add(pinGroup1);

    // Terracotta Pin (Scam alert detector pin)
    const pinGroup2 = new THREE.Group();
    const pinMat2 = new THREE.MeshStandardMaterial({ color: 0xC4684A, metalness: 0.3, roughness: 0.3 });
    const pinCone2 = new THREE.Mesh(pinConeGeo, pinMat2);
    pinCone2.rotation.x = Math.PI;
    const pinHead2 = new THREE.Mesh(pinSphereGeo, pinMat2);
    pinHead2.position.y = 0.25;
    pinGroup2.add(pinCone2);
    pinGroup2.add(pinHead2);
    pinGroup2.position.set(2.1, 2.6, -0.8);
    worldGroup.add(pinGroup2);

    // 3D Floating Brass Key
    const keyGroup = new THREE.Group();
    const keyRingGeo = new THREE.TorusGeometry(0.15, 0.04, 12, 24);
    const keyShaftGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.5, 12);
    const keyBitGeo = new THREE.BoxGeometry(0.1, 0.08, 0.04);
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xF3CD6D, metalness: 0.8, roughness: 0.2 });
    
    const keyRing = new THREE.Mesh(keyRingGeo, brassMat);
    const keyShaft = new THREE.Mesh(keyShaftGeo, brassMat);
    keyShaft.position.y = -0.32;
    const keyBit1 = new THREE.Mesh(keyBitGeo, brassMat);
    keyBit1.position.set(0.06, -0.45, 0);
    const keyBit2 = new THREE.Mesh(keyBitGeo, brassMat);
    keyBit2.position.set(0.06, -0.52, 0);

    keyGroup.add(keyRing);
    keyGroup.add(keyShaft);
    keyGroup.add(keyBit1);
    keyGroup.add(keyBit2);
    keyGroup.position.set(1.7, 1.9, 1.5);
    keyGroup.rotation.z = 0.4;
    keyGroup.rotation.y = 0.6;
    worldGroup.add(keyGroup);

    // Small Compound Paved Steps
    const stepGeo = new THREE.BoxGeometry(0.9, 0.08, 0.5);
    const stepMat = new THREE.MeshStandardMaterial({ color: 0xD8CEBE, roughness: 0.7 });
    const step = new THREE.Mesh(stepGeo, stepMat);
    step.position.set(0, 0.04, 1.35);
    worldGroup.add(step);

    // Gentle mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0.4;
    let targetRotationX = 0.1;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = normX * 0.4;
      mouseY = normY * 0.2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!reducedMotion) {
        // Slow continuous rotation + mouse tilt
        targetRotationY = 0.3 + Math.sin(elapsed * 0.4) * 0.2 + mouseX;
        targetRotationX = 0.1 + mouseY;

        worldGroup.rotation.y += (targetRotationY - worldGroup.rotation.y) * 0.05;
        worldGroup.rotation.x += (targetRotationX - worldGroup.rotation.x) * 0.05;

        // Floating animations
        pinGroup1.position.y = 2.2 + Math.sin(elapsed * 2.2) * 0.12;
        pinGroup1.rotation.y = elapsed * 0.8;

        pinGroup2.position.y = 2.5 + Math.cos(elapsed * 2.0) * 0.15;
        pinGroup2.rotation.y = -elapsed * 0.7;

        keyGroup.position.y = 1.8 + Math.sin(elapsed * 1.8 + 1) * 0.14;
        keyGroup.rotation.y = elapsed * 1.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth || 380;
      const newHeight = containerRef.current.clientHeight || 340;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] flex items-center justify-center">
      {/* Subtle warm glow aura behind house */}
      <div className="absolute w-56 h-56 rounded-full bg-[#8B9A6E]/20 blur-3xl pointer-events-none" />
      <div className="absolute w-40 h-40 rounded-full bg-[#EAE2D6] blur-2xl pointer-events-none translate-y-8" />
      
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Floating 3D Badge Tooltips */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-sm border border-[#EAE2D6] flex items-center gap-2 pointer-events-none animate-float">
        <span className="w-2.5 h-2.5 rounded-full bg-[#8B9A6E] animate-pulse" />
        <span className="text-xs font-semibold text-[#2F3626]">Verified Photos Only</span>
      </div>

      <div className="absolute bottom-6 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-sm border border-[#EAE2D6] flex items-center gap-2 pointer-events-none animate-float-delayed">
        <span className="text-xs">🛡️</span>
        <span className="text-xs font-semibold text-[#2F3626]">Akwa Ibom Scam Watch</span>
      </div>
    </div>
  );
};
