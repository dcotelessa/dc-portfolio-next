import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { getHovered } from "../../store/store";

export const BlurEffect = () => {
  const bokehScaleFactor = 12;
  const depthOfFieldRef = useRef();
  const [targetBokehScale, setTargetBokehScale] = useState(0);
  const [currentBokehScale, setCurrentBokehScale] = useState(0);
  const [isHovered, setHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setTargetBokehScale(1);
    } else {
      setTargetBokehScale(0);
    }
  }, [isHovered]);

  useFrame(() => {
    const step = 0.1;
    if (currentBokehScale < targetBokehScale) {
      setCurrentBokehScale((prevScale) =>
        Math.min(Math.sin(prevScale + step), 1),
      );
    } else if (currentBokehScale > targetBokehScale) {
      setCurrentBokehScale((prevScale) =>
        Math.max(Math.sin(prevScale - step), 0),
      );
    }
    depthOfFieldRef.current.bokehScale = currentBokehScale * bokehScaleFactor;

    setHovered(getHovered());
  });

  return (
    <EffectComposer>
      <DepthOfField
        ref={depthOfFieldRef}
        focusDistance={4}
        focalLength={1}
        bokehScale={0}
      />
    </EffectComposer>
  );
};
