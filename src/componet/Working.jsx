import Report from "./Report";
import {
    ArrowRight,
    Check,
    Sparkles,
    Users,
    Activity,
    CircleDot,
} from "lucide-react";
import { useState } from "react";

const steps = [
    {
        number: "01",
        title: "Report an emergency",
        description:
            "Share what happened, where you are and what kind of help is needed.",
        icon: Check,
    },
    {
        number: "02",
        title: "Smart matching begins",
        description:
            "ReliefLinkAI analyzes urgency, distance, skills and available resources.",
        icon: Sparkles,
    },
    {
        number: "03",
        title: "Responders mobilize",
        description:
            "Nearby NGOs, volunteers and hospitals receive a clear, actionable request.",
        icon: Users,
    },
    {
        number: "04",
        title: "Track until help arrives",
        description:
            "Everyone sees progress, updates and the moment relief is delivered.",
        icon: Activity,
    },
];


const Working = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <section className="w-full bg-[#F6FAFC] py-20  sm:py-24 lg:py-28 px-5 sm:px-12 lg:px-25">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                    {/* LEFT CONTENT */}

                    <div className="max-w-xl">

                        {/* Small heading */}

                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-7 h-[2px] bg-rose-500"></span>
                            <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-[#1261A0] uppercase">
                                How it works
                            </span>

                        </div>

                        {/* Main heading */}

                        <h2 className="text-5xl sm:text-7xl lg:text-[50px] leading-[1.12] tracking-tight font-medium text-slate-800">

                            From a request

                            <br />

                            to{" "}

                            <span className="text-[#C93D3D]">
                                real action.
                            </span>

                        </h2>

                        {/* Description */}

                        <p className="mt-7 max-w-lg text-sm sm:text-base leading-7 text-slate-500">

                            Our intelligent matching engine connects the right help to the
                            right place using location, urgency, skills and available
                            capacity.

                        </p>

                        {/* Button */}

                        <button
                            type='button'
                            onClick={() => setShowModal(true)}
                            className="inline-flex items-center gap-4 mt-9 px-5 py-4 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 group"
                        >
                            Try a demo request

                            <ArrowRight
                                size={18}
                                className="group-hover:translate-x-1 transition-transform duration-300"
                            />
                        </button>







                    </div>

                    {/* RIGHT TIMELINE */}

                    <div className="relative">

                        {/* Vertical timeline line */}

                        <div className="absolute left-[11px] sm:left-[13px] top-4 bottom-5 w-px bg-slate-200"></div>

                        <div className="space-y-10 sm:space-y-12">

                            {steps.map((step, index) => {

                                const Icon = step.icon;

                                return (

                                    <div
                                        key={step.number}
                                        className="relative grid grid-cols-[28px_45px_1fr_24px] sm:grid-cols-[30px_55px_1fr_30px] gap-3 sm:gap-4 items-start group"
                                    >

                                        {/* Timeline dot */}

                                        <div className="relative z-10 flex justify-center pt-1">

                                            <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-blue-400 transition-colors">

                                                <CircleDot
                                                    size={13}
                                                    className="text-blue-500"
                                                />

                                            </div>

                                        </div>

                                        {/* Number */}

                                        <div className="pt-1">

                                            <span className="text-sm sm:text-base font-bold text-blue-800">
                                                {step.number}
                                            </span>

                                        </div>

                                        {/* Text content */}

                                        <div className="pb-1">

                                            <h3 className="text-base sm:text-lg font-medium text-slate-700 group-hover:text-blue-800 transition-colors">

                                                {step.title}

                                            </h3>

                                            <p className="mt-2 text-xs sm:text-sm leading-6 text-slate-500 max-w-md">

                                                {step.description}

                                            </p>

                                        </div>

                                        {/* Right icon */}

                                        <div className="pt-1 flex justify-end">

                                            <Icon
                                                size={19}
                                                strokeWidth={1.7}
                                                className="text-slate-400 group-hover:text-blue-600 transition-colors"
                                            />

                                        </div>

                                    </div>

                                );

                            })}

                        </div>

                    </div>

                </div>
                {showModal && (
                    <Report onClose={() => setShowModal(false)} />
                )}
            </div>

        </section>
    );
};

export default Working;