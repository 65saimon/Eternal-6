"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface OrbitalHeroCanvasProps {
  className?: string;
  particleCount?: number;
  interactive?: boolean;
}

export default function OrbitalHeroCanvas({
  className = "w-full h-full",
  particleCount = 750,
  interactive = true,
}: OrbitalHeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.0018);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 95);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Main Group to allow smooth rotation tilt
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Pulsing Core
    const coreGroup = new THREE.Group();
    mainGroup.add(coreGroup);

    // Inner glowing sphere
    const coreGeo = new THREE.SphereGeometry(7, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Inner crystal structure
    const crystalGeo = new THREE.IcosahedronGeometry(4.8, 1);
    const crystalMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    coreGroup.add(crystalMesh);

    // Point lights for glow illumination
    const coreLightCyan = new THREE.PointLight(0x00f0ff, 3, 100);
    coreGroup.add(coreLightCyan);

    const coreLightPurple = new THREE.PointLight(0x8b5cf6, 2.5, 120);
    coreGroup.add(coreLightPurple);

    // 2. Orbital Rings (3 Multi-Axis Elliptical Orbits)
    const ringGroup = new THREE.Group();
    mainGroup.add(ringGroup);

    interface RingConfig {
      radius: number;
      tiltX: number;
      tiltY: number;
      tiltZ: number;
      color: number;
      speed: number;
      nodeCount: number;
    }

    const ringConfigs: RingConfig[] = [
      {
        radius: 24,
        tiltX: Math.PI / 3.2,
        tiltY: 0.2,
        tiltZ: -0.15,
        color: 0x00f0ff, // Neon Cyan
        speed: 0.008,
        nodeCount: 3,
      },
      {
        radius: 36,
        tiltX: -Math.PI / 4,
        tiltY: Math.PI / 6,
        tiltZ: 0.4,
        color: 0x8b5cf6, // Violet
        speed: -0.005,
        nodeCount: 4,
      },
      {
        radius: 48,
        tiltX: Math.PI / 6,
        tiltY: -Math.PI / 4,
        tiltZ: 0.8,
        color: 0x10b981, // Emerald
        speed: 0.0035,
        nodeCount: 5,
      },
    ];

    const rings: {
      mesh: THREE.Line;
      nodes: THREE.Mesh[];
      config: RingConfig;
      angle: number;
    }[] = [];

    ringConfigs.forEach((cfg) => {
      // Ring line path
      const points: THREE.Vector3[] = [];
      const segments = 128;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(theta) * cfg.radius,
            0,
            Math.sin(theta) * cfg.radius
          )
        );
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
      });
      const ringLine = new THREE.Line(ringGeo, ringMat);
      ringLine.rotation.set(cfg.tiltX, cfg.tiltY, cfg.tiltZ);
      ringGroup.add(ringLine);

      // Orbiting Nodes along the ring
      const nodes: THREE.Mesh[] = [];
      for (let n = 0; n < cfg.nodeCount; n++) {
        const nodeGeo = new THREE.SphereGeometry(1.2, 16, 16);
        const nodeMat = new THREE.MeshBasicMaterial({
          color: cfg.color,
          wireframe: false,
        });
        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        ringLine.add(nodeMesh);
        nodes.push(nodeMesh);
      }

      rings.push({
        mesh: ringLine,
        nodes,
        config: cfg,
        angle: 0,
      });
    });

    // 3. Ambient Particle Swarm
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const purpleColor = new THREE.Color(0x8b5cf6);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Spherical distribution around center
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 20 + Math.random() * 65;

      posArray[idx] = r * Math.sin(phi) * Math.cos(theta);
      posArray[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[idx + 2] = r * Math.cos(phi);

      // Color variation
      const choice = Math.random();
      let chosenColor = cyanColor;
      if (choice > 0.6) chosenColor = purpleColor;
      else if (choice > 0.4) chosenColor = whiteColor;

      colorArray[idx] = chosenColor.r;
      colorArray[idx + 1] = chosenColor.g;
      colorArray[idx + 2] = chosenColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 1.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleSystem);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotationY = mouseX * 0.4;
      targetRotationX = -mouseY * 0.3;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);
    setIsLoaded(true);

    // 60FPS Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for mouse parallax
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.04;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.04;

      // Pulse core
      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
      coreMesh.scale.set(pulse, pulse, pulse);
      crystalMesh.rotation.x = elapsedTime * 0.4;
      crystalMesh.rotation.y = elapsedTime * 0.6;

      // Animate rings and orbital nodes
      rings.forEach((ring) => {
        ring.angle += ring.config.speed;
        ring.nodes.forEach((node, idx) => {
          const offset = (idx / ring.nodes.length) * Math.PI * 2;
          const currentTheta = ring.angle + offset;
          node.position.x = Math.cos(currentTheta) * ring.config.radius;
          node.position.z = Math.sin(currentTheta) * ring.config.radius;

          // Subtle oscillation in node size
          const nodeScale = 0.8 + Math.sin(elapsedTime * 3 + idx) * 0.35;
          node.scale.set(nodeScale, nodeScale, nodeScale);
        });
      });

      // Slowly rotate particle field
      particleSystem.rotation.y = elapsedTime * 0.03;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      coreGeo.dispose();
      coreMat.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [particleCount, interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden pointer-events-none ${className}`}
      aria-label="Quantrix Intelligence Quantum Orbital Core Visualizer"
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin opacity-50" />
        </div>
      )}
    </div>
  );
}
