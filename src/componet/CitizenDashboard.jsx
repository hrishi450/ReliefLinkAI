
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    MapContainer,
    TileLayer,
    CircleMarker,
    useMapEvents,
} from "react-leaflet";
import {
    LayoutDashboard,
    Siren,
    FilePlus2,
    ClipboardList,
    CheckCircle2,
    Bell,
    UserRound,
    CircleHelp,
    LogOut,
    Menu,
    X,
    MapPin,
    Users,
    Activity,
    Clock,
    AlertTriangle,
    ArrowRight,
    ArrowLeft,
    Upload,
    Image as ImageIcon,
    Trash2,
    LocateFixed,
    HeartHandshake,
    Sparkles,
    Star,
    ShieldCheck,
    Navigation,
    Check,
    Phone,
    Droplets,
    Utensils,
    House,
    Truck,
    Pill,
    Baby,
    Shirt,
    Search,
    Eye,
} from "lucide-react";

// --------------------------------------------------
// DEMO DATA
// Replace this with API data when backend is ready.
// --------------------------------------------------

const initialRequests = [
    {
        id: "RL-2026-10245",
        disaster: "Flood",
        location: "Panchavati, Nashik",
        people: 24,
        help: ["Food", "Drinking Water", "Medical Assistance"],
        urgency: "Critical",
        date: "03 Nov 2026",
        status: "In Progress",
        ngo: "Helping Hands Foundation",
        volunteers: ["Rahul Patil", "Amit Sharma"],
        images: [],
        stages: [
            { label: "Request Submitted", time: "03 Nov 2026, 09:15 AM", done: true },
            { label: "AI Matching", time: "03 Nov 2026, 09:16 AM", done: true },
            { label: "NGO Recommended", time: "03 Nov 2026, 09:18 AM", done: true },
            { label: "NGO Accepted", time: "03 Nov 2026, 09:25 AM", done: true },
            { label: "Volunteer Assigned", time: "03 Nov 2026, 09:40 AM", done: true },
            { label: "Response In Progress", time: "03 Nov 2026, 10:00 AM", done: true },
            { label: "Help Delivered", time: "Awaiting update", done: false },
            { label: "Completed", time: "Awaiting update", done: false },
        ],
    },
    {
        id: "RL-2026-10231",
        disaster: "Medical Emergency",
        location: "College Road, Nashik",
        people: 3,
        help: ["Medical Assistance", "Medicines"],
        urgency: "High",
        date: "02 Nov 2026",
        status: "AI Matching",
        ngo: "Not assigned",
        volunteers: [],
        images: [],
        stages: [
            { label: "Request Submitted", time: "02 Nov 2026, 04:20 PM", done: true },
            { label: "AI Matching", time: "02 Nov 2026, 04:21 PM", done: true },
            { label: "NGO Recommended", time: "Pending", done: false },
            { label: "NGO Accepted", time: "Pending", done: false },
            { label: "Volunteer Assigned", time: "Pending", done: false },
            { label: "Response In Progress", time: "Pending", done: false },
            { label: "Help Delivered", time: "Pending", done: false },
            { label: "Completed", time: "Pending", done: false },
        ],
    },
];

const disasterOptions = [
    "Building Collapse", "Flood", "Landslide", "Earthquake", "Fire",
    "Road Accident", "Cyclone", "Industrial Accident", "Medical Emergency",
    "Missing Person", "Other",
];

const helpOptions = [
    { name: "Medical Assistance", icon: HeartHandshake },
    { name: "Food", icon: Utensils },
    { name: "Drinking Water", icon: Droplets },
    { name: "Clothes", icon: Shirt },
    { name: "Rescue", icon: ShieldCheck },
    { name: "Shelter", icon: House },
    { name: "Transportation", icon: Truck },
    { name: "Medicines", icon: Pill },
    { name: "Blood", icon: Activity },
    { name: "Baby Supplies", icon: Baby },
    { name: "Sanitary Products", icon: HeartHandshake },
    { name: "Other", icon: ClipboardList },
];

const priorities = [
    {
        name: "Critical",
        description: "Immediate threat to life. Urgent response required.",
        color: "border-red-300 bg-red-50 text-red-700",
    },
    {
        name: "High",
        description: "Serious emergency requiring rapid assistance.",
        color: "border-orange-300 bg-orange-50 text-orange-700",
    },
    {
        name: "Medium",
        description: "Assistance needed soon, but no immediate threat.",
        color: "border-yellow-300 bg-yellow-50 text-yellow-700",
    },
    {
        name: "Low",
        description: "Non-urgent support or information request.",
        color: "border-green-300 bg-green-50 text-green-700",
    },
];

const ngoRecommendations = [
    {
        name: "Helping Hands Foundation",
        distance: "2.4 km away",
        services: "Medical + Food + Water",
        volunteers: 12,
        score: 94,
    },
    {
        name: "Jeevan Seva Foundation",
        distance: "4.1 km away",
        services: "Food + Shelter",
        volunteers: 8,
        score: 89,
    },
];

// --------------------------------------------------
// REUSABLE COMPONENTS
// --------------------------------------------------

const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

const Field = ({ label, name, value, onChange, type = "text", required = false, placeholder }) => (
    <div>
        <label className={labelClass}>{label}{required && <span className="text-red-500"> *</span>}</label>
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            className={inputClass}
        />
    </div>
);

