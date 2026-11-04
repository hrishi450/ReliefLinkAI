
import React from "react";
import {
    Siren,
    ArrowRight,
    PhoneCall,
    HeartHandshake,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    const handleReportEmergency = () => {
        navigate("/auth/citizen/login");
    };

    return (
        <footer className="w-full bg-[#0b2d4b] text-white">

            {/* TOP EMERGENCY CTA */}
            <div className="max-w-[1200px]  mx-auto px-3 sm:px-8 lg:px-10 pt-14 sm:pt-16 pb-16 sm:pb-20">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

                    <div>
                        <div className="flex items-center  gap-2 mb-4">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />

                            <span className="text-[10px] sm:text-[11px] font-extrabold tracking-[2px] uppercase text-blue-100">
                                Help is closer than you think
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] font-medium tracking-tight">
                            In an emergency,
                            <br />
                            <span className="text-[#ff946e]">
                                every second matters.
                            </span>
                        </h2>

                        <p className="text-xs sm:text-sm text-blue-100 mt-4 leading-relaxed">
                            Report a need. We’ll help connect you to the people who can respond.
                        </p>
                    </div>

                    <div>
                        <button
                            onClick={handleReportEmergency}
                            className="inline-flex items-center justify-center gap-4 bg-white text-[#0b2d4b] hover:bg-blue-50 px-6 py-4 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg"
                        >
                            <Siren size={17} />
                            Report an emergency
                            <ArrowRight size={17} />
                        </button>
                    </div>
                </div>


            </div>

            {/* FOOTER LINKS */}
            <div className=" border-t border-white/10 pt-12 max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 pb-10">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 lg:gap-12">

                    {/* BRAND */}
                    <div>
                        <Link to="/" className="inline-flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-[#123c60] border border-blue-300/10 flex items-center justify-center">
                                <Siren size={18} className="text-white" />
                            </div>

                            <span className="text-xl font-extrabold tracking-tight">
                                ReliefLink<span className="text-red-500">AI</span>
                            </span>
                        </Link>

                        <p className="text-[11px] leading-[1.8] text-blue-200 max-w-[210px]">
                            Connecting help. Coordinating relief.
                            Saving lives across Maharashtra.
                        </p>

                        <div className="flex items-center gap-2 mt-6">
                            <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-[3px] border-emerald-100/20" />
                            <span className="text-[10px] text-blue-200">
                                Network operational
                            </span>
                        </div>
                    </div>

                    {/* PLATFORM */}
                    <div>
                        <h3 className="text-xs font-bold mb-5">
                            Platform
                        </h3>

                        <ul className="space-y-4 text-[11px] text-blue-200">
                            <li>
                                <Link
                                    to="/auth/citizen/login"
                                    className="hover:text-white transition"
                                >
                                    For citizens
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/auth/ngo/login"
                                    className="hover:text-white transition"
                                >
                                    For organizations
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/auth/volunteer/login"
                                    className="hover:text-white transition"
                                >
                                    For volunteers
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-white transition"
                                >
                                    For hospitals
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* RESOURCES */}
                    <div>
                        <h3 className="text-xs font-bold mb-5">
                            Resources
                        </h3>

                        <ul className="space-y-4 text-[11px] text-blue-200">
                            <li>
                                <Link to="/how-it-works" className="hover:text-white transition">
                                    How it works
                                </Link>
                            </li>

                            <li>
                                <Link to="/impact" className="hover:text-white transition">
                                    Impact & transparency
                                </Link>
                            </li>

                            <li>
                                <Link to="/emergency-guide" className="hover:text-white transition">
                                    Emergency guide
                                </Link>
                            </li>

                            <li>
                                <Link to="/contact" className="hover:text-white transition">
                                    Contact us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* EMERGENCY CONTACT */}
                    <div>
                        <h3 className="text-xs font-bold mb-5">
                            Need immediate help?
                        </h3>

                        <a
                            href="tel:112"
                            className="flex items-center gap-2 mb-3 group"
                        >
                            <PhoneCall
                                size={15}
                                className="text-blue-200"
                            />

                            <span className="text-xl font-extrabold tracking-wide">
                                112
                            </span>

                            <span className="text-[9px] text-blue-200">
                                National emergency
                            </span>
                        </a>

                        <button
                            onClick={handleReportEmergency}
                            className="flex items-center justify-center gap-3 bg-[#123b60] hover:bg-[#194b76] px-5 py-3 rounded-lg text-xs font-bold transition w-full sm:w-auto"
                        >
                            Report emergency
                            <ArrowRight size={15} />
                        </button>

                        <p className="text-[9px] text-blue-300 mt-3 leading-relaxed">
                            For immediate danger, call 112. Do not wait for an online response.
                        </p>
                    </div>

                </div>

                {/* COPYRIGHT */}
                <div className="border-t border-white/10 mt-12 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[10px] text-blue-300 text-center sm:text-left">
                        © {new Date().getFullYear()} ReliefLinkAI. All rights reserved.
                    </p>

                    <div className="flex items-center gap-5 text-[10px] text-blue-300">
                        <Link to="/privacy" className="hover:text-white transition">
                            Privacy Policy
                        </Link>

                        <Link to="/terms" className="hover:text-white transition">
                            Terms of Service
                        </Link>
                    </div>
                </div>

            </div>

        </footer>
    );
};

export default Footer;
