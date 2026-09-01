import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Introduction from "./components/Introduction";
import Project from "./components/Project";
import Skills from "./components/Skills";
import GithubContributions from "./components/GithubContributions";
import LeetcodeContributions from "./components/LeetcodeContributions";
import WorkExp from "./components/WorkExp";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LocomotiveScroll from "locomotive-scroll";

function App() {
  useEffect(() => {
    document.title = "Ruturaj Nikam | Java Full Stack Developer Portfolio";
    const scroll = new LocomotiveScroll();
    return () => scroll.destroy();
  }, []);

  return (
    <div className="w-full h-full bg-transparent overflow-x-hidden text-zinc-100">
      <Navbar />

      <div className="w-full max-w-6xl h-full mx-auto relative px-4">
        <div className="w-full h-full z-40 relative flex flex-col gap-6 md:gap-8">
          <Introduction />
          
          <Project />

          <div className="w-full py-8 md:py-12 relative z-40">
            <div className="max-w-5xl mx-auto w-full flex flex-col gap-10 md:gap-12">
              <Skills />
              <GithubContributions />
              <LeetcodeContributions />
            </div>
          </div>

          <WorkExp />
          <Contact />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
