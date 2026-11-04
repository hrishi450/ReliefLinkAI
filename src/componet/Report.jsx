import { useState } from "react";
import { useEffect } from "react";
import {
    Siren,
    X,
    Droplets,
    HeartPulse,
    Building2,
    Plus,
    MapPin,
    ChevronDown,
    ArrowRight,
} from "lucide-react";

const emergencyTypes = [
    { name: "Flood", icon: Droplets },
    { name: "Medical", icon: HeartPulse },
    { name: "Collapse", icon: Building2 },
    { name: "Other", icon: Plus },
];

export default function Report({ onClose }) {
    const [selectedType, setSelectedType] = useState("Flood");
    const [location, setLocation] = useState("");
    const [support, setSupport] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const num = Math.floor(Math.random() * 10000);
    const [Num, setNum] = useState(num)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!location.trim() || !support || !selectedType) {
            alert("Please fill in all required fields.");
            return;
        }
        setSubmitted(true);
    };


    useEffect(() => {
        // Save current body overflow value 
        const previousOverflow = document.body.style.overflow;

        // Disable background scrolling
        document.body.style.overflow = "hidden";

        // Restore scrolling when modal closes
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);


    return (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-3 sm:p-5 md:p-8">

            <div
                className="relative flex  w-full max-w-[500px]
                   flex-col overflow-hidden rounded-2xl
                   bg-[#fbfbfb] shadow-2xl lg:h-[92vh] sm:h-[20vh] md:h-[20vh]"
            >
                {/* Scrollable Content */}
                <div className="overflow-y-auto overscroll-contain p-5 sm:p-8 md:p-10">

                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="absolute right-4 top-4 z-10 flex h-9 w-9
                       items-center justify-center rounded-full
                       bg-slate-100 text-slate-500 transition
                       hover:bg-slate-200 sm:right-6 sm:top-6"
                    >
                        <X size={21} />
                    </button>

                    {/* Icon */}
                    <div className="mb-2 flex h-14 w-14 items-center justify-center
                          rounded-2xl bg-rose-100 text-rose-800">
                        <Siren size={28} />
                    </div>

                    {/* Heading */}
                    <h1
                        id="emergency-title"
                        className="pr-8 text-2xl font-semibold tracking-tight
                       text-slate-900 sm:text-3xl md:text-4xl font-popin-B"
                    >
                        Report an emergency
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500
                        sm:text-base sm:leading-7">
                        Tell us what’s happening. Nearby responders will be matched
                        immediately.
                    </p>

                    {submitted ? (
                        <div className="mt-8 rounded-xl border border-green-200
                        bg-green-50 p-5 text-green-800">
                            <h2 className="font-semibold text-lg">
                                Request submitted successfully!
                            </h2>

                            <p className="mt-2 text-sm">
                                Your emergency request has been recorded.
                            </p>
                            <h2 className="font-semibold text-lg ">
                                Report No.{Num}
                            </h2>

                            <button
                                type="button"
                                onClick={onClose}
                                className="mt-4 rounded-lg bg-green-700 px-5 py-2
                                text-sm font-semibold text-white hover:bg-green-800"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="mt-2 sm:mt-9">

                            {/* Emergency Types */}
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-3">
                                {emergencyTypes.map(({ name, icon: Icon }) => {
                                    const active = selectedType === name;

                                    return (
                                        <button
                                            key={name}
                                            type="button"
                                            onClick={() => setSelectedType(name)}
                                            aria-pressed={active}
                                            className={`flex min - h-[70px] flex-col items-center
                                                        justify-center gap-3 rounded-xl border p-3
                                  transition sm: min - h - [112px]
                        ${active
                                                    ? "border-rose-300 bg-rose-50 text-rose-800 ring-1 ring-rose-200"
                                                    : "border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:bg-blue-50"
                                                } `}
                                        >
                                            <Icon size={25} strokeWidth={1.8} />
                                            <span className="text-sm font-medium">{name}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Location */}
                            <div className="mt-7 sm:mt-8">
                                <label
                                    htmlFor="location"
                                    className="mb-3 block text-sm font-bold text-[#244566]
                             sm:text-base"
                                >
                                    Where do you need help?
                                </label>

                                <div className="flex items-center gap-3 rounded-xl border
                                border-slate-200 bg-white px-4
                                focus-within:border-blue-500
                                focus-within:ring-2 focus-within:ring-blue-100">
                                    <MapPin size={21} className="shrink-0 text-cyan-700" />

                                    <input
                                        id="location"
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="Enter landmark or location"
                                        required
                                        className="min-w-0 flex-1 bg-transparent py-4
                               text-sm text-slate-800 outline-none
                               placeholder:text-slate-400 sm:text-base"
                                    />
                                </div>
                            </div>

                            {/* Support Needed */}
                            <div className="mt-6 sm:mt-7">
                                <label
                                    htmlFor="support"
                                    className="mb-3 block text-sm font-bold text-[#244566]
                             sm:text-base"
                                >
                                    What kind of help is needed?
                                </label>

                                <div className="relative">
                                    <select
                                        id="support"
                                        value={support}
                                        onChange={(e) => setSupport(e.target.value)}
                                        required
                                        className="w-full appearance-none rounded-xl border
                               border-slate-200 bg-white px-4 py-4 pr-11
                               text-sm text-slate-700 outline-none
                               focus:border-blue-500 focus:ring-2
                               focus:ring-blue-100 sm:text-base"
                                    >
                                        <option value="">Select support needed</option>
                                        <option value="Food">Food and water</option>
                                        <option value="Medical">Medical assistance</option>
                                        <option value="Rescue">Rescue and evacuation</option>
                                        <option value="Clothes">Clothes and essentials</option>
                                        <option value="Shelter">Temporary shelter</option>
                                    </select>

                                    <ChevronDown
                                        size={20}
                                        className="pointer-events-none absolute right-4 top-1/2
                               -translate-y-1/2 text-slate-600"
                                    />
                                </div>
                                <label
                                    htmlFor="detail"
                                    className="mb-2 mt-5 block text-sm font-bold text-[#244566]
                             sm:text-base font-popinB"
                                >
                                    Explain In details.
                                </label>
                                <div className="flex items-center gap-3 rounded-xl border
                                border-slate-200 bg-white px-4
                                focus-within:border-blue-500
                                focus-within:ring-2 focus-within:ring-blue-100">

                                    <textarea
                                        id="detail"
                                        type="text"
                                        placeholder="Share what happened in detail, where you are and what kind of help is needed."
                                        className="min-w-0 flex-1 bg-transparent py-4
                               text-sm text-slate-800 outline-none
                               placeholder:text-slate-400 sm:text-base font-popinB"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="mt-7 flex w-full items-center justify-center
                           gap-3 rounded-xl bg-[#1760a5] px-3 py-3
                           text-sm font-semibold font-popinSB text-white transition
                           hover:bg-[#124e88] active:scale-[0.99]
                           sm:mt-9 sm:text-base"
                            >
                                Submit emergency request
                                <ArrowRight size={21} />
                            </button>

                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
