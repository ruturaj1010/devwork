import React from "react";
import LightRays from "../icons/LightRays";

const Introduction = () => {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <LightRays
        raysOrigin="top-center"
        raysColor="#8648f9"
        raysSpeed={1}
        lightSpread={0.5}
        rayLength={3}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0}
        distortion={0}
        className="custom-rays"
        pulsating={false}
        fadeDistance={1}
        saturation={1}
      />

      <div className="w-full h-full absolute top-0 left-0 ">
        <div className="sm:max-w-4xl h-full mx-auto text-center flex justify-center items-center z-30 ">
          <div className="w-3/5 h-full ">
            {/* <h1>Left</h1> */}
          </div>
          <div className="w-2/5 h-full ">
            {/* <h1>Right</h1> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
