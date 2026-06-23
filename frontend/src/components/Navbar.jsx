import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const sections = ["home", "skills", "projects", "experience", "contact"];

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) > 10) {
        setShow(currentScrollY < lastScrollY || currentScrollY < 50);
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
    `cursor-pointer transition-all duration-200 capitalize font-medium ${
      active === id
        ? "text-violet-400 font-semibold"
        : "text-zinc-300 hover:text-violet-400"
    }`;

  return (
    <>
      <div
        className={`fixed left-0 w-full flex justify-center z-50 
        transition-transform duration-300 mt-2 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="w-full max-w-5xl mx-4 my-3 flex justify-between items-center px-6 py-3 bg-zinc-950/80 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md border border-white/5 rounded-xl">
          <div 
            onClick={() => scrollTo("home")} 
            className="text-lg font-bold text-zinc-100 hover:text-violet-400 cursor-pointer font-mono tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <span className="text-violet-400">&lt;</span>
            Ruturaj Nikam
            <span className="text-violet-400">/&gt;</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm">
            {sections.map((sec) => (
              <div
                key={sec}
                onClick={() => scrollTo(sec)}
                className={linkClass(sec)}
              >
                {sec}
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-zinc-100 hover:text-violet-400 focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-zinc-950/95 border-l border-white/10 z-50 p-6 flex flex-col gap-8 transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <span className="text-zinc-400 font-mono text-sm">Navigation</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-zinc-100 hover:text-violet-400 focus:outline-none transition-colors"
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-6 text-lg mt-4">
          {sections.map((sec) => (
            <div
              key={sec}
              onClick={() => scrollTo(sec)}
              className={`${linkClass(sec)} text-left border-b border-white/5 pb-2`}
            >
              {sec}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
