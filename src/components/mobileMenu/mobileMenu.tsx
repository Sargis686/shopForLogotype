import { useState, useEffect, useRef } from "react";
import {  X  } from "lucide-react";


const dropdownItems = [
  { title: "Demos", options: ["Demo 1", "Demo 2", "Demo 3"] },
  { title: "Post", options: ["Post Header", "Post Layout", "Share Buttons"] },
  { title: "Features", options: ["Gallery Post", "Video Post", "Typography"] },
  { title: "Categories", options: ["Technology", "Travel", "Health"] },
  { title: "Shop", options: ["Products", "Cart", "Checkout"] },
  { title: "Buy Now", options: [] }, 
];
const MobileMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
    {/* Desktop Menu */}
    <div className={`relative text-left hidden md:flex `} ref={menuRef}>
      {dropdownItems.map((item, index) => (
        <div key={index} className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
            className="px-2 py-2 flex items-center gap-2  rounded-lg  hover:bg-gray-700 transition-all duration-300"
          >
            {item.title}
            {item.options.length > 0 && <span className="material-symbols-outlined text-sm">expand_more</span>
            }
          </button>

          {openDropdown === index && item.options.length > 0 && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
              <ul className="py-2">
                {item.options.map((option, i) => (
                  <li
                    key={i}
                    tabIndex={0}
                    className="px-5 py-3 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>


    {isMobile && (
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900 rounded-md"
        onClick={() => setMenuOpen(true)}
      >
        <span className="material-symbols-outlined text-3xl">menu</span>
      </button>
    )}

    {isMenuOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setMenuOpen(false)}
      />
    )}

   
    <div
      ref={menuRef}
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">Меню</h2>
        <button onClick={() => setMenuOpen(false)}>
          <X size={24} />
        </button>
      </div>

      <ul className="p-4 space-y-4 text-lg">
        {dropdownItems.map((item, index) => (
          <li key={index} className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
              className="w-full text-left flex justify-between items-center px-4 py-2 rounded-md hover:bg-gray-200 transition"
            >
              {item.title}
              {item.options.length > 0 && <span className="material-symbols-outlined text-sm">expand_more</span>}
            </button>

            {openDropdown === index && item.options.length > 0 && (
              <ul className="ml-4 mt-2 space-y-2 bg-gray-100 p-2 rounded-md">
                {item.options.map((option, i) => (
                  <li key={i} className="px-3 py-2 hover:bg-gray-300 rounded cursor-pointer">
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  </>
  );
};

export default MobileMenu;
