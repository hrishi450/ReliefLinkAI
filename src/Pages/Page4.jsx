
import React, { useState } from "react";
import {
    Activity,
    AlertTriangle,
    ArrowRight,
    ArrowUpRight,
    Bell,
    Box,
    BriefcaseMedical,
    Building2,
    ChevronDown,
    Clock3,
    LifeBuoy,
    MapPin,
    Siren,
    Menu,
    Package,
    ShieldAlert,
    Users,
    X,
} from "lucide-react";

const navigation = [
    { name: "Overview", icon: Activity },
    { name: "Emergency requests", icon: ShieldAlert },
    { name: "Response teams", icon: Users },
    { name: "Resources", icon: Package },
    { name: "Hospitals", icon: Building2 },
];

const requests = [
    {
        id: 1,
        type: "Flood",
        location: "Nashik, Maharashtra",
        people: "42 people",
        time: "8 min ago",
        urgency: "Critical",
        icon: ShieldAlert,
        color: "red",
    },
    {
        id: 2,
        type: "Medical emergency",
        location: "Pune, Maharashtra",
        people: "3 people",
        time: "24 min ago",
        urgency: "High",
        icon: BriefcaseMedical,
        color: "orange",
    },
    {
        id: 3,
        type: "Water shortage",
        location: "Satara, Maharashtra",
        people: "86 people",
        time: "1 hr ago",
        urgency: "Medium",
        icon: AlertTriangle,
        color: "amber",
    },
];

const stats = [
    {
        title: "Active requests",
        value: "24",
        change: "↑ 12% from yesterday",
        icon: ShieldAlert,
    },
    {
        title: "Responders online",
        value: "186",
        change: "↑ 28 just joined",
        icon: Users,
    },
    {
        title: "People reached",
        value: "2,486",
        change: "Across 18 districts",
        icon: Activity,
    },
];

const capacity = [
    { name: "Medical", value: "86%", color: "bg-teal-600" },
    { name: "Rescue", value: "74%", color: "bg-blue-500" },
    { name: "Supplies", value: "63%", color: "bg-orange-400" },
];

