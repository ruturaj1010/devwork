import React from "react";
import Navbar from "./components/Navbar";
import Introduction from "./components/Introduction";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import Project from "./components/Project";
import WorkExp from "./components/WorkExp";
import Contact from "./components/Contact";

function App() {

  document.title = "Ruturaj Nikam - Portfolio";
  return (
    <>
      <Navbar />
      <div className=" max-w-screen h-full">
        <div className="sm:min-w-6xl w-lg h-full mx-auto flex flex-col justify-center items-center z-30 ">
          <Introduction />
          <Skills />
          <Project />
          <WorkExp />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
