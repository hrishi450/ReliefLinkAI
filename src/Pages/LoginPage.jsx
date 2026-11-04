
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react'
import Citizen from "./Citizen";

import {
    Users,
    Building2,
    HandHeart,
    ArrowRight,
    ShieldCheck,
    HeartHandshake,
    Siren,
    ArrowLeft,
} from "lucide-react";

const roles = [
    {
        id: "citizen",
        title: "Citizen",
        headline: "Help Is Just One Step Away.",
        description:
            "Facing an emergency? Report your situation, request essential assistance and connect with nearby relief organizations.",
        button: "Continue as Citizen",
        secondary: "New Citizen? Create Account",
        icon: Users,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        accent: "group-hover:border-blue-300",
        buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
        id: "ngo",
        title: "NGO / Organization",
        headline: "Your NGO Can Make a Difference.",
        description:
            "Register your organization, manage emergency resources, coordinate volunteers and respond to people in need.",
        button: "Continue as NGO",
        secondary: "Register Your Organization",
        icon: Building2,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        accent: "group-hover:border-emerald-300",
        buttonColor: "bg-emerald-600 hover:bg-emerald-700",
    },
    {
        id: "volunteer",
        title: "Volunteer",
        headline: "Be Someone's Reason to Hope.",
        description:
            "Join the relief network, use your skills and contribute to emergency response operations.",
        button: "Continue as Volunteer",
        secondary: "Become a Volunteer",
        icon: HandHeart,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-600",
        accent: "group-hover:border-orange-300",
        buttonColor: "bg-orange-500 hover:bg-orange-600",
    },
];

const LoginPage = () => {
    const navigate = useNavigate();
    const pageRef = useRef(null);

    // GSAP animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
            });

            tl.from(".role-header", {
                y: 35,
                opacity: 0,
                duration: 0.8,
            })

                .from(
                    ".role-footer",
                    {
                        y: 15,
                        opacity: 0,
                        duration: 0.5,
                    },
                    "-=0.25"
                );

        },);
        return () => ctx.revert();
    }, [pageRef]);

    const handleLogin = (role) => {
        navigate(`/auth/${role}/login`);
    };

    const handleRegister = (role) => {
        navigate(`/auth/${role}/register`);
    };

    return (
        <main
            ref={pageRef}
            className="relative min-h-screen overflow-hidden bg-[#F5F8FC] px-4 py-8 sm:px-6 sm:py-12 lg:px-10"
        >
            <button
                onClick={() => navigate("/")}
                className="absolute z-100 left-5 top-7 sm:left-8 sm:top-8 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-1 lg:px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-blue-500 hover:text-blue-600"
            >
                <ArrowLeft size={18} />
                Back to Home
            </button>
            {/* Background decorations */}
            < div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl">

                {/* Header / Logo */}
                <header className="mb-12  flex items-start justify-end sm:mb-25">
                    <div className="flex gap-3 ">
                        <div className="w-full sm:w-auto flex items-center gap-2  sm:px-2 md:px-4 lg:px-0">
                            <div className="bg-gray-800 p-2 rounded-xl">
                                <Siren color="#ffffff" size={24} />
                            </div>

                            <h1 className="text-[#092B4C] font-popinEB text-lg sm:text-xl md:text-xl lg:text-2xl font-bold whitespace-nowrap" >
                                ReliefLink
                                <span className="font-popinSB text-[#C93D3D]">AI</span>
                            </h1>
                        </div>
                    </div>
                </header>

                {/* Heading */}
                <section className="role-header mx-auto mb-10 max-w-3xl text-center sm:mb-14">
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-semibold text-blue-700 shadow-sm sm:text-sm">
                        <ShieldCheck size={16} />
                        Secure Role-Based Access
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        Welcome to{" "}
                        <span className="text-[#092B4C]">ReliefLink
                            <span className="font-popinSB text-[#C93D3D]">AI</span>
                        </span>
                    </h1>

                    <p className="mt-2 text-base font-semibold text-slate-600 sm:text-md">
                        Connecting People. Empowering Responders. Saving Lives.
                    </p>

                    <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                        Choose your role to access the ReliefLinkAI emergency response
                        network.
                    </p>
                </section>

                {/* Role Cards */}
                <section className="grid grid-cols-1 ml-1 lg:ml-5 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-7">
                    {roles.map((role) => {
                        const Icon = role.icon;

                        return (
                            <article
                                key={role.id}
                                className={`role-card h-90 w-80 lg:w-90 z-100 group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8 ${role.accent}`}
                            >
                                {/* Card icon */}
                                <div
                                    className={`mb-2 flex h-14 p-5 w-14 items-center justify-center rounded-2xl ${role.iconBg} transition-transform duration-300 group-hover:scale-110`}
                                >
                                    <Icon
                                        size={32}
                                        strokeWidth={1.8}
                                        className={role.iconColor}
                                    />
                                </div>

                                {/* Role title */}
                                <div className="mb-1">
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                        Access Portal
                                    </span>

                                    <h2 className=" text-xl font-bold text-slate-900 sm:text-xl">
                                        {role.title}
                                    </h2>

                                    <h3 className=" mt-2 text-base font-semibold leading-6 text-slate-700">
                                        {role.headline}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="mb-4 flex-grow text-sm leading-6 text-slate-500">
                                    {role.description}
                                </p>

                                {/* Main button */}
                                <button
                                    onClick={() => handleLogin(role.id)}
                                    className={`flex w-full items-center justify-center gap-2 rounded-xl px-2 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 active:scale-[0.98] ${role.buttonColor}`}
                                >
                                    {role.button}
                                    <ArrowRight
                                        size={18}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                </button>

                                {/* Registration */}
                                <button
                                    onClick={() => handleRegister(role.id)}
                                    className="mt-2 text-center text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600"
                                >
                                    {role.secondary}
                                </button>
                            </article>
                        );
                    })}
                </section>

                {/* Footer */}
                <footer className="role-footer mt-12 text-center sm:mt-16">
                    <div className="mb-4 flex items-center justify-center gap-2 text-slate-500">
                        <HeartHandshake size={19} className="text-blue-600" />
                        <p className="text-sm font-medium">
                            Together, We Can Make a Difference.
                        </p>
                    </div>

                    <p className="text-xs text-slate-400">
                        © {new Date().getFullYear()} ReliefLinkAI. All rights reserved.
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                        Secure Emergency Management & Relief Coordination Platform
                    </p>
                </footer>

            </div>
        </main >
    );
};

export default LoginPage;
