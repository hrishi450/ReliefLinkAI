
import React, { useState } from "react";
import {
    Sparkles,
    MapPin,
    Clock3,
    HeartPulse,
    Package,
    HeartHandshake,
    Hospital,
    Users,
    ChevronRight,
    Check,
    ArrowRight,
} from "lucide-react";

const responders = [
    {
        name: "Helping Hands Foundation",
        distance: "2.4 km",
        service: "Medical + food support",
        capacity: "12 volunteers",
        icon: HeartHandshake,
        color: "blue",
    },
    {
        name: "Sahyadri Emergency Center",
        distance: "3.2 km",
        service: "Emergency medical support",
        capacity: "14 beds available",
        icon: Hospital,
        color: "green",
    },
    {
        name: "Nashik Rapid Response",
        distance: "1.8 km",
        service: "Rescue support",
        capacity: "6 volunteers",
        icon: Users,
        color: "orange",
    },
];

const criteria = [
    { label: "Distance", icon: MapPin },
    { label: "Availability", icon: Clock3 },
    { label: "Skills", icon: HeartPulse },
    { label: "Capacity", icon: Package },
];

const colorStyles = {
    blue: {
        icon: "bg-blue-50 text-blue-600",
    },
    green: {
        icon: "bg-teal-50 text-teal-600",
    },
    orange: {
        icon: "bg-orange-50 text-orange-500",
    },
};

export default function Page5() {
    const [selectedCriteria, setSelectedCriteria] = useState([
        "Distance",
        "Availability",
        "Skills",
        "Capacity",
    ]);

    const toggleCriteria = (label) => {
        setSelectedCriteria((previous) =>
            previous.includes(label)
                ? previous.filter((item) => item !== label)
                : [...previous, label]
        );
    };

    return (
        <section className="w-full bg-[#f5f9fc] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center">

                {/* LEFT CONTENT */}
                <div className="w-full">

                    {/* TOP LABEL */}
                    <div className="flex items-center gap-2 mb-5">
                        <span className="w-4 h-[2px] bg-red-500" />
                        <span className="text-[20px] sm:text-[11px] font-bold tracking-[2px] text-[#07518b] uppercase">
                            Intelligent Matching
                        </span>
                    </div>

                    {/* HEADING */}
                    <h2 className="text-[30px] sm:text-[44px] lg:text-[32px] xl:text-[54px] leading-[1.05] font-medium tracking-[-2px] text-[#082d50]">
                        Help that finds
                        <br />
                        <span className="text-[#e33b3b]">you first.</span>
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-sm sm:text-[15px] leading-7 text-slate-500 mt-5 max-w-[460px]">
                        Every recommendation is built around the realities on the ground
                        — not just a pin on a map.
                    </p>

                    {/* MATCHING CRITERIA */}
                    <div className="flex flex-wrap gap-2 mt-7">
                        {criteria.map((item) => {
                            const Icon = item.icon;
                            const active = selectedCriteria.includes(item.label);

                            return (
                                <button
                                    key={item.label}
                                    onClick={() => toggleCriteria(item.label)}
                                    aria-pressed={active}
                                    className={`flex items-center gap-2 px-3 py-2.5 border rounded-md text-[11px] sm:text-xs transition-all duration-200 ${active
                                        ? "bg-white border-[#c9ddeb] text-[#07518b]"
                                        : "bg-slate-100 border-slate-200 text-slate-400"
                                        } hover:border-[#07518b] hover:shadow-sm`}
                                >
                                    <Icon size={14} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* LEARN MORE */}
                    <a
                        href="#matching-engine"
                        className="inline-flex items-center gap-2 mt-8 text-xs sm:text-sm font-bold text-[#082d50] hover:text-blue-700 transition group"
                    >
                        Learn about our matching engine
                        <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    </a>

                </div>

                {/* RIGHT RESPONDER CARD */}
                <div className="w-full" id="matching-engine">

                    <div className="bg-white border border-[#d5e3ed] rounded-xl overflow-hidden shadow-[0_12px_35px_rgba(15,55,85,0.05)]">

                        {/* CARD HEADER */}
                        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-[#e8eef3]">

                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 shrink-0 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Sparkles size={17} />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-xs sm:text-sm font-bold text-[#082d50]">
                                        Recommended responders
                                    </h3>
                                    <p className="text-[9px] sm:text-[10px] text-slate-400 mt-1">
                                        For request RL-1024 · Nashik
                                    </p>
                                </div>
                            </div>

                            <span className="shrink-0 text-[9px] font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded">
                                MATCHED
                            </span>
                        </div>

                        {/* RESPONDER LIST */}
                        <div>
                            {responders.map((responder, index) => {
                                const Icon = responder.icon;
                                const styles = colorStyles[responder.color];

                                return (
                                    <div
                                        key={responder.name}
                                        className="flex items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-[#e8eef3] hover:bg-[#f8fbfd] transition cursor-pointer"
                                    >

                                        {/* NGO DETAILS */}
                                        <div className="flex items-center gap-3 min-w-0">

                                            <div className={`w-9 h-9 shrink-0 rounded-md flex items-center justify-center ${styles.icon}`}>
                                                <Icon size={17} />
                                            </div>

                                            <div className="min-w-0">
                                                <h4 className="text-[11px] sm:text-xs font-bold text-[#082d50] truncate">
                                                    {responder.name}
                                                </h4>

                                                <p className="text-[9px] sm:text-[10px] text-slate-400 mt-1.5">
                                                    {responder.distance} · {responder.service}
                                                </p>
                                            </div>
                                        </div>

                                        {/* CAPACITY */}
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className="hidden sm:block text-[9px] font-semibold text-[#082d50] text-right">
                                                {responder.capacity}
                                            </span>

                                            <ChevronRight
                                                size={15}
                                                className="text-slate-400"
                                            />
                                        </div>

                                    </div>
                                );
                            })}
                        </div>

                        {/* CARD FOOTER */}
                        <div className="px-4 sm:px-5 py-4 flex items-start gap-2 bg-[#fbfdfe]">
                            <Check size={13} className="text-teal-600 shrink-0 mt-0.5" />

                            <p className="text-[9px] sm:text-[10px] leading-relaxed text-slate-400">
                                Recommendations ranked by proximity, availability and response capability.
                            </p>
                        </div>

                    </div>

                    {/* BOTTOM NOTE */}
                    <p className="text-center text-[10px] text-slate-400 mt-4">
                        AI-powered recommendations · Faster emergency coordination
                    </p>

                </div>

            </div>
        </section>
    );
}
