import React, { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";

const sections = ["home", "projects", "skills", "experience", "contact"];

const Navbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  const lastScrollY = useRef(0);
  const isManualClick = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Helper to determine active section based on current viewport position
  const getActiveSection = () => {
    // If at the very top of the page
    if (window.scrollY < 80) return "home";

    // If at the very bottom of the page
    const scrollBottom = window.innerHeight + window.scrollY;
    if (scrollBottom >= document.documentElement.scrollHeight - 60) {
      return "contact";
    }

    // Check sections from bottom to top; active section is the lowest one whose top has reached the navbar threshold
    const navThreshold = 180;
    for (let i = sections.length - 1; i >= 0; i--) {
      const id = sections[i];
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= navThreshold) {
        return id;
      }
    }

    return "home";
  };

  const scrollTo = (id) => {
    isManualClick.current = true;
    setActive(id);
    setIsOpen(false);
    setIsNavbarVisible(true);

    if (window.locomotiveScroll) {
      window.locomotiveScroll.scrollTo(`#${id}`, {
        offset: -96,
        duration: 1.2,
      });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isManualClick.current = false;
      const current = getActiveSection();
      setActive(current);
    }, 1200);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // When user clicks a nav link, active state is locked until smooth scroll finishes
      if (!isManualClick.current) {
        const current = getActiveSection();
        setActive(current);
      }

      // Show/hide navbar based on scroll direction
      if (currentScrollY <= 50) {
        setIsNavbarVisible(true);
      } else {
        const diff = currentScrollY - lastScrollY.current;
        if (diff > 12 && currentScrollY > 120) {
          setIsNavbarVisible(false);
        } else if (diff < -8) {
          setIsNavbarVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const linkClass = (id) =>
    `cursor-pointer transition-all duration-200 capitalize font-medium ${
      active === id
        ? "text-violet-400 font-semibold"
        : "text-zinc-300 hover:text-violet-400"
    }`;

  const visibleState = isOpen || isNavbarVisible;

  return (
    <>
      <div
        className={`fixed left-0 w-full flex justify-center z-[60]
        transition-all duration-300 ease-out mt-2 ${
          visibleState
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
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
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-zinc-950/95 border-l border-white/10 z-[80] p-6 flex flex-col gap-8 transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <span className="text-zinc-400 font-mono text-sm">
            Navigation
          </span>

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
              className={`${linkClass(
                sec
              )} text-left border-b border-white/5 pb-2`}
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