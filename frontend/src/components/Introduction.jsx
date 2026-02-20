import React from "react";

const Introduction = () => {
  return (
    <div id="home" className="w-full min-h-screen">
      <div className="sm:max-w-4xl h-full mx-auto text-center flex justify-center items-center z-30 ">
        <div className="w-3/5 h-full ">{/* <h1>Left</h1> */}</div>
        <div className="w-2/5 h-full ">{/* <h1>Right</h1> */}</div>
      </div>
    </div>
  );
};

export default Introduction;
