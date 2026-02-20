import React, { useEffect, useState } from "react";

const sections = ["home", "skills", "projects", "experience", "contact"];

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [active, setActive] = useState("home");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
    document.documentElement.classList.toggle("dark");
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // hide / show navbar
      if (Math.abs(currentScrollY - lastScrollY) > 10) {
        setShow(currentScrollY < lastScrollY);
        setLastScrollY(currentScrollY);
      }

      // active section detection
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const offsetTop = el.offsetTop - 140;
        const offsetBottom = offsetTop + el.offsetHeight;

        if (currentScrollY >= offsetTop && currentScrollY < offsetBottom) {
          setActive(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const linkClass = (id) =>
    `cursor-pointer transition ${
      active === id
        ? "text-purple-600 font-semibold"
        : "text-gray-700 hover:text-purple-500"
    }`;

  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-center z-50 
      transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="sm:min-w-3xl min-w-sm h-[7vh] mx-4 my-3 text-lg font-medium flex justify-evenly items-center px-4 py-2 bg-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md rounded-lg opacity-90">
        <div onClick={() => scrollTo("home")} className={linkClass("home")}>
          Home
        </div>

        <div onClick={() => scrollTo("skills")} className={linkClass("skills")}>
          Skills
        </div>

        <div
          onClick={() => scrollTo("projects")}
          className={linkClass("projects")}
        >
          Projects
        </div>

        <div
          onClick={() => scrollTo("experience")}
          className={linkClass("experience")}
        >
          Experience
        </div>

        <div
          onClick={() => scrollTo("contact")}
          className={linkClass("contact")}
        >
          Contact
        </div>

        <div
          className="text-2xl cursor-pointer -rotate-12"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <i className="fa-solid fa-moon"></i>
          ) : (
            <i className="fa-regular fa-moon"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
