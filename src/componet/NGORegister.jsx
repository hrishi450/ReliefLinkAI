
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Building2,
    CheckCircle2,
    Upload,
    FileText,
    MapPin,
    Siren,
    ShieldCheck,
    Eye,
    X,
} from "lucide-react";

// -------------------------------------
// STEP CONFIGURATION
// -------------------------------------

const steps = [
    "Organization",
    "Representative",
    "Location",
    "Services",
    "Resources",
    "Documents",
    "Security",
];

const serviceOptions = [
    "Medical Support",
    "Food Distribution",
    "Water Supply",
    "Rescue",
    "Shelter",
    "Clothing",
    "Transportation",
    "Medicines",
    "Blood Support",
    "Other",
];

const documentFields = [
    { key: "registrationCertificate", label: "NGO Registration Certificate" },
    { key: "trustCertificate", label: "Trust / Society Certificate" },
    { key: "governmentProof", label: "Government Registration Proof" },
    { key: "representativeDocument", label: "Authorized Representative Document" },
];

// -------------------------------------
// INPUT STYLES
// -------------------------------------

const inputClass =
    "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition";

const labelClass =
    "block text-sm font-semibold text-slate-700 mb-2";

// -------------------------------------
// REUSABLE FIELD COMPONENTS
// IMPORTANT: Keep these OUTSIDE NGORegister
// -------------------------------------

const Field = ({
    label,
    name,
    type = "text",
    required = true,
    placeholder,
    value,
    onChange,
}) => (
    <div>
        <label className={labelClass}>
            {label} {required && <span className="text-red-500">*</span>}
        </label>

        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder || `Enter ${label.toLowerCase()}`}
            className={inputClass}
        />
    </div>
);

const TextAreaField = ({
    label,
    name,
    placeholder,
    value,
    onChange,
}) => (
    <div>
        <label className={labelClass}>{label}</label>

        <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={4}
            placeholder={placeholder}
            className={`${inputClass} resize-y`}
        />
    </div>
);

