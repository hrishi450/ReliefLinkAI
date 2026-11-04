
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Siren, Menu, X } from "lucide-react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const mobileMenuRef = useRef(null);
    const menuItemsRef = useRef([]);

    const navigate = useNavigate();


    const menuItems = [
        "Home",
        "How it Works",
        "For Citizen",
        "For Organization",
        "Impact",
    ];

    useEffect(() => {
        if (isMenuOpen) {
            gsap.fromTo(
                mobileMenuRef.current,
                {
                    height: 0,
                    opacity: 0,
                },
                {
                    height: "auto",
                    opacity: 1,
                    duration: 0.5,
                    ease: "power3.out",
                }
            );

            gsap.fromTo(
                menuItemsRef.current,
                {
                    y: 20,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.08,
                    delay: 0.15,
                    ease: "power2.out",
                }
            );
        } else {
            gsap.to(mobileMenuRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.35,
                ease: "power2.inOut",
            });
        }
    }, [isMenuOpen]);

    return (
        <div>
            {/* NAVBAR */}
            <div className="nav relative text-white sm:mx-5 my-5 md:mx-4 lg:mx-8 flex justify-between items-center rounded-lg">

                {/* LOGO */}
                <div className="w-full sm:w-auto flex items-center gap-2 px-4 sm:px-6 md:px-4 lg:px-0">
                    <div className="bg-gray-800 p-2 rounded-xl">
                        <Siren color="#ffffff" size={24} />
                    </div>

                    <h1 className="text-[#092B4C] font-popinEB text-lg sm:text-xl md:text-xl lg:text-2xl font-bold whitespace-nowrap">
                        ReliefLink
                        <span className="font-popinSB text-[#C93D3D]">AI</span>
                    </h1>
                </div>

                {/* DESKTOP NAV LINKS */}
                <div className="hidden sm:flex items-center justify-center gap-4 md:gap-6 lg:gap-8 xl:gap-10 px-4 py-3 lg:ml-10 xl:ml-20 rounded-lg">
                    {menuItems.map((item) => (
                        <h3
                            key={item}
                            className="font-popinSB text-sm md:text-base text-[#363f47ee] hover:text-[#092a4c] transition-colors cursor-pointer whitespace-nowrap"
                        >
                            {item}
                        </h3>
                    ))}
                </div>

                {/* DESKTOP BUTTONS */}
                <div className="hidden sm:flex items-center rounded-lg gap-3 lg:gap-5 pr-2 lg:pr-7">
                    <button onClick={() => navigate("/login")}

                        className="p-2 px-4 bg-blue-600 text-white rounded-xl">
                        Sign In
                    </button>

                    <button onClick={() => navigate("/login")}
                        className="bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center gap-2 active:scale-95 whitespace-nowrap">
                        Register Now
                        <ArrowRight color="#ffffff" />
                    </button>
                </div>

                {/* MOBILE NAV */}
                <nav className="sm:hidden z-101 relative">

                    {/* HAMBURGER BUTTON */}
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="p-2 text-[#092a4c] relative z-[60]"
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <X size={28} />
                        ) : (
                            <Menu size={28} />
                        )}
                    </button>

                    {/* MOBILE MENU */}
                    <div
                        ref={mobileMenuRef}
                        className={`absolute top-full right-0 mt-4 w-[100vw] max-w-[440px] bg-white shadow-xl rounded-xl z-50 overflow-hidden ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
                            }`}
                        style={{
                            height: 0,
                            opacity: 0,
                        }}
                    >
                        <div className="flex flex-col items-start gap-5 px-6 py-7">

                            {/* MOBILE LINKS */}
                            {menuItems.map((item, index) => (
                                <h3
                                    key={item}
                                    ref={(el) => (menuItemsRef.current[index] = el)}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="font-popinSB text-[#363f47ee] hover:text-[#092a4c] font-semibold cursor-pointer"
                                >
                                    {item}
                                </h3>
                            ))}

                            {/* DIVIDER */}
                            <div className="w-full h-px bg-gray-200 my-1" />

                            {/* MOBILE BUTTONS */}
                            <div className="flex flex-col w-full gap-3">

                                <button
                                    type="button"
                                    onClick={() => {
                                        navigate("/login");
                                        setIsMenuOpen(false);

                                    }}
                                    className="w-full active:scale-95 py-3 bg-blue-600 text-white rounded-xl font-semibold"
                                >
                                    Sign In
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        navigate("/login");

                                    }}
                                    className="w-full py-3 active:scale-95 bg-gray-800 text-white rounded-xl flex items-center justify-center gap-2 font-semibold"
                                >
                                    Register Now
                                    <ArrowRight size={20} />
                                </button>

                            </div>
                        </div>
                    </div>
                </nav>

            </div>
        </div>
    );
};

export default Navbar;