const StatusBadge = ({ status }) => {
    const styles = {
        Submitted: "bg-slate-100 text-slate-700",
        "AI Matching": "bg-gray-100 text-blue-700",
        Accepted: "bg-purple-100 text-purple-700",
        "In Progress": "bg-orange-100 text-orange-700",
        Completed: "bg-green-100 text-green-700",
    };

    return (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || "bg-slate-100 text-slate-700"}`}>
            {status}
        </span>
    );
};

// --------------------------------------------------
// MAP CLICK HANDLER
// --------------------------------------------------

const MapClickHandler = ({ onSelect }) => {
    useMapEvents({
        click(event) {
            onSelect({
                lat: event.latlng.lat,
                lng: event.latlng.lng,
            });
        },
    });

    return null;
};

// --------------------------------------------------
// EMERGENCY MAP
// --------------------------------------------------

const EmergencyMap = ({ location, setLocation }) => {
    const defaultPosition = [20.0059, 73.7897];

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="bg-gray-50 px-4 py-3 text-sm text-blue-800">
                Click anywhere on the map to select the emergency location.
            </div>

            <MapContainer
                center={location ? [location.lat, location.lng] : defaultPosition}
                zoom={12}
                scrollWheelZoom={true}
                className="h-64 w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapClickHandler onSelect={setLocation} />

                {location && (
                    <CircleMarker
                        center={[location.lat, location.lng]}
                        radius={10}
                        pathOptions={{ color: "#2563eb", fillColor: "#3b82f6", fillOpacity: 0.8 }}
                    />
                )}
            </MapContainer>

            {location && (
                <div className="bg-green-50 px-4 py-3 text-xs text-green-800">
                    Selected: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                </div>
            )}
        </div>
    );
};

// --------------------------------------------------
// DASHBOARD SIDEBAR
// --------------------------------------------------

const navigationItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "report", label: "Report Emergency", icon: FilePlus2 },
    { id: "requests", label: "My Requests", icon: ClipboardList },
    { id: "active", label: "Active Requests", icon: Activity },
    { id: "completed", label: "Completed Requests", icon: CheckCircle2 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "profile", label: "My Profile", icon: UserRound },
    { id: "support", label: "Help & Support", icon: CircleHelp },
];

const CitizenSidebar = ({ activePage, setActivePage, onLogout }) => (
    <aside className="hidden   bg-[#101E36] lg:flex fixed inset-y-0 left-0 z-30 w-64 flex-col border-r border-slate-200 ">
        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-white">
                <Siren size={23} />
            </div>
            <div>
                <h1 className="text-[#f1f4f8] font-popinEB text-lg sm:text-xl md:text-xl lg:text-2xl font-bold whitespace-nowrap">
                    ReliefLink
                    <span className="font-popinSB text-[#C93D3D]">AI</span>
                </h1>
                <p className="text-xs text-slate-500">Citizen Portal</p>
            </div>
        </div>

        <nav className="flex-1 space-y-1 [&::-webkit-scrollbar]:hidden overflow-auto overflow-y-auto p-4">
            {navigationItems.map((item) => {
                const Icon = item.icon;

                return (
                    <button
                        key={item.id}
                        onClick={() => setActivePage(item.id)}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${activePage === item.id
                            ? "bg-gray-50 text-blue-700"
                            : "text-gray-100 hover:bg-gray-500"
                            }`}
                    >
                        <Icon size={19} />
                        {item.label}
                    </button>
                );
            })}

            <button
                onClick={() => alert("Install App: connect your PWA installation flow here.")}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
                <Upload size={19} />
                Install App
            </button>
        </nav>

        <div className="border-t border-slate-100 p-4">
            <button
                onClick={onLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
                <LogOut size={19} />
                Logout
            </button>
        </div>
    </aside>
);

// --------------------------------------------------
// MOBILE BOTTOM NAVIGATION
// --------------------------------------------------

const CitizenBottomNav = ({ activePage, setActivePage }) => {
    const items = [
        { id: "overview", label: "Home", icon: LayoutDashboard },
        { id: "requests", label: "Requests", icon: ClipboardList },
        { id: "report", label: "Report", icon: FilePlus2 },
        { id: "notifications", label: "Alerts", icon: Bell },
        { id: "profile", label: "Profile", icon: UserRound },
    ];

    return (
        <nav className="fixed bg-[#101E36] inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-slate-200  px-1 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-5px_20px_rgba(15,23,42,0.06)] lg:hidden">
            {items.map((item) => {
                const Icon = item.icon;
                const active = activePage === item.id;

                return (
                    <button
                        key={item.id}
                        onClick={() => setActivePage(item.id)}
                        className={`flex flex-col items-center gap-1 py-1 text-[10px] font-semibold ${active ? "text-blue-700" : "text-slate-400"
                            }`}
                    >
                        <Icon size={20} />
                        {item.label}
                    </button>
                );
            })}
            <button
                onClick={() => setActivePage("report")}
                className="lg:hidden fixed bottom-20 right-2 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-100 hover:bg-gray-900"
            >
                <FilePlus2 size={18} />
                Report Emergency
            </button>
        </nav>
    );
};

// --------------------------------------------------
// STATISTIC CARD
// --------------------------------------------------

const StatCard = ({ title, value, icon: Icon, color }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let current = 0;
        const increment = Math.max(1, Math.ceil(value / 25));

        const timer = setInterval(() => {
            current = Math.min(value, current + increment);
            setCount(current);

            if (current >= value) clearInterval(timer);
        }, 35);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <div className="rounded-2xl  border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{title}</p>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                    <Icon size={20} />
                </div>
            </div>
            <h3 className="mt-4 text-3xl font-bold text-slate-900">{count}</h3>
        </div>
    );
};

