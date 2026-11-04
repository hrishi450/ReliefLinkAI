import React, { useMemo, useState } from "react";
import {
    LayoutDashboard, ClipboardList, Sparkles, Activity, Package,
    Users, CheckCircle2, Images, Star, QrCode, Building2,
    FileCheck, Bell, Settings, LogOut, Menu, X, MapPin,
    Clock, AlertTriangle, ShieldCheck, Plus, Search, Eye,
    Check, XCircle, Pencil, Trash2, Upload, Camera,
    Truck, Heart, Droplets, Utensils, Shirt, Pill,
    Siren, ChevronRight, ArrowUpRight, Phone, Mail, Globe,
    Save, UserCheck, CalendarDays, Filter, HandHeart,
} from "lucide-react";

/* ---------------- SAMPLE DATA ---------------- */

const initialRequests = [
    {
        id: "RL-2026-10245",
        disaster: "Flood Emergency",
        location: "Nashik, Maharashtra",
        distance: "3.2 km",
        people: 42,
        urgency: "Critical",
        help: ["Medical", "Food", "Water"],
        resources: ["Medical kits", "Food packets", "Water bottles"],
        time: "Today, 10:30 AM",
        match: 96,
        status: "Recommended",
    },
    {
        id: "RL-2026-10239",
        disaster: "Building Collapse",
        location: "Panchavati, Nashik",
        distance: "5.8 km",
        people: 18,
        urgency: "High",
        help: ["Rescue", "Medical"],
        resources: ["Rescue equipment", "First aid kits"],
        time: "Today, 09:15 AM",
        match: 91,
        status: "Recommended",
    },
    {
        id: "RL-2026-10231",
        disaster: "Medical Emergency",
        location: "Deolali, Nashik",
        distance: "8.1 km",
        people: 9,
        urgency: "Medium",
        help: ["Medical", "Medicines"],
        resources: ["Medicines", "Ambulance"],
        time: "Yesterday, 06:20 PM",
        match: 87,
        status: "Recommended",
    },
];

const initialResources = [
    { id: 1, name: "Food Packets", category: "Food", quantity: 120, unit: "packets", minimum: 50 },
    { id: 2, name: "Drinking Water", category: "Water", quantity: 18, unit: "boxes", minimum: 30 },
    { id: 3, name: "Medical Supplies", category: "Medicines", quantity: 18, unit: "units", minimum: 25 },
    { id: 4, name: "Rescue Vehicles", category: "Vehicles", quantity: 3, unit: "vehicles", minimum: 1 },
    { id: 5, name: "Blankets", category: "Clothes", quantity: 0, unit: "pieces", minimum: 20 },
];

const initialVolunteers = [
    { id: 1, name: "Amit Sharma", location: "Nashik", skills: ["First Aid", "Driving"], experience: "3 years", status: "Available", task: "Not assigned" },
    { id: 2, name: "Rahul Patil", location: "Panchavati", skills: ["Rescue", "Logistics"], experience: "2 years", status: "Available", task: "Not assigned" },
    { id: 3, name: "Priya Deshmukh", location: "Nashik Road", skills: ["Medical Assistance"], experience: "4 years", status: "Busy", task: "RL-2026-10190" },
    { id: 4, name: "Sneha Kulkarni", location: "Deolali", skills: ["Food Distribution"], experience: "1 year", status: "Offline", task: "Not assigned" },
];

const initialOperations = [
    {
        id: "RL-2026-10190",
        disaster: "Medical Emergency",
        location: "Nashik Road",
        people: 5,
        volunteers: ["Priya Deshmukh"],
        resources: "Medical kits",
        started: "Yesterday, 09:00 AM",
        status: "In Progress",
    },
];

const navigation = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Emergency Requests", icon: ClipboardList },
    { label: "AI Recommendations", icon: Sparkles },
    { label: "Active Operations", icon: Activity },
    { label: "Resource Management", icon: Package },
    { label: "Volunteer Management", icon: Users },
    { label: "Completed Requests", icon: CheckCircle2 },
    { label: "Response Gallery", icon: Images },
    { label: "Ratings & Feedback", icon: Star },
    { label: "Donation QR", icon: QrCode },
    { label: "Organization Profile", icon: Building2 },
    { label: "Documents & Verification", icon: FileCheck },
    { label: "Notifications", icon: Bell },
    { label: "Settings", icon: Settings },
];

/* ---------------- SMALL REUSABLE COMPONENTS ---------------- */

