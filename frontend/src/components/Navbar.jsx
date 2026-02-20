import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) < 10) return;

      if (currentScrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-center z-50 
      transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="sm:min-w-3xl min-w-sm h-[7vh] mx-4 my-3 text-lg font-medium flex justify-evenly items-center px-3 py-2 bg-white/70  shadow-[0_8px_30px_rgba(0,0,0,0.12)]  backdrop-blur-md rounded-lg list-none opacity-70">
        <li>Home</li>
        <li>Skills</li>
        <li>Projects</li>
        <li>Experience</li>
        <li>Contact</li>
        <li
          className="text-2xl font-bold -rotate-12"
          onClick={() => toggleTheme()}
        >
          {theme == "light" ? (
            <i className="fa-solid fa-moon"></i>
          ) : (
            <i className="fa-regular fa-moon"></i>
          )}
        </li>
      </div>
    </div>
  );
};

export default Navbar;