// --------------------------------------------------
// REQUEST CARD
// --------------------------------------------------

const RequestCard = ({ request, onView, onTrack }) => (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-md">
        <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
                <p className="text-xs font-semibold text-blue-700">{request.id}</p>
                <h3 className="mt-1 text-lg font-bold text-slate-900">{request.disaster}</h3>
            </div>
            <StatusBadge status={request.status} />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <p className="flex items-center gap-2"><MapPin size={16} />{request.location}</p>
            <p className="flex items-center gap-2"><Users size={16} />{request.people} people affected</p>
            <p className="flex items-center gap-2"><Clock size={16} />{request.date}</p>
            <p className="flex items-center gap-2"><HeartHandshake size={16} />{request.ngo}</p>
        </div>

        <div className="mt-4">
            <p className="text-xs font-semibold text-slate-500">HELP REQUIRED</p>
            <div className="mt-2 flex flex-wrap gap-2">
                {request.help.map((item) => (
                    <span key={item} className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                        {item}
                    </span>
                ))}
            </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <span className={`text-xs font-bold ${request.urgency === "Critical" ? "text-red-600" :
                request.urgency === "High" ? "text-orange-600" :
                    request.urgency === "Medium" ? "text-yellow-600" : "text-green-600"
                }`}>
                {request.urgency} Priority
            </span>

            <div className="flex gap-2">
                <button onClick={() => onView(request)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                    View Details
                </button>
                <button onClick={() => onTrack(request)} className="rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-900">
                    Track Request
                </button>
            </div>
        </div>
    </div>
);

// --------------------------------------------------
// CITIZEN OVERVIEW
// --------------------------------------------------

const CitizenOverview = ({ requests, setActivePage, setSelectedRequest }) => {
    const activeRequests = requests.filter((r) => r.status !== "Completed");
    const completedRequests = requests.filter((r) => r.status === "Completed");
    const peopleAffected = requests.reduce((sum, r) => sum + Number(r.people || 0), 0);

    const openTracking = (request) => {
        setSelectedRequest(request);
        setActivePage("tracking");
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                    <p className="text-sm font-semibold text-blue-700">CITIZEN DASHBOARD</p>
                    <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                        Welcome Back! {localStorage.getItem("citizenName") || "Citizen"}
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                        We're here to help you during emergencies. Track your requests and stay connected with nearby relief support.
                    </p>
                </div>

                <button
                    onClick={() => setActivePage("report")}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-100 hover:bg-gray-900"
                >
                    <FilePlus2 size={18} />
                    Report Emergency
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard title="Total Requests" value={requests.length} icon={ClipboardList} color="bg-gray-50 text-blue-700" />
                <StatCard title="Active Requests" value={activeRequests.length} icon={Activity} color="bg-orange-50 text-orange-600" />
                <StatCard title="Completed Requests" value={completedRequests.length} icon={CheckCircle2} color="bg-green-50 text-green-600" />
                <StatCard title="People Affected" value={peopleAffected} icon={Users} color="bg-purple-50 text-purple-700" />
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Recent Requests</h2>
                    <p className="mt-1 text-sm text-slate-500">Monitor your latest emergency reports.</p>
                </div>
                <button onClick={() => setActivePage("requests")} className="text-sm font-semibold text-blue-700 hover:underline">
                    View all
                </button>
                <button
                    onClick={() => setActivePage("report")}
                    className="lg:hidden fixed bottom-20 right-2 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-100 hover:bg-gray-900"
                >
                    <FilePlus2 size={18} />
                    Report Emergency
                </button>
            </div>
            {requests.length ? (
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                    {requests.slice(0, 4).map((request) => (
                        <RequestCard
                            key={request.id}
                            request={request}
                            onView={(item) => {
                                setSelectedRequest(item);
                                setActivePage("tracking");
                            }}
                            onTrack={openTracking}
                        />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                    <ClipboardList className="mx-auto text-slate-300" size={38} />
                    <h3 className="mt-3 font-bold text-slate-800">No requests yet</h3>
                    <p className="mt-1 text-sm text-slate-500">Your emergency reports will appear here.</p>
                </div>
            )}
        </div>
    );
};

// --------------------------------------------------
// EMERGENCY REPORT FORM
// --------------------------------------------------

const reportSteps = [
    "Disaster Type",
    "Help Required",
    "Affected People",
    "Location",
    "Urgency",
    "Photos",
    "Additional Info",
    "Review",
];

const EmergencyReport = ({ onSubmit, onCancel }) => {
    const [step, setStep] = useState(0);
    const [error, setError] = useState("");
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [location, setLocation] = useState(null);

    const [form, setForm] = useState({
        disaster: "",
        otherDisaster: "",
        help: [],
        totalPeople: "",
        children: "",
        adults: "",
        elderly: "",
        injured: "",
        critical: "",
        state: "",
        district: "",
        city: "",
        address: "",
        landmark: "",
        pincode: "",
        urgency: "",
        additionalInfo: "",
    });

    const updateField = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const toggleHelp = (name) => {
        setForm((prev) => ({
            ...prev,
            help: prev.help.includes(name)
                ? prev.help.filter((item) => item !== name)
                : [...prev.help, name],
        }));
        setError("");
    };

    // Use browser location permission. It is not guaranteed to be available.
    const useCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError("Location is not supported by this browser. Select a point on the map.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setError("");
            },
            () => setError("Unable to get location. Please allow location access or select it on the map."),
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    // Validate selected image files and show local previews.
    const addFiles = (selectedFiles) => {
        const allowed = ["image/jpeg", "image/png", "image/webp"];
        const incoming = Array.from(selectedFiles);

        for (const file of incoming) {
            if (!allowed.includes(file.type)) {
                setError("Only JPG, JPEG, PNG and WEBP images are allowed.");
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setError(`${file.name} is larger than 5 MB.`);
                return;
            }
        }

        const remaining = 8 - files.length;
        const accepted = incoming.slice(0, remaining).map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setFiles((prev) => [...prev, ...accepted]);
        setError("");
        setUploadProgress(0);
    };

    const removeFile = (index) => {
        setFiles((prev) => {
            URL.revokeObjectURL(prev[index].preview);
            return prev.filter((_, i) => i !== index);
        });
    };

    useEffect(() => {
        return () => files.forEach((item) => URL.revokeObjectURL(item.preview));
    }, [files]);

    const validateStep = () => {
        if (step === 0 && !form.disaster) {
            setError("Please select a disaster type.");
            return false;
        }

        if (step === 0 && form.disaster === "Other" && !form.otherDisaster.trim()) {
            setError("Please specify the disaster type.");
            return false;
        }

        if (step === 1 && form.help.length === 0) {
            setError("Select at least one type of help required.");
            return false;
        }

        if (step === 2) {
            if (!form.totalPeople || Number(form.totalPeople) < 1) {
                setError("Enter the total number of affected people.");
                return false;
            }

            const groups = ["children", "adults", "elderly"];
            const groupTotal = groups.reduce((sum, key) => sum + Number(form[key] || 0), 0);

            if (groupTotal > Number(form.totalPeople)) {
                setError("Children, adults and elderly total cannot exceed total people.");
                return false;
            }
        }

        if (step === 3) {
            const required = ["state", "district", "city", "address", "pincode"];
            if (required.some((key) => !form[key].trim())) {
                setError("Please complete all required location fields.");
                return false;
            }

            if (!/^[0-9]{6}$/.test(form.pincode)) {
                setError("Enter a valid 6-digit pincode.");
                return false;
            }
        }

        if (step === 4 && !form.urgency) {
            setError("Please select the emergency urgency.");
            return false;
        }

        setError("");
        return true;
    };

    const next = () => {
        if (!validateStep()) return;
        setStep((prev) => Math.min(prev + 1, reportSteps.length - 1));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const previous = () => {
        setError("");
        setStep((prev) => Math.max(prev - 1, 0));
    };

    const submit = () => {
        const request = {
            ...form,
            disaster: form.disaster === "Other" ? form.otherDisaster : form.disaster,
            people: Number(form.totalPeople),
            help: form.help,
            urgency: form.urgency,
            location: `${form.city}, ${form.district}`,
            id: `RL-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
            date: new Date().toLocaleString("en-IN"),
            status: "Submitted",
            ngo: "Not assigned",
            volunteers: [],
            images: files.map((item) => item.preview),
            coordinates: location,
            stages: [
                { label: "Request Submitted", time: new Date().toLocaleString("en-IN"), done: true },
                { label: "AI Matching", time: "Waiting", done: false },
                { label: "NGO Recommended", time: "Waiting", done: false },
                { label: "NGO Accepted", time: "Waiting", done: false },
                { label: "Volunteer Assigned", time: "Waiting", done: false },
                { label: "Response In Progress", time: "Waiting", done: false },
                { label: "Help Delivered", time: "Waiting", done: false },
                { label: "Completed", time: "Waiting", done: false },
            ],
        };

        // Demo only: files and request are not uploaded to a server.
        onSubmit(request);
    };

    const progress = ((step + 1) / reportSteps.length) * 100;

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold text-blue-700">EMERGENCY RESPONSE</p>
                    <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">Report an Emergency</h1>
                    <p className="mt-2 text-sm text-slate-500">Provide the details needed to coordinate assistance.</p>
                </div>
                <button onClick={onCancel} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-white">
                    Cancel
                </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5 sm:p-7">
                    <div className="mb-3 flex justify-between text-sm font-semibold">
                        <span className="text-slate-700">Step {step + 1} of 8 · {reportSteps[step]}</span>
                        <span className="text-blue-700">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-gray-900 transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="mt-4 grid grid-cols-8 gap-1">
                        {reportSteps.map((item, index) => (
                            <div key={item} className={`h-1.5 rounded-full ${index <= step ? "bg-gray-900" : "bg-slate-100"}`} />
                        ))}
                    </div>
                </div>

                <div className="p-5 sm:p-8">
                    {/* STEP 1 */}
                    {step === 0 && (
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Select Disaster Type</h2>
                            <p className="mb-5 mt-1 text-sm text-slate-500">What has happened?</p>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {disasterOptions.map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => setForm((prev) => ({ ...prev, disaster: item }))}
                                        className={`rounded-xl border p-4 text-left text-sm font-semibold transition ${form.disaster === item ? "border-blue-500 bg-gray-50 text-blue-800 ring-2 ring-blue-100" : "border-slate-200 text-slate-700 hover:border-blue-300"
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            {form.disaster === "Other" && (
                                <div className="mt-5">
                                    <Field label="Specify Disaster" name="otherDisaster" value={form.otherDisaster} onChange={updateField} required />
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 1 && (
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Help Required</h2>
                            <p className="mb-5 mt-1 text-sm text-slate-500">Select all types of assistance needed.</p>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {helpOptions.map(({ name, icon: Icon }) => (
                                    <button
                                        key={name}
                                        type="button"
                                        onClick={() => toggleHelp(name)}
                                        className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${form.help.includes(name) ? "border-blue-500 bg-gray-50 text-blue-800" : "border-slate-200 text-slate-700 hover:border-blue-300"
                                            }`}
                                    >
                                        <Icon size={20} />
                                        <span className="text-sm font-semibold">{name}</span>
                                        {form.help.includes(name) && <Check size={17} className="ml-auto" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 3 */}
                    {step === 2 && (
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Affected People</h2>
                            <p className="mb-5 mt-1 text-sm text-slate-500">Enter the estimated number of people affected.</p>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                <Field label="Total People" name="totalPeople" type="number" value={form.totalPeople} onChange={updateField} required />
                                <Field label="Children" name="children" type="number" value={form.children} onChange={updateField} />
                                <Field label="Adults" name="adults" type="number" value={form.adults} onChange={updateField} />
                                <Field label="Elderly" name="elderly" type="number" value={form.elderly} onChange={updateField} />
                                <Field label="Injured" name="injured" type="number" value={form.injured} onChange={updateField} />
                                <Field label="Critical Patients" name="critical" type="number" value={form.critical} onChange={updateField} />
                            </div>
                        </div>
                    )}

                    {/* STEP 4 */}
                    {step === 3 && (
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Emergency Location</h2>
                            <p className="mb-5 mt-1 text-sm text-slate-500">Share the exact location where assistance is required.</p>

                            <button type="button" onClick={useCurrentLocation} className="mb-5 inline-flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-gray-100">
                                <LocateFixed size={18} />
                                Use Current Location
                            </button>

                            <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <Field label="State" name="state" value={form.state} onChange={updateField} required />
                                <Field label="District" name="district" value={form.district} onChange={updateField} required />
                                <Field label="City / Village" name="city" value={form.city} onChange={updateField} required />
                                <Field label="Pincode" name="pincode" value={form.pincode} onChange={updateField} required />
                                <Field label="Landmark" name="landmark" value={form.landmark} onChange={updateField} />
                                <div className="sm:col-span-2">
                                    <Field label="Full Address" name="address" value={form.address} onChange={updateField} required />
                                </div>
                            </div>

                            <EmergencyMap location={location} setLocation={setLocation} />
                        </div>
                    )}

                    {/* STEP 5 */}
                    {step === 4 && (
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Emergency Urgency</h2>
                            <p className="mb-5 mt-1 text-sm text-slate-500">Choose the priority that best describes the situation.</p>

                            <div className="space-y-3">
                                {priorities.map((priority) => (
                                    <button
                                        key={priority.name}
                                        type="button"
                                        onClick={() => setForm((prev) => ({ ...prev, urgency: priority.name }))}
                                        className={`w-full rounded-xl border p-4 text-left transition ${form.urgency === priority.name ? `${priority.color} ring-2 ring-offset-1` : "border-slate-200 hover:border-slate-300"
                                            }`}
                                    >
                                        <span className="font-bold">{priority.name}</span>
                                        <p className="mt-1 text-sm opacity-80">{priority.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 6 */}
                    {step === 5 && (
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Upload Emergency Photos</h2>
                            <p className="mb-5 mt-1 text-sm leading-6 text-slate-500">
                                Photos can help emergency responders understand the situation and prepare appropriate assistance.
                            </p>

                            <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
                                Do not delay emergency reporting to take photos. Photos are optional during life-threatening emergencies.
                            </div>

                            <label
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    addFiles(e.dataTransfer.files);
                                }}
                                className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-blue-400 hover:bg-gray-50"
                            >
                                <Upload size={30} className="text-blue-700" />
                                <p className="mt-3 font-bold text-slate-800">Drag and drop images here</p>
                                <p className="mt-1 text-sm text-slate-500">or browse your device / camera gallery</p>
                                <p className="mt-2 text-xs text-slate-400">JPG, JPEG, PNG, WEBP · Up to 5 MB each · Maximum 8 images</p>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    multiple
                                    capture="environment"
                                    onChange={(e) => addFiles(e.target.files)}
                                    className="hidden"
                                />
                            </label>

                            {files.length > 0 && (
                                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                    {files.map((item, index) => (
                                        <div key={`${item.file.name}-${index}`} className="relative overflow-hidden rounded-xl border border-slate-200">
                                            <img src={item.preview} alt={item.file.name} className="h-28 w-full object-cover" />
                                            <p className="truncate px-2 py-2 text-xs text-slate-600">{item.file.name}</p>
                                            <button type="button" onClick={() => removeFile(index)} className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-red-600 shadow" aria-label="Remove image">
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 7 */}
                    {step === 6 && (
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Additional Information</h2>
                            <p className="mb-5 mt-1 text-sm text-slate-500">Share anything else that could help responders.</p>
                            <label className={labelClass}>Describe the emergency</label>
                            <textarea
                                name="additionalInfo"
                                value={form.additionalInfo}
                                onChange={updateField}
                                rows={8}
                                placeholder="Describe what happened, immediate dangers, access routes, special requirements or any other important information..."
                                className={`${inputClass} resize-y`}
                            />
                        </div>
                    )}

                    {/* STEP 8 */}
                    {step === 7 && (
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Review Your Emergency Request</h2>
                            <p className="mb-5 mt-1 text-sm text-slate-500">Check the information before submitting.</p>

                            <div className="space-y-4">
                                {[
                                    ["Disaster", form.disaster === "Other" ? form.otherDisaster : form.disaster],
                                    ["Help Required", form.help.join(", ")],
                                    ["Total People", form.totalPeople],
                                    ["Children / Adults / Elderly", `${form.children || 0} / ${form.adults || 0} / ${form.elderly || 0}`],
                                    ["Injured / Critical", `${form.injured || 0} / ${form.critical || 0}`],
                                    ["Location", `${form.address}, ${form.city}, ${form.district}, ${form.state} - ${form.pincode}`],
                                    ["Landmark", form.landmark || "Not provided"],
                                    ["Urgency", form.urgency],
                                    ["Photos", `${files.length} image(s)`],
                                    ["Additional Information", form.additionalInfo || "Not provided"],
                                    ["Map Coordinates", location ? `${location.lat}, ${location.lng}` : "Not selected"],
                                ].map(([label, value]) => (
                                    <div key={label} className="grid grid-cols-1 gap-1 border-b border-slate-100 pb-3 sm:grid-cols-[180px_1fr]">
                                        <span className="text-sm font-semibold text-slate-500">{label}</span>
                                        <span className="break-words text-sm text-slate-800">{value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm leading-6 text-blue-800">
                                By submitting, you confirm that the information is accurate to the best of your knowledge.
                            </div>
                        </div>
                    )}

                    {error && (
                        <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                            {error}
                        </p>
                    )}

                    <div className="mt-8 flex flex-col-reverse justify-between gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                        <button
                            type="button"
                            onClick={previous}
                            disabled={step === 0}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ArrowLeft size={17} /> Previous
                        </button>

                        {step < 7 ? (
                            <button type="button" onClick={next} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-900">
                                Continue <ArrowRight size={17} />
                            </button>
                        ) : (
                            <button type="button" onClick={submit} className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white hover:bg-red-700">
                                <AlertTriangle size={18} /> Submit Emergency Request
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --------------------------------------------------
// AI MATCHING PAGE
// --------------------------------------------------

const AIMatching = ({ request, onBack, onTrack }) => {
    const [stage, setStage] = useState(0);
    const stages = [
        "Analyzing Emergency",
        "Checking Location",
        "Finding Nearby NGOs",
        "Checking Available Resources",
        "Checking Volunteer Availability",
        "Finding Suitable Responders",
    ];

    useEffect(() => {
        setStage(0);
        const interval = setInterval(() => {
            setStage((prev) => Math.min(prev + 1, stages.length));
        }, 800);

        return () => clearInterval(interval);
    }, [request?.id]);

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-700">
                <ArrowLeft size={17} /> Back to dashboard
            </button>

            <div className="rounded-2xl bg-gradient-to-br from-blue-950 to-blue-700 p-6 text-white sm:p-9">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/10 p-3"><Sparkles size={27} /></div>
                    <div>
                        <p className="text-sm text-blue-100">RELIEFLINKAI</p>
                        <h1 className="text-2xl font-bold sm:text-3xl">Intelligent Matching</h1>
                    </div>
                </div>
                <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100">
                    Finding organizations and responders that may be suitable for your emergency request.
                </p>
                <div className="mt-6 rounded-xl bg-white/10 p-4">
                    <p className="text-sm font-semibold">Request: {request?.id}</p>
                    <p className="mt-1 text-xs text-blue-100">{request?.disaster} · {request?.location}</p>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
                <h2 className="font-bold text-slate-900">Matching Progress</h2>
                <div className="mt-5 space-y-4">
                    {stages.map((item, index) => (
                        <div key={item} className="flex items-center gap-3">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${index < stage ? "bg-green-100 text-green-700" :
                                index === stage && stage < stages.length ? "bg-gray-100 text-blue-700" :
                                    "bg-slate-100 text-slate-400"
                                }`}>
                                {index < stage ? <Check size={17} /> : index === stage && stage < stages.length ? <Sparkles size={17} /> : index + 1}
                            </div>
                            <span className={`text-sm ${index <= stage ? "font-semibold text-slate-800" : "text-slate-400"}`}>{item}</span>
                            {index === stage && stage < stages.length && <span className="ml-auto text-xs text-blue-700">Processing...</span>}
                        </div>
                    ))}
                </div>
            </div>

            {stage >= stages.length && (
                <div>
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-slate-900">Recommended Organizations</h2>
                        <p className="mt-1 text-sm text-slate-500">Suggestions based on the demo matching data.</p>
                    </div>

                    <div className="space-y-4">
                        {ngoRecommendations.map((ngo) => (
                            <div key={ngo.name} className="rounded-2xl border border-slate-200 bg-white p-5">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <h3 className="font-bold text-slate-900">{ngo.name}</h3>
                                        <p className="mt-1 text-sm text-slate-500">{ngo.distance}</p>
                                    </div>
                                    <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-bold text-green-700">{ngo.score}% Match</span>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
                                    <span>{ngo.services}</span>
                                    <span>{ngo.volunteers} available volunteers (demo)</span>
                                </div>
                                <div className="mt-4 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                                    Recommendation only. This organization has not been assigned to your request. Assignment is confirmed only after NGO acceptance.
                                </div>
                                <button onClick={() => alert("Connect NGO profile details API here.")} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline">
                                    View Organization <ArrowRight size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button onClick={onTrack} className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-900">
                Track This Request
            </button>
        </div>
    );
};

// --------------------------------------------------
// REQUEST TRACKING PAGE
// --------------------------------------------------

const RequestTracking = ({ request, onBack }) => {
    if (!request) {
        return <div className="rounded-2xl bg-white p-8 text-slate-500">Select a request to view its tracking details.</div>;
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-700">
                <ArrowLeft size={17} /> Back
            </button>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <p className="text-xs font-bold text-blue-700">{request.id}</p>
                        <h1 className="mt-2 text-2xl font-bold text-slate-900">{request.disaster}</h1>
                        <p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><MapPin size={16} />{request.location}</p>
                    </div>
                    <StatusBadge status={request.status} />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">
                    <div><p className="text-xs text-slate-500">People Affected</p><p className="mt-1 font-bold">{request.people}</p></div>
                    <div><p className="text-xs text-slate-500">Urgency</p><p className="mt-1 font-bold">{request.urgency}</p></div>
                    <div><p className="text-xs text-slate-500">Request Date</p><p className="mt-1 font-bold">{request.date}</p></div>
                </div>

                <div className="mt-5">
                    <p className="text-xs font-semibold text-slate-500">HELP REQUIRED</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {request.help.map((item) => <span key={item} className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-blue-700">{item}</span>)}
                    </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-5">
                    <h2 className="font-bold text-slate-900">Response Team</h2>
                    <p className="mt-3 text-sm text-slate-600">Assigned NGO: <strong>{request.ngo}</strong></p>
                    <p className="mt-2 text-sm text-slate-600">Volunteers: <strong>{request.volunteers?.length ? request.volunteers.join(", ") : "Not assigned yet"}</strong></p>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
                <h2 className="text-xl font-bold text-slate-900">Request Progress</h2>
                <p className="mt-1 text-sm text-slate-500">Follow each stage of the relief response.</p>

                <div className="mt-7">
                    {request.stages.map((item, index) => (
                        <div key={item.label} className="relative flex gap-4 pb-7 last:pb-0">
                            {index !== request.stages.length - 1 && (
                                <div className={`absolute left-[15px] top-8 h-full w-0.5 ${item.done ? "bg-green-300" : "bg-slate-200"}`} />
                            )}
                            <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.done ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"
                                }`}>
                                {item.done ? <Check size={17} /> : <Clock size={16} />}
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm font-semibold ${item.done ? "text-slate-900" : "text-slate-400"}`}>{item.label}</p>
                                <p className="mt-1 text-xs text-slate-500">{item.time}</p>
                            </div>
                            {item.done && <span className="text-xs font-semibold text-green-700">Done</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --------------------------------------------------
// COMPLETED REQUESTS AND FEEDBACK
// --------------------------------------------------

const CompletedRequests = ({ requests, ratings, onRate }) => {
    const completed = requests.filter((item) => item.status === "Completed");

    if (!completed.length) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <CheckCircle2 size={40} className="mx-auto text-slate-300" />
                <h2 className="mt-4 font-bold text-slate-900">No completed requests yet</h2>
                <p className="mt-2 text-sm text-slate-500">Completed emergency requests will appear here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Completed Requests</h1>
                <p className="mt-1 text-sm text-slate-500">Your completed relief request history and feedback.</p>
            </div>

            {completed.map((request) => (
                <div key={request.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <p className="text-xs font-bold text-blue-700">{request.id}</p>
                            <h2 className="mt-1 text-lg font-bold text-slate-900">{request.disaster}</h2>
                            <p className="mt-1 text-sm text-slate-500">{request.location}</p>
                        </div>
                        <StatusBadge status="Completed" />
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-2">
                        <p>NGO: <strong>{request.ngo}</strong></p>
                        <p>People assisted: <strong>{request.people}</strong></p>
                        <p>Volunteers: <strong>{request.volunteers?.join(", ") || "Not listed"}</strong></p>
                        <p>Completion date: <strong>{request.date}</strong></p>
                    </div>

                    <div className="mt-5 border-t border-slate-100 pt-5">
                        {ratings[request.id] ? (
                            <div className="text-sm font-semibold text-green-700">
                                Thank you! Your {ratings[request.id].stars}-star feedback has been submitted.
                            </div>
                        ) : (
                            <FeedbackForm request={request} onRate={onRate} />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

const FeedbackForm = ({ request, onRate }) => {
    const [stars, setStars] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState("");

    const submit = () => {
        if (!stars) {
            setError("Please select a star rating.");
            return;
        }

        onRate(request.id, { stars, feedback, date: new Date().toLocaleString("en-IN") });
    };

    return (
        <div>
            <h3 className="font-bold text-slate-900">How was your experience?</h3>
            <div className="mt-3 flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setStars(star)} aria-label={`${star} stars`}>
                        <Star size={25} className={star <= stars ? "fill-yellow-400 text-yellow-400" : "text-slate-300"} />
                    </button>
                ))}
            </div>
            <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                placeholder="Share your feedback..."
                className={`${inputClass} mt-4`}
            />
            {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
            <button onClick={submit} className="mt-3 rounded-xl bg-gray-00 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-900">
                Submit Feedback
            </button>
        </div>
    );
};

// --------------------------------------------------
// MAIN CITIZEN DASHBOARD
// --------------------------------------------------

const CitizenDashboard = () => {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState("overview");
    const [requests, setRequests] = useState(initialRequests);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [ratings, setRatings] = useState({});
    const [showNotifications, setShowNotifications] = useState(false);

    const activeCount = useMemo(
        () => requests.filter((item) => item.status !== "Completed").length,
        [requests]
    );

    const logout = () => {
        // Connect your real authentication logout API here.
        navigate("/auth/citizen/login");
    };

    const handleRequestSubmit = (request) => {
        setRequests((prev) => [request, ...prev]);
        setSelectedRequest(request);
        setActivePage("matching");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleRate = (requestId, rating) => {
        setRatings((prev) => {
            if (prev[requestId]) return prev;
            return { ...prev, [requestId]: rating };
        });
    };

    const setPage = (page) => {
        setActivePage(page);
        setMobileMenuOpen(false);
        setShowNotifications(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const openTrack = (request) => {
        setSelectedRequest(request);
        setPage("tracking");
    };

    const renderPage = () => {
        switch (activePage) {
            case "report":
                return <EmergencyReport onSubmit={handleRequestSubmit} onCancel={() => setPage("overview")} />;

            case "matching":
                return (
                    <AIMatching
                        request={selectedRequest}
                        onBack={() => setPage("overview")}
                        onTrack={() => setPage("tracking")}
                    />
                );

            case "tracking":
                return <RequestTracking request={selectedRequest} onBack={() => setPage("requests")} />;

            case "requests":
            case "active":
                return (
                    <div className="space-y-5">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                {activePage === "active" ? "Active Requests" : "My Requests"}
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">View and track your emergency requests.</p>
                        </div>
                        {requests
                            .filter((item) => activePage === "requests" || item.status !== "Completed")
                            .map((request) => (
                                <RequestCard
                                    key={request.id}
                                    request={request}
                                    onView={openTrack}
                                    onTrack={openTrack}
                                />
                            ))}
                    </div>
                );

            case "completed":
                return <CompletedRequests requests={requests} ratings={ratings} onRate={handleRate} />;

            case "notifications":
                return (
                    <div className="rounded-2xl border border-slate-100 bg-white p-6">
                        <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
                        <div className="mt-5 space-y-3">
                            <div className="rounded-xl bg-gray-50 p-4">
                                <p className="text-sm font-semibold text-blue-900">Welcome to ReliefLinkAI</p>
                                <p className="mt-1 text-xs text-blue-700">You can submit and track emergency requests from your dashboard.</p>
                            </div>
                            {requests.map((request) => (
                                <div key={request.id} className="rounded-xl border border-slate-100 p-4">
                                    <p className="text-sm font-semibold text-slate-800">{request.id} · {request.status}</p>
                                    <p className="mt-1 text-xs text-slate-500">{request.disaster} — {request.location}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "profile":
                return (
                    <div className="max-w-2xl rounded-2xl border border-slate-100 bg-white p-6">
                        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
                        <p className="mt-2 text-sm text-slate-500">Demo citizen profile. Connect this page to your authenticated user profile API.</p>
                        <div className="mt-6 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-blue-700"><UserRound size={26} /></div>
                            <div><p className="font-bold text-slate-900">Citizen User</p><p className="text-sm text-slate-500">citizen@example.com</p></div>
                        </div>
                        <div className="mt-6 space-y-3 text-sm text-slate-600">
                            <p><strong>Account:</strong> Citizen</p>
                            <p><strong>Active Requests:</strong> {activeCount}</p>
                        </div>
                    </div>
                );

            case "support":
                return (
                    <div className="max-w-2xl rounded-2xl border border-slate-100 bg-white p-6">
                        <h1 className="text-2xl font-bold text-slate-900">Help & Support</h1>
                        <p className="mt-2 text-sm leading-6 text-slate-500">For immediate danger, contact your local emergency services directly. ReliefLinkAI is a coordination platform and does not replace emergency services.</p>
                        <a href="tel:112" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"><Phone size={18} /> Call 112 (India)</a>
                    </div>
                );

            default:
                return (
                    <CitizenOverview
                        requests={requests}
                        setActivePage={setPage}
                        setSelectedRequest={setSelectedRequest}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

            <CitizenSidebar
                activePage={activePage}
                setActivePage={setPage}
                onLogout={logout}
            />

            {/* MAIN AREA */}
            <div className="min-h-screen lg:pl-64">

                {/* TOP HEADER */}
                <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileMenuOpen((prev) => !prev)}
                            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
                            aria-label="Open menu"
                        >
                            <Menu size={21} />
                        </button>
                        <div>
                            <p className="text-sm font-bold text-slate-900">ReliefLinkAI</p>
                            <p className="hidden text-xs text-slate-500 sm:block">Citizen Emergency Portal</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setPage("notifications")}
                            className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"
                            aria-label="Notifications"
                        >
                            <Bell size={20} />
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                        </button>
                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-semibold text-slate-800">{localStorage.getItem("citizenName") || "Citizen"}</p>
                            <p className="text-xs text-slate-500">Citizen Account</p>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-blue-700">
                            {localStorage.getItem("citizenName") ? localStorage.getItem("citizenName").charAt(0) : "C"}
                        </div>
                    </div>
                </header>

                {/* MOBILE SIDEBAR DRAWER */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <button onClick={() => setMobileMenuOpen(false)} className="absolute inset-0 bg-slate-950/40" aria-label="Close menu overlay" />
                        <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] overflow-y-auto bg-[#101E36] p-5 shadow-2xl">
                            <div className="mb-6 flex items-center justify-between">
                                <div className="font-bold text-gray-100"> Menu</div>
                                <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu"><X size={21} /></button>
                            </div>
                            <div className="space-y-1">
                                {navigationItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <button key={item.id} onClick={() => setPage(item.id)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${activePage === item.id ? "bg-gray-50 text-blue-700" : "text-gray-100 hover:bg-gray-500"}`}>
                                            <Icon size={19} />{item.label}
                                        </button>
                                    );
                                })}
                                <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"><LogOut size={19} />Logout</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* PAGE CONTENT */}
                <main className="mx-auto max-w-[1500px] px-4 py-6 pb-28 sm:px-6 sm:py-8 lg:px-8 lg:pb-10">
                    {renderPage()}
                </main>
            </div>

            <CitizenBottomNav activePage={activePage} setActivePage={setPage} />
        </div>
    );
};

export default CitizenDashboard;