const SelectField = ({
    label,
    name,
    options,
    value,
    onChange,
}) => (
    <div>
        <label className={labelClass}>
            {label} <span className="text-red-500">*</span>
        </label>

        <select
            name={name}
            value={value}
            onChange={onChange}
            className={inputClass}
        >
            <option value="">Select {label}</option>

            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

// -------------------------------------
// INITIAL FORM DATA
// -------------------------------------

const initialForm = {
    ngoName: "",
    registrationNumber: "",
    organizationType: "",
    yearEstablished: "",
    description: "",
    officialEmail: "",
    phoneNumber: "",
    website: "",

    representativeName: "",
    designation: "",
    representativeMobile: "",
    representativeEmail: "",

    state: "",
    district: "",
    city: "",
    village: "",
    address: "",
    pincode: "",
    mapLocation: "",

    services: [],

    food: "",
    water: "",
    medicines: "",
    clothes: "",
    vehicles: "",
    rescueEquipment: "",
    shelterCapacity: "",
    volunteerCount: "",

    password: "",
    confirmPassword: "",
    terms: false,
};

// =====================================
// NGO REGISTRATION COMPONENT
// =====================================

const NGORegister = () => {
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(initialForm);
    const [documents, setDocuments] = useState({});
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // -------------------------------------
    // UPDATE FORM INPUTS
    // -------------------------------------

    const updateField = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setError("");
    };

    // -------------------------------------
    // SELECT NGO SERVICES
    // -------------------------------------

    const toggleService = (service) => {
        setFormData((prev) => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter((item) => item !== service)
                : [...prev.services, service],
        }));

        setError("");
    };

    // -------------------------------------
    // DOCUMENT UPLOAD
    // -------------------------------------

    const handleDocumentUpload = (e, key) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Please upload only PDF, JPG or PNG files.");
            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Each document must be smaller than 5 MB.");
            e.target.value = "";
            return;
        }

        setDocuments((prev) => {
            if (prev[key]?.preview) {
                URL.revokeObjectURL(prev[key].preview);
            }

            return {
                ...prev,
                [key]: {
                    file,
                    preview: file.type.startsWith("image/")
                        ? URL.createObjectURL(file)
                        : null,
                },
            };
        });

        setError("");
        e.target.value = "";
    };

    // -------------------------------------
    // REMOVE UPLOADED DOCUMENT
    // -------------------------------------

    const removeDocument = (key) => {
        setDocuments((prev) => {
            const updated = { ...prev };

            if (updated[key]?.preview) {
                URL.revokeObjectURL(updated[key].preview);
            }

            delete updated[key];

            return updated;
        });
    };

    // -------------------------------------
    // VALIDATION
    // -------------------------------------

    const validateStep = () => {
        // STEP 1: ORGANIZATION DETAILS

        if (currentStep === 0) {
            const required = [
                "ngoName",
                "registrationNumber",
                "organizationType",
                "yearEstablished",
                "officialEmail",
                "phoneNumber",
            ];

            if (required.some((key) => !String(formData[key]).trim())) {
                setError("Please fill all required organization details.");
                return false;
            }

            const year = Number(formData.yearEstablished);

            if (!Number.isInteger(year) || year < 1800 || year > new Date().getFullYear()) {
                setError("Please enter a valid establishment year.");
                return false;
            }

            if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
                setError("Enter a valid 10-digit NGO phone number.");
                return false;
            }
        }

        // STEP 2: REPRESENTATIVE DETAILS

        if (currentStep === 1) {
            const required = [
                "representativeName",
                "designation",
                "representativeMobile",
                "representativeEmail",
            ];

            if (required.some((key) => !formData[key].trim())) {
                setError("Please fill all representative details.");
                return false;
            }

            if (!/^[0-9]{10}$/.test(formData.representativeMobile)) {
                setError("Enter a valid 10-digit representative mobile number.");
                return false;
            }
        }

        // STEP 3: LOCATION

        if (currentStep === 2) {
            const required = [
                "state",
                "district",
                "city",
                "address",
                "pincode",
            ];

            if (required.some((key) => !formData[key].trim())) {
                setError("Please complete the required location details.");
                return false;
            }

            if (!/^[0-9]{6}$/.test(formData.pincode)) {
                setError("Enter a valid 6-digit pincode.");
                return false;
            }
        }

        // STEP 4: SERVICES

        if (currentStep === 3 && formData.services.length === 0) {
            setError("Please select at least one service.");
            return false;
        }

        // STEP 6: DOCUMENTS

        if (currentStep === 5) {
            const missingDocument = documentFields.some(
                (doc) => !documents[doc.key]
            );

            if (missingDocument) {
                setError("Please upload all four verification documents.");
                return false;
            }
        }

        // STEP 7: SECURITY

        if (currentStep === 6) {
            if (formData.password.length < 8) {
                setError("Password must contain at least 8 characters.");
                return false;
            }

            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match.");
                return false;
            }

            if (!formData.terms) {
                setError("Please accept the Terms & Conditions.");
                return false;
            }
        }

        setError("");
        return true;
    };

    // -------------------------------------
    // NEXT STEP
    // -------------------------------------

    const nextStep = () => {
        if (!validateStep()) return;

        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // -------------------------------------
    // PREVIOUS STEP
    // -------------------------------------

    const previousStep = () => {
        setError("");

        setCurrentStep((prev) => Math.max(prev - 1, 0));

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // -------------------------------------
    // FINAL SUBMISSION
    // -------------------------------------

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateStep()) return;

        // FRONTEND DEMO ONLY
        // Connect your backend API here.
        // Submit formData and documents using FormData.
        // Backend must create the NGO with status PENDING.
        // Only an authorized admin can change the status to VERIFIED.

        setSubmitted(true);
        navigate("/ngo/dashboard");

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // =====================================
    // SUCCESS SCREEN
    // =====================================

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">

                <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-100 p-7 sm:p-10 text-center">

                    <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={44} />
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        Registration Submitted!
                    </h1>

                    <p className="text-slate-500 mt-4 leading-7">
                        Your NGO registration has been submitted successfully.
                    </p>

                    <div className="mt-7 p-5 bg-amber-50 border border-amber-200 rounded-2xl text-left">

                        <p className="text-sm text-amber-800 font-semibold">
                            Current Application Status
                        </p>

                        <p className="text-xl font-bold text-amber-700 mt-2">
                            Verification Pending
                        </p>

                        <p className="text-sm text-amber-700 mt-2 leading-6">
                            Your documents are waiting for review by an authorized
                            ReliefLinkAI administrator. Your NGO will not receive verified
                            status until the admin approves the documents.
                        </p>

                    </div>

                    <button
                        onClick={() => navigate("/auth/ngo/login")}
                        className="w-full mt-7 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition"
                    >
                        Go to NGO Login
                    </button>

                    <Link
                        to="/"
                        className="inline-block mt-4 text-sm text-blue-700 font-semibold hover:underline"
                    >
                        Back to Home
                    </Link>

                </div>
            </div>
        );
    }

    // =====================================
    // MAIN REGISTRATION PAGE
    // =====================================

    return (
        <div className="min-h-screen  bg-slate-50 py-8 px-3 sm:px-6 lg:px-8">

            <div className="max-w-5xl mx-auto">

                {/* BACK BUTTON */}

                <button
                    onClick={() => navigate("/")}
                    className="absolute z-100 left-5 top-5 sm:left-8 sm:top-8 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-blue-500 hover:text-blue-600"
                >
                    <ArrowLeft size={18} />
                    Back to Home
                </button>


                <header className=" absolute right-0 lg:right-7 top-5 mb-12 flex items-center justify-end sm:mb-16">
                    <div className="flex items-center gap-3">
                        <div className="w-full sm:w-auto flex items-center gap-2 px-4 sm:px-6 md:px-4 lg:px-0">
                            <div className="bg-gray-800 p-2 rounded-xl">
                                <Siren color="#ffffff" size={24} />
                            </div>

                            <h1 className="text-[#092B4C] font-popinEB text-lg sm:text-xl md:text-xl lg:text-2xl font-bold whitespace-nowrap">
                                ReliefLink
                                <span className="font-popinSB text-[#C93D3D]">AI</span>
                            </h1>
                        </div>
                    </div>
                </header>

                <div className="relative z-10 mx-auto max-w-7xl">


                    {/* PAGE HEADING */}

                    <div className="mt-15 text-center mb-8">

                        <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                            <Building2 size={34} />
                        </div>

                        <p className="text-sm font-bold tracking-wider text-gray-700">
                            RELIEFLINKAI NGO PARTNER PORTAL
                        </p>

                        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-3">
                            Register Your Organization
                        </h1>

                        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-500 mt-3 leading-7">
                            Join the ReliefLinkAI network and connect your relief resources
                            with communities that need assistance.
                        </p>

                    </div>

                    {/* MAIN FORM CARD */}

                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

                        {/* PROGRESS BAR */}

                        <div className="p-4 sm:p-7 border-b border-slate-100">

                            <div className="flex items-center justify-between gap-2 mb-4">

                                <p className="text-sm font-bold text-slate-800">
                                    Step {currentStep + 1} of {steps.length}
                                </p>

                                <p className="text-sm font-semibold text-blue-700">
                                    {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
                                </p>

                            </div>

                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">

                                <div
                                    className="h-full bg-gray-700 rounded-full transition-all duration-300"
                                    style={{
                                        width: `${((currentStep + 1) / steps.length) * 100}%`,
                                    }}
                                />

                            </div>

                            {/* STEP LABELS */}

                            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mt-5">

                                {steps.map((step, index) => (

                                    <div key={step} className="text-center">

                                        <div
                                            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${index <= currentStep
                                                ? "bg-gray-800  text-white"
                                                : "bg-slate-100 text-slate-500"
                                                }`}
                                        >
                                            {index < currentStep ? (
                                                <CheckCircle2 size={17} />
                                            ) : (
                                                index + 1
                                            )}
                                        </div>

                                        <p
                                            className={`hidden sm:block text-xs mt-2 ${index === currentStep
                                                ? "text-gray-700 font-bold"
                                                : "text-slate-400"
                                                }`}
                                        >
                                            {step}
                                        </p>

                                    </div>

                                ))}

                            </div>
                        </div>

                        {/* FORM CONTENT */}

                        <form onSubmit={handleSubmit} className="p-5 sm:p-8 lg:p-10">

                            {/* =================================
                STEP 1: ORGANIZATION DETAILS
            ================================= */}

                            {currentStep === 0 && (

                                <div className="space-y-6">

                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            1. Organization Details
                                        </h2>

                                        <p className="text-sm text-slate-500 mt-1">
                                            Enter your NGO's official information.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                        <Field
                                            label="NGO Name"
                                            name="ngoName"
                                            value={formData.ngoName}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="Registration Number"
                                            name="registrationNumber"
                                            value={formData.registrationNumber}
                                            onChange={updateField}
                                        />

                                        <SelectField
                                            label="Organization Type"
                                            name="organizationType"
                                            options={[
                                                "Trust",
                                                "Society",
                                                "Section 8 Company",
                                                "Non-Profit Organization",
                                                "Other",
                                            ]}
                                            value={formData.organizationType}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="Year Established"
                                            name="yearEstablished"
                                            type="number"
                                            placeholder="e.g. 2015"
                                            value={formData.yearEstablished}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="Official Email"
                                            name="officialEmail"
                                            type="email"
                                            value={formData.officialEmail}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="Phone Number"
                                            name="phoneNumber"
                                            type="tel"
                                            value={formData.phoneNumber}
                                            onChange={updateField}
                                        />

                                        <div className="md:col-span-2">

                                            <Field
                                                label="Website"
                                                name="website"
                                                required={false}
                                                placeholder="https://www.example.org"
                                                value={formData.website}
                                                onChange={updateField}
                                            />

                                        </div>

                                        <div className="md:col-span-2">

                                            <TextAreaField
                                                label="Organization Description"
                                                name="description"
                                                placeholder="Tell us about your NGO and its mission..."
                                                value={formData.description}
                                                onChange={updateField}
                                            />

                                        </div>

                                    </div>
                                </div>
                            )}

                            {/* =================================
                STEP 2: REPRESENTATIVE DETAILS
            ================================= */}

                            {currentStep === 1 && (

                                <div className="space-y-6">

                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">
                                            2. Representative Details
                                        </h2>

                                        <p className="text-sm text-slate-500 mt-1">
                                            Add the details of the authorized representative.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                        <Field
                                            label="Representative Name"
                                            name="representativeName"
                                            value={formData.representativeName}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="Designation"
                                            name="designation"
                                            value={formData.designation}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="Mobile"
                                            name="representativeMobile"
                                            type="tel"
                                            placeholder="10-digit mobile number"
                                            value={formData.representativeMobile}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="Email"
                                            name="representativeEmail"
                                            type="email"
                                            value={formData.representativeEmail}
                                            onChange={updateField}
                                        />

                                    </div>
                                </div>
                            )}

                            {/* =================================
                STEP 3: LOCATION
            ================================= */}

                            {currentStep === 2 && (

                                <div className="space-y-6">

                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">
                                            3. Organization Location
                                        </h2>

                                        <p className="text-sm text-slate-500 mt-1">
                                            Where is your organization located?
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                        <Field
                                            label="State"
                                            name="state"
                                            value={formData.state}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="District"
                                            name="district"
                                            value={formData.district}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="City"
                                            name="city"
                                            value={formData.city}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="Village"
                                            name="village"
                                            required={false}
                                            value={formData.village}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="Pincode"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="Map Location (Google Maps link or coordinates)"
                                            name="mapLocation"
                                            required={false}
                                            placeholder="Paste map link or coordinates"
                                            value={formData.mapLocation}
                                            onChange={updateField}
                                        />

                                        <div className="md:col-span-2">

                                            <TextAreaField
                                                label="Full Address"
                                                name="address"
                                                placeholder="Enter complete organization address..."
                                                value={formData.address}
                                                onChange={updateField}
                                            />

                                        </div>

                                    </div>

                                    <div className="p-4 rounded-xl bg-gray-50 text-blue-800 text-sm flex gap-3">

                                        <MapPin size={20} className="shrink-0" />

                                        <p>
                                            You can paste your organization's Google Maps share link
                                            in the Map Location field.
                                        </p>

                                    </div>

                                </div>
                            )}

                            {/* =================================
                STEP 4: SERVICES
            ================================= */}

                            {currentStep === 3 && (

                                <div className="space-y-6">

                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">
                                            4. Services Offered
                                        </h2>

                                        <p className="text-sm text-slate-500 mt-1">
                                            Select all services your organization can provide.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                        {serviceOptions.map((service) => (

                                            <label
                                                key={service}
                                                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${formData.services.includes(service)
                                                    ? "border-blue-500 bg-blue-50 text-blue-800"
                                                    : "border-slate-200 hover:border-blue-300"
                                                    }`}
                                            >

                                                <input
                                                    type="checkbox"
                                                    checked={formData.services.includes(service)}
                                                    onChange={() => toggleService(service)}
                                                    className="w-4 h-4 accent-blue-700"
                                                />

                                                <span className="text-sm font-medium">
                                                    {service}
                                                </span>

                                            </label>

                                        ))}

                                    </div>
                                </div>
                            )}

                            {/* =================================
                STEP 5: RESOURCES
            ================================= */}

                            {currentStep === 4 && (

                                <div className="space-y-6">

                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">
                                            5. Available Resources
                                        </h2>

                                        <p className="text-sm text-slate-500 mt-1">
                                            Enter your currently available relief resources and capacity.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                        <Field
                                            label="Available Food (quantity)"
                                            name="food"
                                            required={false}
                                            value={formData.food}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="Water (quantity)"
                                            name="water"
                                            required={false}
                                            value={formData.water}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="Medicines (quantity/details)"
                                            name="medicines"
                                            required={false}
                                            value={formData.medicines}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="Clothes (quantity)"
                                            name="clothes"
                                            required={false}
                                            value={formData.clothes}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="Vehicles (number/details)"
                                            name="vehicles"
                                            required={false}
                                            value={formData.vehicles}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="Rescue Equipment (details)"
                                            name="rescueEquipment"
                                            required={false}
                                            value={formData.rescueEquipment}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="Shelter Capacity (people)"
                                            name="shelterCapacity"
                                            type="number"
                                            required={false}
                                            value={formData.shelterCapacity}
                                            onChange={updateField}
                                        />

                                        <Field
                                            label="Volunteer Count"
                                            name="volunteerCount"
                                            type="number"
                                            required={false}
                                            value={formData.volunteerCount}
                                            onChange={updateField}
                                        />

                                    </div>
                                </div>
                            )}

                            {/* =================================
                STEP 6: DOCUMENT VERIFICATION
            ================================= */}

                            {currentStep === 5 && (

                                <div className="space-y-6">

                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">
                                            6. Document Verification
                                        </h2>

                                        <p className="text-sm text-slate-500 mt-1">
                                            Upload the documents required for NGO verification.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
                                        Upload PDF, JPG or PNG files. Maximum size: 5 MB per file.
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                        {documentFields.map((doc) => {

                                            const uploaded = documents[doc.key];

                                            return (

                                                <div
                                                    key={doc.key}
                                                    className="border border-slate-200 rounded-2xl p-4"
                                                >

                                                    <label className="block text-sm font-semibold text-slate-800 mb-3">
                                                        {doc.label} <span className="text-red-500">*</span>
                                                    </label>

                                                    {!uploaded ? (

                                                        <label className="flex flex-col items-center justify-center min-h-36 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-blue-50 hover:border-blue-400 cursor-pointer transition">

                                                            <Upload size={25} className="text-blue-700 mb-2" />

                                                            <span className="text-sm font-semibold text-slate-700">
                                                                Click to upload
                                                            </span>

                                                            <span className="text-xs text-slate-400 mt-1">
                                                                PDF, JPG or PNG
                                                            </span>

                                                            <input
                                                                type="file"
                                                                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                                                                onChange={(e) =>
                                                                    handleDocumentUpload(e, doc.key)
                                                                }
                                                                className="hidden"
                                                            />

                                                        </label>

                                                    ) : (

                                                        <div className="rounded-xl bg-green-50 border border-green-200 p-3">

                                                            {uploaded.preview ? (

                                                                <img
                                                                    src={uploaded.preview}
                                                                    alt={`${doc.label} preview`}
                                                                    className="w-full h-32 object-contain rounded-lg bg-white mb-3"
                                                                />

                                                            ) : (

                                                                <div className="flex items-center gap-2 text-blue-700 mb-3">
                                                                    <FileText size={30} />

                                                                    <span className="text-xs font-semibold">
                                                                        PDF document
                                                                    </span>
                                                                </div>

                                                            )}

                                                            <div className="flex items-center justify-between gap-2">

                                                                <p className="text-xs text-slate-700 truncate">
                                                                    {uploaded.file.name}
                                                                </p>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeDocument(doc.key)}
                                                                    className="text-red-500 hover:text-red-700"
                                                                    aria-label={`Remove ${doc.label}`}
                                                                >
                                                                    <X size={18} />
                                                                </button>

                                                            </div>

                                                            <p className="text-xs text-green-700 mt-2 font-semibold">
                                                                File selected
                                                            </p>

                                                        </div>

                                                    )}

                                                </div>

                                            );

                                        })}

                                    </div>
                                </div>
                            )}

                            {/* =================================
                STEP 7: ACCOUNT SECURITY
            ================================= */}

                            {currentStep === 6 && (

                                <div className="space-y-6">

                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">
                                            7. Account Security
                                        </h2>

                                        <p className="text-sm text-slate-500 mt-1">
                                            Create a secure password for your NGO account.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                        <div>

                                            <label className={labelClass}>
                                                Password <span className="text-red-500">*</span>
                                            </label>

                                            <div className="relative">

                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={updateField}
                                                    placeholder="Minimum 8 characters"
                                                    className={`${inputClass} pr-12`}
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                                    aria-label="Toggle password visibility"
                                                >
                                                    <Eye size={19} />
                                                </button>

                                            </div>
                                        </div>

                                        <div>

                                            <label className={labelClass}>
                                                Confirm Password <span className="text-red-500">*</span>
                                            </label>

                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={updateField}
                                                placeholder="Re-enter your password"
                                                className={inputClass}
                                            />

                                        </div>

                                    </div>

                                    {/* TERMS AND CONDITIONS */}

                                    <label className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">

                                        <input
                                            type="checkbox"
                                            name="terms"
                                            checked={formData.terms}
                                            onChange={updateField}
                                            className="w-4 h-4 mt-1 accent-blue-700"
                                        />

                                        <span className="text-sm text-slate-600 leading-6">
                                            I agree to the ReliefLinkAI{" "}

                                            <Link
                                                to="/terms"
                                                className="text-blue-700 font-semibold hover:underline"
                                            >
                                                Terms & Conditions
                                            </Link>

                                            {" "}and confirm that the information and documents submitted
                                            by my organization are accurate.
                                        </span>

                                    </label>

                                    {/* VERIFICATION NOTICE */}

                                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex gap-3">

                                        <ShieldCheck size={22} className="text-blue-700 shrink-0" />

                                        <p className="text-sm text-blue-800 leading-6">
                                            Your NGO account will remain in Verification Pending
                                            status until an authorized administrator reviews and
                                            approves your submitted documents.
                                        </p>

                                    </div>

                                </div>
                            )}

                            {/* =================================
                ERROR MESSAGE
            ================================= */}

                            {error && (

                                <div className="mt-6 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                                    {error}
                                </div>

                            )}

                            {/* =================================
                NAVIGATION BUTTONS
            ================================= */}

                            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-9 pt-6 border-t border-slate-100">

                                <button
                                    type="button"
                                    onClick={previousStep}
                                    disabled={currentStep === 0}
                                    className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                >
                                    Previous
                                </button>

                                {currentStep < steps.length - 1 ? (

                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="px-7 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold flex items-center justify-center gap-2 transition"
                                    >
                                        Save & Continue
                                        <ArrowRight size={18} />
                                    </button>

                                ) : (

                                    <button
                                        type="submit"
                                        className="px-7 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center gap-2 transition"
                                    >
                                        <ShieldCheck size={18} />
                                        Submit NGO Registration
                                    </button>

                                )}

                            </div>

                        </form>

                    </div>

                    {/* LOGIN LINK */}

                    <p className="text-center text-sm text-slate-500 mt-6">
                        Already registered?{" "}

                        <Link
                            to="/auth/ngo/login"
                            className="font-bold text-blue-700 hover:underline"
                        >
                            Login as NGO
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );

};

export default NGORegister;
