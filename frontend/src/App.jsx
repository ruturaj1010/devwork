import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Introduction from "./components/Introduction";
import Skills from "./components/Skills";
import GithubContributions from "./components/GithubContributions";
import Project from "./components/Project";
import WorkExp from "./components/WorkExp";
import Contact from "./components/Contact";
import LocomotiveScroll from "locomotive-scroll";

function App() {
  document.title = "Ruturaj Nikam | Full Stack Developer Portfolio";

  useEffect(() => {
    const scroll = new LocomotiveScroll();
    return () => scroll.destroy();
  }, []);

  return (
    <div className="w-full h-full bg-transparent overflow-x-hidden text-zinc-100">
      <Navbar />

      <div className="w-full max-w-6xl h-full mx-auto relative px-4">
        <div className="w-full h-full z-40 relative flex flex-col gap-10">
          <Introduction />
          <Skills />
          <GithubContributions />
          <Project />
          <WorkExp />
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default App;