function StatusBadge({ children }) {
    const colors = {
        Critical: "bg-red-100 text-red-700",
        High: "bg-orange-100 text-orange-700",
        Medium: "bg-yellow-100 text-yellow-700",
        Low: "bg-green-100 text-green-700",
        Pending: "bg-yellow-100 text-yellow-700",
        "Under Review": "bg-blue-100 text-blue-700",
        Verified: "bg-green-100 text-green-700",
        Rejected: "bg-red-100 text-red-700",
        Suspended: "bg-gray-200 text-gray-700",
        Available: "bg-green-100 text-green-700",
        Assigned: "bg-blue-100 text-blue-700",
        Busy: "bg-orange-100 text-orange-700",
        Offline: "bg-gray-100 text-gray-600",
        Recommended: "bg-purple-100 text-purple-700",
        Accepted: "bg-blue-100 text-blue-700",
        Preparing: "bg-yellow-100 text-yellow-700",
        "Team Assigned": "bg-indigo-100 text-indigo-700",
        "En Route": "bg-cyan-100 text-cyan-700",
        "On Site": "bg-orange-100 text-orange-700",
        "In Progress": "bg-blue-100 text-blue-700",
        "Help Delivered": "bg-green-100 text-green-700",
        Completed: "bg-green-100 text-green-700",
        "Low Stock": "bg-orange-100 text-orange-700",
        "Out of Stock": "bg-red-100 text-red-700",
    };

    return (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${colors[children] || "bg-gray-100 text-gray-700"}`}>
            {children}
        </span>
    );
}

function SectionHeading({ title, description, action }) {
    return (
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h2>
                {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
            </div>
            {action}
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color, note }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
                    <Icon size={21} />
                </div>
                <ArrowUpRight size={18} className="text-slate-400" />
            </div>
            <p className="mt-4 text-sm text-slate-500">{title}</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-900">{value}</h3>
            <p className="mt-1 text-xs text-slate-400">{note}</p>
        </div>
    );
}

function EmptyState({ title, description }) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
            <ClipboardList className="mx-auto mb-3 text-slate-300" size={38} />
            <h3 className="font-semibold text-slate-800">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
    );
}

/* ---------------- MAIN DASHBOARD ---------------- */

export default function NGODashboard() {
    const [activePage, setActivePage] = useState("Overview");
    const [mobileOpen, setMobileOpen] = useState(false);

    // Demo organization details. Replace with backend user data later.
    const [ngo, setNgo] = useState({
        name: "Helping Hands Foundation",
        location: "Nashik, Maharashtra",
        email: "helpinghands@example.org",
        phone: "+91 98765 43210",
        representative: "Rajesh Sharma",
        registration: "NGO-MH-2021-00125",
        description: "Working to provide emergency relief, medical assistance, food and shelter to communities in need.",
        website: "https://example.org",
        status: "Pending",
        services: ["Medical Support", "Food Distribution", "Water Supply", "Rescue"],
        volunteerCapacity: "50",
    });

    const [requests, setRequests] = useState(initialRequests);
    const [resources, setResources] = useState(initialResources);
    const [volunteers, setVolunteers] = useState(initialVolunteers);
    const [operations, setOperations] = useState(initialOperations);
    const [gallery, setGallery] = useState([]);
    const [qrImage, setQrImage] = useState("");
    const [upi, setUpi] = useState("helpinghands@upi");
    const [donationPurpose, setDonationPurpose] = useState("Emergency Relief Fund");
    const [search, setSearch] = useState("");
    const [resourceModal, setResourceModal] = useState(false);
    const [editingResource, setEditingResource] = useState(null);
    const [resourceForm, setResourceForm] = useState({
        name: "", category: "Food", quantity: "", unit: "units", minimum: "",
    });
    const [profileMessage, setProfileMessage] = useState("");
    const [galleryCategory, setGalleryCategory] = useState("Before Response");
    const [galleryCaption, setGalleryCaption] = useState("");

    const isVerified = ngo.status === "Verified";

    const totalResources = resources.reduce((sum, item) => sum + Number(item.quantity), 0);
    const availableVolunteers = volunteers.filter(v => v.status === "Available").length;
    const completedCount = 12;
    const peopleHelped = 386;

    const filteredRequests = useMemo(() => {
        return requests.filter(request =>
            `${request.id} ${request.disaster} ${request.location}`
                .toLowerCase().includes(search.toLowerCase())
        );
    }, [requests, search]);

    const navigate = (page) => {
        setActivePage(page);
        setMobileOpen(false);
    };

    /* Accepting is only a frontend demo.
       The backend must use a database transaction/atomic update
       to prevent two NGOs accepting the same exclusive request. */
    const acceptRequest = (request) => {
        if (!isVerified) return;

        setRequests(prev => prev.map(item =>
            item.id === request.id ? { ...item, status: "Accepted" } : item
        ));

        setOperations(prev => [
            {
                id: request.id,
                disaster: request.disaster,
                location: request.location,
                people: request.people,
                volunteers: [],
                resources: request.resources.join(", "),
                started: new Date().toLocaleString(),
                status: "Accepted",
            },
            ...prev,
        ]);

        setActivePage("Active Operations");
    };

    const rejectRequest = (id) => {
        setRequests(prev => prev.map(item =>
            item.id === id ? { ...item, status: "Rejected" } : item
        ));
    };

    const updateOperationStatus = (id, status) => {
        setOperations(prev => prev.map(item =>
            item.id === id ? { ...item, status } : item
        ));
    };

    const addOrUpdateResource = (e) => {
        e.preventDefault();
        if (!resourceForm.name.trim()) return;

        const item = {
            ...resourceForm,
            id: editingResource ? editingResource.id : Date.now(),
            quantity: Number(resourceForm.quantity),
            minimum: Number(resourceForm.minimum),
        };

        if (editingResource) {
            setResources(prev => prev.map(r => r.id === item.id ? item : r));
        } else {
            setResources(prev => [...prev, item]);
        }

        setResourceModal(false);
        setEditingResource(null);
        setResourceForm({ name: "", category: "Food", quantity: "", unit: "units", minimum: "" });
    };

    const editResource = (resource) => {
        setEditingResource(resource);
        setResourceForm({
            name: resource.name,
            category: resource.category,
            quantity: resource.quantity,
            unit: resource.unit,
            minimum: resource.minimum,
        });
        setResourceModal(true);
    };

    const deleteResource = (id) => {
        if (window.confirm("Are you sure you want to delete this resource?")) {
            setResources(prev => prev.filter(r => r.id !== id));
        }
    };

    const assignVolunteer = (volunteerId, operationId) => {
        if (!isVerified) return;

        const volunteer = volunteers.find(v => v.id === Number(volunteerId));
        if (!volunteer || volunteer.status !== "Available") return;

        setVolunteers(prev => prev.map(v =>
            v.id === volunteer.id
                ? { ...v, status: "Assigned", task: operationId }
                : v
        ));

        setOperations(prev => prev.map(op =>
            op.id === operationId
                ? { ...op, volunteers: [...op.volunteers, volunteer.name], status: "Team Assigned" }
                : op
        ));
    };

    const removeVolunteer = (volunteerName, operationId) => {
        setOperations(prev => prev.map(op =>
            op.id === operationId
                ? { ...op, volunteers: op.volunteers.filter(name => name !== volunteerName) }
                : op
        ));

        setVolunteers(prev => prev.map(v =>
            v.name === volunteerName
                ? { ...v, status: "Available", task: "Not assigned" }
                : v
        ));
    };

    const uploadGalleryImages = (e) => {
        const selected = Array.from(e.target.files || []);
        const valid = selected.filter(file =>
            ["image/jpeg", "image/png", "image/webp"].includes(file.type) &&
            file.size <= 5 * 1024 * 1024
        );

        const newImages = valid.map(file => ({
            id: Date.now() + Math.random(),
            url: URL.createObjectURL(file),
            name: file.name,
            category: galleryCategory,
            caption: galleryCaption,
            date: new Date().toLocaleString(),
        }));

        setGallery(prev => [...newImages, ...prev]);
        e.target.value = "";
    };

    const removeGalleryImage = (id) => {
        setGallery(prev => {
            const image = prev.find(item => item.id === id);
            if (image) URL.revokeObjectURL(image.url);
            return prev.filter(item => item.id !== id);
        });
    };

    const uploadQr = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            alert("Please upload a JPG, PNG or WEBP image.");
            return;
        }

        setQrImage(URL.createObjectURL(file));
    };

    /* ---------------- VERIFICATION LOCK ---------------- */

    const verificationNotice = !isVerified && (
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
                <div className="mt-1 text-amber-600"><AlertTriangle size={22} /></div>
                <div>
                    <h3 className="font-bold text-amber-900">Organization verification required</h3>
                    <p className="mt-1 text-sm text-amber-800">
                        Your organization is currently {ngo.status}. Operational features are locked until an authorized administrator approves your documents.
                    </p>
                </div>
            </div>
            <button
                onClick={() => navigate("Documents & Verification")}
                className="shrink-0 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-700"
            >
                View Verification
            </button>
        </div>
    );

    /* ---------------- PAGE CONTENT ---------------- */

    const renderOverview = () => (
        <>
            <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                    <p className="text-sm font-medium text-blue-700">NGO OPERATIONS CENTER</p>
                    <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                        Welcome, {ngo.name}
                    </h1>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><MapPin size={15} />{ngo.location}</span>
                        <StatusBadge>{ngo.status}</StatusBadge>
                        {isVerified && <span className="flex items-center gap-1 text-green-700"><ShieldCheck size={16} />Verified NGO</span>}
                    </div>
                </div>
                <button
                    onClick={() => navigate("Emergency Requests")}
                    disabled={!isVerified}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ClipboardList size={18} /> View Emergency Requests
                </button>
            </div>

            {verificationNotice}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard title="New Emergency Requests" value={requests.filter(r => r.status === "Recommended").length} icon={ClipboardList} color="bg-blue-50 text-blue-700" note="Waiting for your response" />
                <StatCard title="Active Operations" value={operations.length} icon={Activity} color="bg-orange-50 text-orange-700" note="Ongoing relief activities" />
                <StatCard title="Available Volunteers" value={availableVolunteers} icon={Users} color="bg-green-50 text-green-700" note="Ready to assist" />
                <StatCard title="Available Resources" value={totalResources} icon={Package} color="bg-purple-50 text-purple-700" note="Total inventory quantity" />
                <StatCard title="Completed Requests" value={completedCount} icon={CheckCircle2} color="bg-emerald-50 text-emerald-700" note="Demo organization data" />
                <StatCard title="People Helped" value={peopleHelped} icon={Heart} color="bg-rose-50 text-rose-700" note="People assisted" />
                <StatCard title="Average Rating" value="4.8 / 5" icon={Star} color="bg-yellow-50 text-yellow-700" note="Based on demo reviews" />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-5 xl:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 xl:col-span-2">
                    <SectionHeading title="Recent Emergency Requests" description="Requests recommended for your organization." />
                    <div className="space-y-3">
                        {requests.slice(0, 3).map(request => (
                            <div key={request.id} className="rounded-xl border border-slate-100 p-4">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h3 className="font-bold text-slate-800">{request.disaster}</h3>
                                    <StatusBadge>{request.urgency}</StatusBadge>
                                </div>
                                <p className="mt-2 text-sm text-slate-500">{request.id} · {request.location}</p>
                                <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                                    <span>{request.people} people affected</span>
                                    <span>{request.distance} away</span>
                                    <span>AI Match: {request.match}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => navigate("Emergency Requests")} className="mt-4 text-sm font-semibold text-blue-700">
                        View all requests →
                    </button>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="font-bold text-slate-900">Resource Alerts</h3>
                    <p className="mt-1 text-sm text-slate-500">Resources that need attention.</p>
                    <div className="mt-4 space-y-3">
                        {resources.filter(r => r.quantity <= r.minimum).map(resource => (
                            <div key={resource.id} className="flex items-start gap-3 rounded-xl bg-orange-50 p-3">
                                <AlertTriangle className="mt-0.5 text-orange-600" size={18} />
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">{resource.name}</p>
                                    <p className="text-xs text-slate-500">{resource.quantity} {resource.unit} remaining</p>
                                </div>
                            </div>
                        ))}
                        {!resources.some(r => r.quantity <= r.minimum) && (
                            <p className="text-sm text-slate-500">No resource shortage alerts.</p>
                        )}
                    </div>
                    <button onClick={() => navigate("Resource Management")} className="mt-4 text-sm font-semibold text-blue-700">
                        Manage resources →
                    </button>
                </div>
            </div>
        </>
    );

    const renderRequests = (aiOnly = false) => (
        <>
            <SectionHeading
                title={aiOnly ? "AI Recommendations" : "Emergency Requests"}
                description={aiOnly ? "Suggested emergencies based on your NGO's services and resources." : "Review and respond to incoming emergency requests."}
            />
            {verificationNotice}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search request ID, disaster or location..." className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500" />
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600">
                    <Filter size={17} /> AI Match Score
                </div>
            </div>

            <div className="space-y-4">
                {filteredRequests.filter(r => r.status === "Recommended").map(request => (
                    <div key={request.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex flex-col justify-between gap-3 sm:flex-row">
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <StatusBadge>{request.urgency}</StatusBadge>
                                    <span className="text-xs font-semibold text-slate-400">{request.id}</span>
                                </div>
                                <h3 className="mt-3 text-lg font-bold text-slate-900">{request.disaster}</h3>
                                <p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><MapPin size={15} />{request.location} · {request.distance}</p>
                            </div>
                            <div className="flex h-fit items-center gap-2 rounded-xl bg-green-50 px-4 py-3">
                                <Sparkles className="text-green-700" size={19} />
                                <div>
                                    <p className="text-xl font-bold text-green-700">{request.match}%</p>
                                    <p className="text-xs text-green-700">AI Match</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-3 border-y border-slate-100 py-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div><p className="text-xs text-slate-400">People affected</p><p className="mt-1 font-semibold">{request.people}</p></div>
                            <div><p className="text-xs text-slate-400">Required assistance</p><p className="mt-1 font-semibold">{request.help.join(" + ")}</p></div>
                            <div><p className="text-xs text-slate-400">Required resources</p><p className="mt-1 font-semibold">{request.resources.join(", ")}</p></div>
                            <div><p className="text-xs text-slate-400">Submission time</p><p className="mt-1 font-semibold">{request.time}</p></div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <button onClick={() => alert(`Request details: ${request.id}\n${request.disaster}\n${request.location}\n${request.people} people affected.`)} className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><Eye size={16} />View Details</button>
                            <button disabled={!isVerified} onClick={() => acceptRequest(request)} className="flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-40"><Check size={16} />Accept Request</button>
                            <button disabled={!isVerified} onClick={() => rejectRequest(request.id)} className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-40"><XCircle size={16} />Reject</button>
                        </div>
                    </div>
                ))}
                {filteredRequests.filter(r => r.status === "Recommended").length === 0 && (
                    <EmptyState title="No new emergency requests" description="New recommended requests will appear here." />
                )}
            </div>
        </>
    );

    const renderOperations = () => (
        <>
            <SectionHeading title="Active Operations" description="Manage accepted emergency response operations." />
            {verificationNotice}
            <div className="space-y-4">
                {operations.map(operation => (
                    <div key={operation.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <p className="text-xs font-semibold text-slate-400">{operation.id}</p>
                                <h3 className="mt-1 text-lg font-bold text-slate-900">{operation.disaster}</h3>
                                <p className="mt-1 text-sm text-slate-500">{operation.location} · {operation.people} people affected</p>
                            </div>
                            <StatusBadge>{operation.status}</StatusBadge>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                            <p><span className="text-slate-400">Assigned volunteers:</span> {operation.volunteers.join(", ") || "Not assigned"}</p>
                            <p><span className="text-slate-400">Resources:</span> {operation.resources}</p>
                            <p><span className="text-slate-400">Started:</span> {operation.started}</p>
                        </div>
                        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                            <select disabled={!isVerified} value={operation.status} onChange={e => updateOperationStatus(operation.id, e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none disabled:opacity-50">
                                {["Accepted", "Preparing", "Team Assigned", "En Route", "On Site", "In Progress", "Help Delivered", "Completed"].map(status => <option key={status}>{status}</option>)}
                            </select>
                            <select disabled={!isVerified} defaultValue="" onChange={e => { if (e.target.value) assignVolunteer(e.target.value, operation.id); e.target.value = ""; }} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none disabled:opacity-50">
                                <option value="">Assign available volunteer</option>
                                {volunteers.filter(v => v.status === "Available").map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                            </select>
                        </div>
                        {operation.volunteers.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {operation.volunteers.map(name => (
                                    <span key={name} className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs text-blue-700">
                                        {name}
                                        <button disabled={!isVerified} onClick={() => removeVolunteer(name, operation.id)}><X size={13} /></button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {operations.length === 0 && <EmptyState title="No active operations" description="Accept an emergency request to create an operation." />}
            </div>
        </>
    );

    const renderResources = () => (
        <>
            <SectionHeading
                title="Resource Management"
                description="Monitor your inventory and keep resource quantities updated."
                action={<button disabled={!isVerified} onClick={() => { setEditingResource(null); setResourceForm({ name: "", category: "Food", quantity: "", unit: "units", minimum: "" }); setResourceModal(true); }} className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white disabled:opacity-40"><Plus size={17} />Add Resource</button>}
            />
            {verificationNotice}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {resources.map(resource => {
                    const status = resource.quantity === 0 ? "Out of Stock" : resource.quantity <= resource.minimum ? "Low Stock" : "Available";
                    return (
                        <div key={resource.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                            <div className="flex items-start justify-between gap-2">
                                <div><p className="text-xs text-slate-400">{resource.category}</p><h3 className="mt-1 font-bold text-slate-900">{resource.name}</h3></div>
                                <StatusBadge>{status}</StatusBadge>
                            </div>
                            <p className="mt-5 text-3xl font-bold text-slate-900">{resource.quantity} <span className="text-sm font-medium text-slate-400">{resource.unit}</span></p>
                            <p className="mt-1 text-xs text-slate-500">Minimum stock: {resource.minimum} {resource.unit}</p>
                            <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
                                <button disabled={!isVerified} onClick={() => editResource(resource)} className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-slate-200 py-2 text-sm font-semibold text-slate-600 disabled:opacity-40"><Pencil size={14} />Edit</button>
                                <button disabled={!isVerified} onClick={() => deleteResource(resource.id)} className="flex items-center justify-center rounded-lg border border-red-100 px-3 text-red-600 disabled:opacity-40"><Trash2 size={15} /></button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );

    const renderVolunteers = () => (
        <>
            <SectionHeading title="Volunteer Management" description="View your organization's volunteers and their current availability." />
            {verificationNotice}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {volunteers.map(volunteer => (
                    <div key={volunteer.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">{volunteer.name.split(" ").map(n => n[0]).join("")}</div>
                            <div className="min-w-0 flex-1">
                                <h3 className="font-bold text-slate-900">{volunteer.name}</h3>
                                <p className="text-xs text-slate-500">{volunteer.location} · {volunteer.experience} experience</p>
                            </div>
                            <StatusBadge>{volunteer.status}</StatusBadge>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs text-slate-400">Skills</p>
                            <div className="mt-2 flex flex-wrap gap-2">{volunteer.skills.map(skill => <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{skill}</span>)}</div>
                            <p className="mt-3 text-sm text-slate-500">Current task: <span className="font-medium text-slate-800">{volunteer.task}</span></p>
                        </div>
                        <button onClick={() => alert(`${volunteer.name}\nLocation: ${volunteer.location}\nSkills: ${volunteer.skills.join(", ")}\nExperience: ${volunteer.experience}\nTask: ${volunteer.task}`)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><Eye size={16} />View Profile</button>
                    </div>
                ))}
            </div>
        </>
    );

    const renderGallery = () => (
        <>
            <SectionHeading title="Emergency Response Evidence" description="Upload response photos with a category and caption." />
            {verificationNotice}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <select value={galleryCategory} onChange={e => setGalleryCategory(e.target.value)} className="rounded-xl border border-slate-200 p-3 text-sm">
                        {["Before Response", "During Response", "After Response"].map(x => <option key={x}>{x}</option>)}
                    </select>
                    <input value={galleryCaption} onChange={e => setGalleryCaption(e.target.value)} placeholder="Photo caption (optional)" className="rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500" />
                </div>
                <label className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-blue-50 px-4 py-8 text-center ${!isVerified ? "pointer-events-none opacity-50" : ""}`}>
                    <Camera className="mb-2 text-blue-700" size={30} />
                    <span className="font-semibold text-slate-800">Upload response photos</span>
                    <span className="mt-1 text-xs text-slate-500">JPG, PNG or WEBP · Maximum 5 MB each</span>
                    <input disabled={!isVerified} type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={uploadGalleryImages} className="hidden" />
                </label>
            </div>
            {gallery.length ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {gallery.map(image => (
                        <div key={image.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <img src={image.url} alt={image.caption || image.name} className="h-36 w-full object-cover" />
                            <div className="p-3">
                                <p className="text-sm font-semibold">{image.category}</p>
                                <p className="mt-1 truncate text-xs text-slate-500">{image.caption || image.name}</p>
                                <p className="mt-1 text-[10px] text-slate-400">{image.date}</p>
                                <button disabled={!isVerified} onClick={() => removeGalleryImage(image.id)} className="mt-2 text-xs font-semibold text-red-600 disabled:opacity-40">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <EmptyState title="No response photos yet" description="Your uploaded emergency response evidence will appear here." />}
        </>
    );

    const renderCompleted = () => (
        <>
            <SectionHeading title="Completed Requests" description="Review completed relief operations and response records." />
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard title="Total Completed" value="12" icon={CheckCircle2} color="bg-green-50 text-green-700" note="Demo data" />
                <StatCard title="People Helped" value="386" icon={Heart} color="bg-rose-50 text-rose-700" note="Demo data" />
                <StatCard title="Average Response Time" value="2.4 hrs" icon={Clock} color="bg-blue-50 text-blue-700" note="Demo data" />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-900">Completed operation history</h3>
                <div className="mt-4 space-y-3">
                    <div className="rounded-xl border border-slate-100 p-4">
                        <div className="flex flex-wrap justify-between gap-2"><h4 className="font-semibold">Medical Emergency · RL-2026-10190</h4><StatusBadge>Completed</StatusBadge></div>
                        <p className="mt-2 text-sm text-slate-500">Nashik Road · 5 people helped · 2 volunteers</p>
                        <p className="mt-2 text-xs text-slate-400">Completion date: 30 October 2026 · Citizen rating: 5.0 ★</p>
                    </div>
                    <div className="rounded-xl border border-slate-100 p-4">
                        <div className="flex flex-wrap justify-between gap-2"><h4 className="font-semibold">Flood Relief · RL-2026-10082</h4><StatusBadge>Completed</StatusBadge></div>
                        <p className="mt-2 text-sm text-slate-500">Nashik · 65 people helped · 8 volunteers</p>
                        <p className="mt-2 text-xs text-slate-400">Completion date: 25 October 2026 · Citizen rating: 4.8 ★</p>
                    </div>
                </div>
            </div>
        </>
    );

    const renderRatings = () => (
        <>
            <SectionHeading title="Ratings & Feedback" description="Understand how citizens rate your relief operations." />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
                    <Star className="mx-auto fill-yellow-400 text-yellow-400" size={32} />
                    <p className="mt-3 text-4xl font-bold text-slate-900">4.8</p>
                    <p className="mt-1 text-sm text-slate-500">out of 5 · 28 reviews</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
                    <h3 className="font-bold">Rating breakdown</h3>
                    {[["5 Star", 80], ["4 Star", 15], ["3 Star", 4], ["2 Star", 1], ["1 Star", 0]].map(([label, value]) => (
                        <div key={label} className="mt-3 flex items-center gap-3 text-sm">
                            <span className="w-14 text-slate-500">{label}</span>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-yellow-400" style={{ width: `${value}%` }} /></div>
                            <span className="w-10 text-right text-slate-500">{value}%</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold">Recent citizen feedback</h3>
                {[
                    ["RL-2026-10190", "Excellent support. The medical team arrived quickly.", "5.0", "30 Oct 2026"],
                    ["RL-2026-10082", "The volunteers helped distribute food and drinking water.", "4.8", "25 Oct 2026"],
                ].map(review => (
                    <div key={review[0]} className="mt-4 border-t border-slate-100 pt-4">
                        <div className="flex flex-wrap justify-between gap-2"><p className="text-sm font-semibold">{review[0]}</p><span className="text-sm text-yellow-600">★ {review[2]}</span></div>
                        <p className="mt-2 text-sm text-slate-600">{review[1]}</p>
                        <p className="mt-1 text-xs text-slate-400">{review[3]}</p>
                    </div>
                ))}
            </div>
        </>
    );

    const renderDonation = () => (
        <>
            <SectionHeading title="Organization Donation QR" description="Manage the donation QR and information displayed to supporters." />
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="font-bold text-slate-900">Donation QR Code</h3>
                    <p className="mt-1 text-sm text-slate-500">Upload your organization's official UPI QR image.</p>
                    <div className="mt-5 flex min-h-56 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                        {qrImage ? <img src={qrImage} alt="Donation QR preview" className="max-h-52 max-w-full object-contain" /> : <div className="text-center text-slate-400"><QrCode size={55} className="mx-auto" /><p className="mt-2 text-sm">QR preview will appear here</p></div>}
                    </div>
                    <label className={`mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 ${!isVerified ? "pointer-events-none opacity-50" : ""}`}>
                        <Upload size={17} />Upload / Update QR
                        <input disabled={!isVerified} type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadQr} className="hidden" />
                    </label>
                    {qrImage && <button disabled={!isVerified} onClick={() => setQrImage("")} className="mt-2 w-full text-sm font-semibold text-red-600 disabled:opacity-40">Remove QR</button>}
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="font-bold text-slate-900">Donation Details</h3>
                    <label className="mt-4 block text-sm font-medium text-slate-600">UPI ID</label>
                    <input disabled={!isVerified} value={upi} onChange={e => setUpi(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm disabled:bg-slate-50" />
                    <label className="mt-4 block text-sm font-medium text-slate-600">Donation Purpose</label>
                    <input disabled={!isVerified} value={donationPurpose} onChange={e => setDonationPurpose(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm disabled:bg-slate-50" />
                    <div className="mt-5 rounded-xl bg-blue-50 p-4 text-center">
                        <p className="font-bold text-blue-900">Support {ngo.name}</p>
                        <p className="mt-1 text-sm text-blue-700">Scan QR to Donate</p>
                        <p className="mt-2 text-xs text-blue-600">{donationPurpose}</p>
                        {isVerified && <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-green-700"><ShieldCheck size={14} />Verified Organization</p>}
                    </div>
                    <p className="mt-4 text-xs text-slate-400">This page does not process payments or confirm donations. Payment gateway integration is required.</p>
                </div>
            </div>
        </>
    );

    const renderProfile = () => (
        <>
            <SectionHeading title="Organization Profile" description="Update your NGO's public organization information." />
            <form onSubmit={e => { e.preventDefault(); setProfileMessage("Profile changes saved in this demo session."); }} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                        ["Organization Name", "name"],
                        ["Registration Number", "registration"],
                        ["Official Email", "email"],
                        ["Phone Number", "phone"],
                        ["Representative", "representative"],
                        ["Location", "location"],
                        ["Website", "website"],
                        ["Volunteer Capacity", "volunteerCapacity"],
                    ].map(([label, key]) => (
                        <label key={key} className="block">
                            <span className="text-sm font-medium text-slate-600">{label}</span>
                            <input value={ngo[key]} onChange={e => setNgo(prev => ({ ...prev, [key]: e.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500" />
                        </label>
                    ))}
                </div>
                <label className="mt-4 block text-sm font-medium text-slate-600">Organization Description</label>
                <textarea rows="4" value={ngo.description} onChange={e => setNgo(prev => ({ ...prev, description: e.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500" />
                <p className="mt-4 text-sm text-slate-500">Verification status: <StatusBadge>{ngo.status}</StatusBadge></p>
                {profileMessage && <p className="mt-3 text-sm font-medium text-green-700">{profileMessage}</p>}
                <button type="submit" className="mt-5 flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"><Save size={17} />Save Profile</button>
            </form>
        </>
    );

    const renderVerification = () => (
        <>
            <SectionHeading title="Documents & Verification" description="Review your organization's verification status and submitted documents." />
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div><p className="text-sm text-slate-500">Organization verification status</p><h3 className="mt-1 text-xl font-bold text-slate-900">{ngo.name}</h3></div>
                    <StatusBadge>{ngo.status}</StatusBadge>
                </div>
                <div className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                    <AlertTriangle className="mb-2" size={20} />
                    Only an authorized administrator can approve or reject NGO documents. Uploading documents does not automatically verify your organization.
                </div>
                {["NGO Registration Certificate", "Trust / Society Certificate", "Government Registration Proof", "Authorized Representative Document"].map((doc, index) => (
                    <div key={doc} className="mt-3 flex flex-col justify-between gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3"><FileCheck className="text-blue-600" size={21} /><div><p className="text-sm font-semibold text-slate-800">{doc}</p><p className="text-xs text-slate-400">Document {index + 1}</p></div></div>
                        <StatusBadge>Pending</StatusBadge>
                    </div>
                ))}
                <p className="mt-4 text-xs text-slate-400">Demo document statuses. In production, retrieve document status from your secure backend. Do not expose sensitive document URLs publicly.</p>
            </div>
        </>
    );

    const renderNotifications = () => (
        <>
            <SectionHeading title="Notifications" description="Updates about your organization's activities." />
            <div className="space-y-3">
                {[
                    ["New emergency request recommended", "A flood emergency request has been matched with your organization.", "Today, 10:30 AM"],
                    ["Verification pending", "Your NGO documents are waiting for administrator review.", "Today, 09:00 AM"],
                    ["Resource shortage alert", "Your drinking water stock is below the minimum level.", "Yesterday, 06:00 PM"],
                ].map(item => (
                    <div key={item[0]} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4">
                        <div className="rounded-full h-10 w-10 bg-blue-50 flex items-center justify-center text-blue-700"><Bell size={18} /></div>
                        <div><p className="font-semibold text-slate-800">{item[0]}</p><p className="mt-1 text-sm text-slate-500">{item[1]}</p><p className="mt-2 text-xs text-slate-400">{item[2]}</p></div>
                    </div>
                ))}
            </div>
        </>
    );

    const renderSettings = () => (
        <>
            <SectionHeading title="Settings" description="Manage your dashboard preferences." />
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold">Account settings</h3>
                <p className="mt-2 text-sm text-slate-500">Your login security, password changes and notification preferences should be managed through your authenticated backend account.</p>
                <button onClick={() => alert("Connect your backend password-change flow here.")} className="mt-4 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">Change Password</button>
            </div>
        </>
    );

    const pageContent = () => {
        switch (activePage) {
            case "Overview": return renderOverview();
            case "Emergency Requests": return renderRequests(false);
            case "AI Recommendations": return renderRequests(true);
            case "Active Operations": return renderOperations();
            case "Resource Management": return renderResources();
            case "Volunteer Management": return renderVolunteers();
            case "Completed Requests": return renderCompleted();
            case "Response Gallery": return renderGallery();
            case "Ratings & Feedback": return renderRatings();
            case "Donation QR": return renderDonation();
            case "Organization Profile": return renderProfile();
            case "Documents & Verification": return renderVerification();
            case "Notifications": return renderNotifications();
            case "Settings": return renderSettings();
            default: return renderOverview();
        }
    };

    /* ---------------- SIDEBAR ---------------- */

    const sidebar = (
        <div className="flex h-full flex-col bg-[#101E36] text-white">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-[#101E36]"><Siren size={23} /></div>
                <div> <h1 className="text-[#f8f9fa] font-popinEB text-lg sm:text-xl md:text-xl lg:text-2xl font-bold whitespace-nowrap" >
                    ReliefLink
                    <span className="font-popinSB text-[#ec1e1e]"> AI</span>
                </h1><p className="text-xs text-slate-400">NGO Partner Portal</p></div>
                <button onClick={() => setMobileOpen(false)} className="ml-auto lg:hidden"><X size={21} /></button>
            </div>

            <div className="mx-4 mt-5 rounded-xl bg-white/5 p-3 ">
                <div className="flex items-center gap-2"><Building2 size={17} className="text-cyan-300" /><p className="truncate text-sm font-semibold">{ngo.name}</p></div>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-400"><MapPin size={13} />{ngo.location}</div>
                <div className="mt-3"><StatusBadge>{ngo.status}</StatusBadge></div>
            </div>

            <nav className="mt-5 flex-1 space-y-1 overflow-y-auto  [&::-webkit-scrollbar]:hidden overflow-auto px-3 pb-5">
                {navigation.map(({ label, icon: Icon }) => (
                    <button key={label} onClick={() => navigate(label)} className={`flex w-full items-center gap-3 rounded-xl scrollbar-none [&::-webkit-scrollbar]:hidden overflow-auto px-3 py-3 text-left text-sm transition ${activePage === label ? "bg-cyan-400 font-semibold text-[#101E36]" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
                        <Icon size={18} /><span>{label}</span>
                        {label === "Emergency Requests" && requests.filter(r => r.status === "Recommended").length > 0 && <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-[10px] text-white">{requests.filter(r => r.status === "Recommended").length}</span>}
                    </button>
                ))}
            </nav>

            <div className="border-t border-white/10 p-3">
                <button onClick={() => { window.location.href = "/"; }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 hover:bg-white/10"><LogOut size={18} />Logout</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F4F7FB] text-slate-800">
            {/* Desktop sidebar */}
            <aside className="fixed inset-y-0 left-0 scrollbar-none z-30 hidden w-[270px] lg:block">
                {sidebar}
            </aside>

            {/* Mobile sidebar */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-black/50" />
                    <aside className="relative h-full w-[285px] max-w-[85vw]">{sidebar}</aside>
                </div>
            )}

            {/* Main content */}
            <main className="min-h-screen lg:ml-[270px]">
                <header className="sticky top-0 z-20 flex h-[70px] items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"><Menu size={22} /></button>
                        <div>
                            <p className="text-sm font-bold text-slate-800">{activePage}</p>
                            <p className="hidden text-xs text-slate-400 sm:block">ReliefLink AI · NGO Operations</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate("Notifications")} className="relative rounded-full border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50"><Bell size={19} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" /></button>
                        <div className="hidden text-right sm:block"><p className="text-sm font-semibold">{ngo.representative}</p><p className="text-xs text-slate-400">NGO Representative</p></div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">{ngo.representative.split(" ").map(n => n[0]).join("")}</div>
                    </div>
                </header>

                <div className="mx-auto max-w-[1600px] p-4 pb-24 sm:p-6 lg:p-8 lg:pb-8">
                    {pageContent()}
                </div>

            </main>

            {/* Mobile bottom navigation */}
            <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-slate-200 bg-white px-1 py-2 shadow-[0_-5px_20px_rgba(15,23,42,0.06)] lg:hidden">
                {[
                    ["Overview", LayoutDashboard, "Home"],
                    ["Emergency Requests", ClipboardList, "Requests"],
                    ["Active Operations", Activity, "Operations"],
                    ["Notifications", Bell, "Alerts"],
                    ["Organization Profile", Building2, "Profile"],
                ].map(([page, Icon, label]) => (
                    <button key={page} onClick={() => navigate(page)} className={`flex flex-col items-center gap-1 py-1 text-[10px] font-medium ${activePage === page ? "text-blue-700" : "text-slate-400"}`}>
                        <Icon size={20} /><span>{label}</span>
                    </button>
                ))}
                <button
                    onClick={() => navigate("Emergency Requests")}
                    disabled={!isVerified}
                    className="flex lg:hidden fixed absolute bottom-20 right-2 items-center justify-center gap-2 rounded-xl bg-gray-800 px-3 py-3 font-md text-white hover:bg-blue-800 "
                >
                    <ClipboardList size={18} /> View Emergency Requests
                </button>
            </nav>

            {/* Add / edit resource modal */}
            {resourceModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4">
                    <form onSubmit={addOrUpdateResource} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">{editingResource ? "Edit Resource" : "Add New Resource"}</h3>
                            <button type="button" onClick={() => setResourceModal(false)}><X size={21} /></button>
                        </div>
                        <label className="mt-5 block text-sm font-medium">Resource Name</label>
                        <input required value={resourceForm.name} onChange={e => setResourceForm(p => ({ ...p, name: e.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm" placeholder="e.g. First Aid Kits" />
                        <label className="mt-4 block text-sm font-medium">Category</label>
                        <select value={resourceForm.category} onChange={e => setResourceForm(p => ({ ...p, category: e.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm">
                            {["Food", "Water", "Clothes", "Medicines", "Medical Equipment", "Blood", "Rescue Equipment", "Vehicles", "Shelter Capacity", "Other"].map(x => <option key={x}>{x}</option>)}
                        </select>
                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <label className="text-sm font-medium">Quantity<input required min="0" type="number" value={resourceForm.quantity} onChange={e => setResourceForm(p => ({ ...p, quantity: e.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm" /></label>
                            <label className="text-sm font-medium">Unit<input required value={resourceForm.unit} onChange={e => setResourceForm(p => ({ ...p, unit: e.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm" /></label>
                            <label className="text-sm font-medium">Minimum<input required min="0" type="number" value={resourceForm.minimum} onChange={e => setResourceForm(p => ({ ...p, minimum: e.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm" /></label>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <button type="button" onClick={() => setResourceModal(false)} className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold">Cancel</button>
                            <button type="submit" className="flex-1 rounded-xl bg-blue-700 py-3 text-sm font-semibold text-white">{editingResource ? "Save Changes" : "Add Resource"}</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}