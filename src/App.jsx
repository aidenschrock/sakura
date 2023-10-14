import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PresentationControls } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

import "./App.css";
import Flowers from "./Flower";
import Petals from "./Petal";

export default function App({ depth = 80 }) {
  // const color = useControls({ value: '#fa426b' })
  // const [speed, setSpeed] = useState(0.01);
  const speed = useRef(0.01);

  function getScrollPercent() {
    var h = document.documentElement,
      b = document.body,
      st = "scrollTop",
      sh = "scrollHeight";
    return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
  }

  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      let position = getScrollPercent();
      if (position < 30) {
        speed.current = 0.005;
      } else if (position > 30 && position < 90) {
        speed.current = 0.01;
      } else if (position > 90) {
        speed.current = 0.05;
      }
    });
  });

  return (
    <>
      <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 180, fov: 10 }}>
        {/* <color attach="background" args={["#fa426b"]} /> */}
        <ambientLight intensity={3} />
        <Suspense>
          <PresentationControls
            global={true}
            snap={true}
            azimuth={[-0.02, 0.02]}
            polar={[-0.05, -0.03]}
          >
            <Flowers speed={speed} />
            <Petals speed={speed} />
          </PresentationControls>
          <EffectComposer>
            <DepthOfField
              target={[0, 0, depth / 2]}
              focalLength={0.5}
              bokehScale={8}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </>
  );
}
