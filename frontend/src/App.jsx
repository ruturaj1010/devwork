import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Introduction from "./components/Introduction";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import Project from "./components/Project";
import WorkExp from "./components/WorkExp";
import Contact from "./components/Contact";
import LocomotiveScroll from "locomotive-scroll";

function App() {
  document.title = "Ruturaj Nikam - Portfolio";

  useEffect(() => {
    const scroll = new LocomotiveScroll();
    return () => scroll.destroy();
  }, []);

  return (
    <div className="w-full h-full bg-zinc-800">
      <Navbar />
      <div className="w-full max-w-6xl h-full mx-auto flex flex-col justify-center items-center z-30 ">
        <Introduction />
        <Skills />
        <Project />
        <WorkExp />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
