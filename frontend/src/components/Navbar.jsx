import React, { useEffect, useState } from "react";

const sections = ["home", "skills", "projects", "experience", "contact"];

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [active, setActive] = useState("home");

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) > 10) {
        setShow(currentScrollY < lastScrollY);
        setLastScrollY(currentScrollY);
      }

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
        ? "text-sky-600 font-semibold"
        : "text-gray-900 hover:text-sky-600"
    }`;

  return (
    <div
      className={`fixed left-0 w-full flex justify-center z-50 
      transition-transform duration-300 mt-2 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full max-w-3xl mx-4 my-3 text-xl font-medium flex justify-evenly items-center px-4 py-2 bg-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-md rounded-lg opacity-60">
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
      </div>
    </div>
  );
};

export default Navbar;