function Page4() {
    const [activeTab, setActiveTab] = useState("Overview");
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <section className="w-full bg-white px-3  py-8 sm:px-2 md:px-8 lg:py-12">
            <div className="mx-auto max-w-[1450px]">

                {/* Section Heading */}
                <div className="mb-7 ml-2 lg:ml-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <span className="h-1 w-5 rounded-full bg-red-500" />
                            <p className="text-[10px] font-extrabold uppercase tracking-[2px] text-blue-700">
                                Live Network Snapshot
                            </p>
                        </div>

                        <h2 className="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                            See relief in motion.
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                        Live data · Sample network
                    </div>
                </div>

                {/* Dashboard Container */}
                <div className="overflow-hidden ml-2 lg:ml-11 rounded-xl border border-[#d5e3ed] bg-white shadow-sm">

                    {/* Mobile Header */}
                    <div className="flex items-center justify-between border-b border-slate-200 bg-[#f4f9fc] p-4 lg:hidden">
                        <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-[#082b4c] p-2 text-white">
                                <Siren size={17} />
                            </div>
                            <h3 className="text-sm font-bold text-slate-900">
                                ReliefLink<span className="text-red-500">AI</span>
                            </h3>
                        </div>

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700"
                            aria-label="Toggle navigation"
                        >
                            {menuOpen ? <X size={19} /> : <Menu size={19} />}
                        </button>
                    </div>

                    <div className="flex min-h-[430px] flex-col lg:flex-row">

                        {/* Sidebar */}
                        <aside
                            className={`${menuOpen ? "block" : "hidden"
                                } w-full shrink-0 border-b border-slate-200 bg-[#f4f9fc] p-4 lg:block lg:w-[152px] lg:border-b-0 lg:border-r`}
                        >
                            <div className="mb-8 hidden items-center gap-2 lg:flex">
                                <div className="rounded-lg bg-[#082b4c] p-2 text-white">
                                    <Siren size={16} />
                                </div>
                                <h3 className="text-[11px] font-extrabold text-slate-900">
                                    ReliefLink<span className="text-red-500">AI</span>
                                </h3>
                            </div>

                            <nav className="flex flex-col gap-2">
                                {navigation.map((item) => {
                                    const Icon = item.icon;
                                    const selected = activeTab === item.name;

                                    return (
                                        <button
                                            key={item.name}
                                            onClick={() => {
                                                setActiveTab(item.name);
                                                setMenuOpen(false);
                                            }}
                                            className={`flex items-center gap-2.5 rounded-md px-3 py-3 text-left text-[10px] font-medium transition ${selected
                                                ? "bg-[#e0eff8] font-bold text-[#07518b]"
                                                : "text-slate-500 hover:bg-white hover:text-slate-900"
                                                }`}
                                        >
                                            <Icon size={14} />
                                            <span>{item.name}</span>
                                        </button>
                                    );
                                })}
                            </nav>

                            <div className="mt-8 hidden rounded-md border border-[#d5e3ed] bg-white p-3 lg:block">
                                <LifeBuoy size={15} className="mb-3 text-blue-600" />
                                <p className="text-[10px] font-bold text-slate-800">
                                    Need support?
                                </p>
                                <p className="mt-2 text-[9px] leading-relaxed text-slate-400">
                                    Our coordination desk is online.
                                </p>
                            </div>
                        </aside>

                        {/* Main Dashboard */}
                        <main className="min-w-0 flex-1 bg-white p-4 sm:p-5 md:p-6">

                            {/* Top Header */}
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <p className="mb-2 text-[8px] font-extrabold uppercase tracking-[2px] text-blue-500">
                                        Control Center / {activeTab}
                                    </p>
                                    <h3 className="text-lg font-medium tracking-tight text-slate-900 sm:text-xl">
                                        Good morning, coordinator.
                                    </h3>
                                </div>

                                <button
                                    aria-label="Coordinator profile"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dcecf5] text-[10px] font-bold text-[#07518b]"
                                >
                                    HP
                                </button>
                            </div>

                            {/* Statistics */}
                            <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                {stats.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.title}
                                            className="rounded-md border border-[#d8e5ee] bg-white p-4 transition hover:-translate-y-1 hover:shadow-md"
                                        >
                                            <div className="mb-3 flex items-center justify-between">
                                                <p className="text-[10px] text-slate-500">
                                                    {item.title}
                                                </p>
                                                <Icon size={15} className="text-blue-500" />
                                            </div>

                                            <h4 className="text-2xl font-bold tracking-tight text-[#082b4c]">
                                                {item.value}
                                            </h4>

                                            <p className="mt-2 text-[9px] text-teal-600">
                                                {item.change}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Bottom Dashboard Grid */}
                            <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1.15fr_0.95fr]">

                                {/* Priority Requests */}
                                <div className="rounded-md border border-[#d8e5ee] bg-white p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <div>
                                            <h4 className="text-[12px] font-medium text-slate-900">
                                                Priority requests
                                            </h4>
                                            <p className="mt-1 text-[9px] text-slate-400">
                                                Require attention now
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => setActiveTab("Emergency requests")}
                                            className="flex items-center gap-1 text-[9px] font-medium text-blue-700 hover:text-blue-900"
                                        >
                                            View all <ArrowRight size={12} />
                                        </button>
                                    </div>

                                    <div className="divide-y divide-slate-100">
                                        {requests.map((request) => {
                                            const Icon = request.icon;

                                            const colors = {
                                                red: "bg-red-50 text-red-500",
                                                orange: "bg-orange-50 text-orange-500",
                                                amber: "bg-amber-50 text-amber-600",
                                            };

                                            const urgencyColors = {
                                                Critical: "bg-red-100 text-red-600",
                                                High: "bg-orange-100 text-orange-600",
                                                Medium: "bg-amber-100 text-amber-700",
                                            };

                                            return (
                                                <div
                                                    key={request.id}
                                                    className="flex items-center gap-3 py-4 first:pt-3 last:pb-1"
                                                >
                                                    <div
                                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${colors[request.color]
                                                            }`}
                                                    >
                                                        <Icon size={16} />
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <h5 className="text-[10px] font-bold text-slate-900">
                                                            {request.type}
                                                        </h5>

                                                        <div className="mt-2 flex flex-wrap items-center gap-1 text-[8px] text-slate-400">
                                                            <MapPin size={10} />
                                                            {request.location}
                                                            <span>·</span>
                                                            {request.people}
                                                        </div>
                                                    </div>

                                                    <div className="flex shrink-0 flex-col items-end gap-2">
                                                        <span
                                                            className={`rounded px-2 py-1 text-[8px] font-semibold ${urgencyColors[request.urgency]
                                                                }`}
                                                        >
                                                            {request.urgency}
                                                        </span>

                                                        <span className="text-[8px] text-slate-400">
                                                            {request.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Response Capacity */}
                                <div className="rounded-md border border-[#d8e5ee] bg-white p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-[12px] font-medium text-slate-900">
                                                Response capacity
                                            </h4>
                                            <p className="mt-1 text-[9px] text-slate-400">
                                                Across the network
                                            </p>
                                        </div>

                                        <ChevronDown size={13} className="text-slate-400" />
                                    </div>

                                    {/* Circular Chart */}
                                    <div className="flex justify-center py-6">
                                        <div
                                            className="relative flex h-28 w-28 items-center justify-center rounded-full"
                                            style={{
                                                background:
                                                    "conic-gradient(#138f83 0% 78%, #e3efee 78% 100%)",
                                            }}
                                        >
                                            <div className="flex h-[82px] w-[82px] flex-col items-center justify-center rounded-full bg-white">
                                                <span className="text-xl font-bold text-[#082b4c]">
                                                    78%
                                                </span>
                                                <span className="mt-1 text-[7px] text-slate-400">
                                                    Ready to respond
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Capacity Details */}
                                    <div className="space-y-3">
                                        {capacity.map((item) => (
                                            <div
                                                key={item.name}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`h-2 w-2 rounded-full ${item.color}`}
                                                    />
                                                    <span className="text-[9px] text-slate-500">
                                                        {item.name}
                                                    </span>
                                                </div>

                                                <span className="text-[9px] font-bold text-[#082b4c]">
                                                    {item.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
                                <p className="text-[9px] text-slate-400">
                                    ReliefLinkAI · Emergency coordination network
                                </p>
                                <span className="flex items-center gap-1 text-[9px] text-emerald-600">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Network operational
                                </span>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Page4;
