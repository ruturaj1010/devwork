import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Introduction from "./components/Introduction";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import Project from "./components/Project";
import WorkExp from "./components/WorkExp";
import Contact from "./components/Contact";
import LocomotiveScroll from "locomotive-scroll";
import LightRays from "./partials/LightRays";
import Particles from "./partials/Particles";

function App() {
  document.title = "Ruturaj Nikam - Portfolio";

  useEffect(() => {
    const scroll = new LocomotiveScroll();
    return () => scroll.destroy();
  }, []);

  return (
    <div className="w-full h-full bg-zinc-800">
      <Navbar />

      <div className="w-full max-w-6xl h-full mx-auto">
        <div className="w-full h-full absolute top-0 left-0">
          <LightRays
            raysOrigin="left"
            raysColor="#a3daf5"
            raysSpeed={2}
            lightSpread={1.4}
            rayLength={2}
            followMouse={true}
            mouseInfluence={0.7}
            noiseAmount={0}
            distortion={0.4}
            className="custom-rays"
            pulsating
            fadeDistance={1}
            saturation={1.2}
          />
        </div>

        <div className="w-full h-full relative mx-auto flex flex-col justify-center items-center z-30 ">
          <div className="w-full h-full absolute left-0 top-0">
            <Particles
              particleColors={["#aca8e6"]}
              particleCount={1000}
              particleSpread={10}
              speed={0.2}
              particleBaseSize={100}
              moveParticlesOnHover
              alphaParticles={false}
              disableRotation={false}
              pixelRatio={1}
            />
          </div>
          
          <div className="w-full h-full z-40">
            <Introduction />
            <Skills />
            <Project />
            <WorkExp />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
