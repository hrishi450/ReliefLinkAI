
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    UserRound,
    Upload,
    X,
    Eye,
    EyeOff,
    ShieldCheck,
    HeartHandshake,
    Siren,
    CheckCircle2,
    Camera,
} from "lucide-react";

// ----------------------------------
// SKILLS OPTIONS
// ----------------------------------

const skillOptions = [
    "First Aid",
    "Medical Assistance",
    "Rescue",
    "Driving",
    "Food Distribution",
    "Search & Rescue",
    "Logistics",
    "Counselling",
    "Communication",
    "Technical Support",
];

// ----------------------------------
// REUSABLE INPUT COMPONENTS
// Keep outside VolunteerRegister
// ----------------------------------

const inputClass =
    "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition";

const labelClass =
    "block text-sm font-semibold text-slate-700 mb-2";

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
            {label}
            {required && <span className="text-red-500"> *</span>}
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
    value,
    onChange,
    placeholder,
    required = false,
}) => (
    <div>
        <label className={labelClass}>
            {label}
            {required && <span className="text-red-500"> *</span>}
        </label>

        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={3}
            className={`${inputClass} resize-y`}
        />
    </div>
);

const SelectField = ({
    label,
    name,
    value,
    onChange,
    options,
    required = true,
}) => (
    <div>
        <label className={labelClass}>
            {label}
            {required && <span className="text-red-500"> *</span>}
        </label>

        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={inputClass}
        >
            <option value="">Select {label}</option>

            {options.map((option) => (
                <option key={option.value || option} value={option.value || option}>
                    {option.label || option}
                </option>
            ))}
        </select>
    </div>
);

// ----------------------------------
// INITIAL FORM DATA
// ----------------------------------

const initialForm = {
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",

    state: "",
    district: "",
    city: "",
    village: "",
    address: "",

    skills: [],
    experience: "",
    languages: "",
    availability: "",

    emergencyContact: "",
    vehicleAvailability: "",
    vehicleType: "",
    emergencyTraining: "",
    trainingDetails: "",

    terms: false,
};

// ==================================
// VOLUNTEER REGISTRATION
// ==================================

const VolunteerRegister = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialForm);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Clean up the preview URL when the image changes or page unmounts.
    useEffect(() => {
        return () => {
            if (photoPreview) {
                URL.revokeObjectURL(photoPreview);
            }
        };
    }, [photoPreview]);

    // ----------------------------------
    // HANDLE INPUT CHANGES
    // ----------------------------------

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setError("");
    };

    // ----------------------------------
    // HANDLE PROFILE PHOTO
    // ----------------------------------

    const handlePhotoUpload = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!["image/jpeg", "image/png"].includes(file.type)) {
            setError("Please upload a JPG or PNG profile photo.");
            e.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setError("Profile photo must be smaller than 2 MB.");
            e.target.value = "";
            return;
        }

        setProfilePhoto(file);
        setPhotoPreview(URL.createObjectURL(file));
        setError("");

        e.target.value = "";
    };

    const removePhoto = () => {
        setProfilePhoto(null);
        setPhotoPreview("");
    };

    // ----------------------------------
    // HANDLE MULTIPLE SKILLS
    // ----------------------------------

    const toggleSkill = (skill) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter((item) => item !== skill)
                : [...prev.skills, skill],
        }));

        setError("");
    };

    // ----------------------------------
    // FORM VALIDATION
    // ----------------------------------

    const validateForm = () => {
        const requiredFields = [
            "fullName",
            "mobile",
            "email",
            "password",
            "confirmPassword",
            "state",
            "district",
            "city",
            "address",
            "experience",
            "languages",
            "availability",
            "emergencyContact",
            "vehicleAvailability",
            "emergencyTraining",
        ];

        const missingField = requiredFields.some(
            (field) => !String(formData[field]).trim()
        );

        if (missingField) {
            setError("Please fill in all required fields.");
            return false;
        }

        if (!/^[0-9]{10}$/.test(formData.mobile)) {
            setError("Enter a valid 10-digit mobile number.");
            return false;
        }

        if (!/^[0-9]{10}$/.test(formData.emergencyContact)) {
            setError("Enter a valid 10-digit emergency contact number.");
            return false;
        }

        if (formData.password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }

        if (formData.skills.length === 0) {
            setError("Please select at least one volunteer skill.");
            return false;
        }

        if (formData.vehicleAvailability === "Yes" && !formData.vehicleType.trim()) {
            setError("Please enter your vehicle type.");
            return false;
        }

        if (!formData.terms) {
            setError("Please accept the Terms & Conditions.");
            return false;
        }

        setError("");
        return true;
    };

    // ----------------------------------
    // SUBMIT REGISTRATION
    // ----------------------------------

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // FRONTEND DEMO ONLY
        // Connect your backend API here.
        // Send formData and profilePhoto using FormData.
        // Backend should save the account with status PENDING
        // if your system requires volunteer verification.
        localStorage.setItem("volunteername", formData.fullName);
        navigate("/volunteer/dashboard");
        setSubmitted(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // ==================================
    // REGISTRATION SUCCESS SCREEN
    // ==================================

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">

                <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-100 p-7 sm:p-10 text-center">

                    <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={44} />
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        Registration Successful!
                    </h1>

                    <p className="text-slate-500 mt-4 leading-7">
                        Thank you for joining ReliefLinkAI. Your volunteer registration
                        has been submitted successfully.
                    </p>

                    <div className="mt-7 p-5 bg-amber-50 border border-amber-200 rounded-2xl text-left">
                        <p className="text-sm text-amber-800 font-semibold">
                            Account Status
                        </p>

                        <p className="text-xl font-bold text-amber-700 mt-2">
                            Verification Pending
                        </p>

                        <p className="text-sm text-amber-700 mt-2 leading-6">
                            Your profile may require review by an authorized administrator.
                            You will be able to access activities according to your
                            verification and training status.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/auth/volunteer/login")}
                        className="w-full mt-7 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition"
                    >
                        Go to Volunteer Login
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

    // ==================================
    // MAIN REGISTRATION PAGE
    // ==================================

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-3 sm:px-6 lg:px-8">

            <div className="max-w-5xl mx-auto">

                {/* BACK BUTTON */}
                <button
                    onClick={() => navigate("/login")}
                    className="absolute left-4 top-5 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-x-1 hover:text-blue-600 sm:left-8 sm:top-8"
                >
                    <ArrowLeft size={18} />
                    Back to Role
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

                {/* PAGE HEADING */}

                <div className="text-center mt-15 mb-8">

                    <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 text-gray-700 flex items-center justify-center mb-4">
                        <HeartHandshake size={34} />
                    </div>

                    <p className="text-sm font-bold tracking-wider text-gray-700">
                        RELIEFLINKAI VOLUNTEER PORTAL
                    </p>

                    <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-3">
                        Become a Relief Volunteer
                    </h1>

                    <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-500 mt-3 leading-7">
                        Your skills and willingness to help can make a real difference
                        during emergencies.
                    </p>

                </div>

                {/* REGISTRATION FORM CARD */}

                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

                    <form onSubmit={handleSubmit} className="p-5 sm:p-8 lg:p-10">

                        {/* =================================
                PERSONAL INFORMATION
            ================================= */}

                        <div className="mb-10">

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-gray-700 flex items-center justify-center">
                                    <UserRound size={21} />
                                </div>

                                <div>
                                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                                        Personal Information
                                    </h2>
                                    <p className="text-xs sm:text-sm text-slate-500">
                                        Tell us about yourself.
                                    </p>
                                </div>
                            </div>

                            {/* PROFILE PHOTO */}

                            <div className="flex flex-col sm:flex-row items-center gap-5 mb-7 p-5 rounded-2xl bg-slate-50 border border-slate-100">

                                <div className="relative w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-sm shrink-0">

                                    {photoPreview ? (
                                        <img
                                            src={photoPreview}
                                            alt="Volunteer profile preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Camera size={32} className="text-blue-700" />
                                    )}

                                </div>

                                <div className="text-center sm:text-left flex-1">
                                    <h3 className="text-sm font-bold text-slate-800">
                                        Profile Photo
                                    </h3>

                                    <p className="text-xs text-slate-500 mt-1">
                                        Upload a clear JPG or PNG image. Maximum size 2 MB.
                                    </p>

                                    <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">

                                        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 cursor-pointer transition">
                                            <Upload size={15} />
                                            Upload Photo

                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png"
                                                onChange={handlePhotoUpload}
                                                className="hidden"
                                            />
                                        </label>

                                        {photoPreview && (
                                            <button
                                                type="button"
                                                onClick={removePhoto}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 transition"
                                            >
                                                <X size={15} />
                                                Remove
                                            </button>
                                        )}

                                    </div>
                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <Field
                                    label="Full Name"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />

                                <Field
                                    label="Mobile Number"
                                    name="mobile"
                                    type="tel"
                                    placeholder="10-digit mobile number"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                />

                                <Field
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                <div>
                                    <label className={labelClass}>
                                        Password <span className="text-red-500">*</span>
                                    </label>

                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Minimum 8 characters"
                                            autoComplete="new-password"
                                            className={`${inputClass} pr-12`}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                            aria-label="Toggle password visibility"
                                        >
                                            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Confirm Password <span className="text-red-500">*</span>
                                    </label>

                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Re-enter password"
                                            autoComplete="new-password"
                                            className={`${inputClass} pr-12`}
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword((prev) => !prev)
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                            aria-label="Toggle confirm password visibility"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff size={19} />
                                            ) : (
                                                <Eye size={19} />
                                            )}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* =================================
                LOCATION INFORMATION
            ================================= */}

                        <div className="mb-10 pt-8 border-t border-slate-100">

                            <div className="mb-6">
                                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                                    Location Information
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                    Where are you available to help?
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <Field
                                    label="State"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="Enter state"
                                />

                                <Field
                                    label="District"
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    placeholder="Enter district"
                                />

                                <Field
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                />

                                <Field
                                    label="Village"
                                    name="village"
                                    required={false}
                                    value={formData.village}
                                    onChange={handleChange}
                                />

                                <div className="md:col-span-2">
                                    <TextAreaField
                                        label="Full Address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter your complete address"
                                        required
                                    />
                                </div>

                            </div>
                        </div>

                        {/* =================================
                SKILLS AND EXPERIENCE
            ================================= */}

                        <div className="mb-10 pt-8 border-t border-slate-100">

                            <div className="mb-6">
                                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                                    Skills & Experience
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                    Select the skills you can contribute during emergencies.
                                </p>
                            </div>

                            <div className="mb-6">

                                <label className={labelClass}>
                                    Volunteer Skills <span className="text-red-500">*</span>
                                </label>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

                                    {skillOptions.map((skill) => (

                                        <label
                                            key={skill}
                                            className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition ${formData.skills.includes(skill)
                                                ? "border-blue-500 bg-blue-50 text-blue-800"
                                                : "border-slate-200 hover:border-blue-300"
                                                }`}
                                        >

                                            <input
                                                type="checkbox"
                                                checked={formData.skills.includes(skill)}
                                                onChange={() => toggleSkill(skill)}
                                                className="w-4 h-4 accent-blue-700"
                                            />

                                            <span className="text-sm font-medium">
                                                {skill}
                                            </span>

                                        </label>

                                    ))}

                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <SelectField
                                    label="Experience"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    options={[
                                        "No Experience",
                                        "Less than 1 Year",
                                        "1-2 Years",
                                        "3-5 Years",
                                        "More than 5 Years",
                                    ]}
                                />

                                <Field
                                    label="Languages"
                                    name="languages"
                                    value={formData.languages}
                                    onChange={handleChange}
                                    placeholder="e.g. English, Hindi, Marathi"
                                />

                                <SelectField
                                    label="Availability"
                                    name="availability"
                                    value={formData.availability}
                                    onChange={handleChange}
                                    options={[
                                        "Full Time",
                                        "Part Time",
                                        "Weekends Only",
                                        "Emergency Calls Only",
                                        "Flexible",
                                    ]}
                                />

                                <Field
                                    label="Emergency Contact"
                                    name="emergencyContact"
                                    type="tel"
                                    value={formData.emergencyContact}
                                    onChange={handleChange}
                                    placeholder="10-digit emergency contact"
                                />

                            </div>
                        </div>

                        {/* =================================
                VEHICLE AND TRAINING
            ================================= */}

                        <div className="mb-10 pt-8 border-t border-slate-100">

                            <div className="mb-6">
                                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                                    Vehicle & Emergency Training
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                    Share additional resources and training information.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <SelectField
                                    label="Vehicle Availability"
                                    name="vehicleAvailability"
                                    value={formData.vehicleAvailability}
                                    onChange={handleChange}
                                    options={["Yes", "No"]}
                                />

                                {formData.vehicleAvailability === "Yes" && (
                                    <Field
                                        label="Vehicle Type"
                                        name="vehicleType"
                                        value={formData.vehicleType}
                                        onChange={handleChange}
                                        placeholder="e.g. Bike, Car, Van, Ambulance"
                                    />
                                )}

                                <SelectField
                                    label="Emergency Training"
                                    name="emergencyTraining"
                                    value={formData.emergencyTraining}
                                    onChange={handleChange}
                                    options={[
                                        { label: "Yes - Certified Training", value: "Certified" },
                                        { label: "Yes - Informal Training", value: "Informal" },
                                        { label: "Currently Learning", value: "Learning" },
                                        { label: "No Training", value: "No" },
                                    ]}
                                />

                                <div className="md:col-span-2">
                                    <TextAreaField
                                        label="Training Details"
                                        name="trainingDetails"
                                        value={formData.trainingDetails}
                                        onChange={handleChange}
                                        placeholder="Mention your certifications or emergency training details..."
                                    />
                                </div>

                            </div>
                        </div>

                        {/* =================================
                TERMS AND CONDITIONS
            ================================= */}

                        <div className="pt-8 border-t border-slate-100">

                            <label className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">

                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    className="w-4 h-4 mt-1 accent-blue-700"
                                />

                                <span className="text-sm text-slate-600 leading-6">
                                    I agree to the ReliefLinkAI{" "}
                                    <Link
                                        to="/terms"
                                        className="text-blue-700 font-semibold hover:underline"
                                    >
                                        Terms & Conditions
                                    </Link>{" "}
                                    and confirm that the information provided is accurate.
                                </span>

                            </label>

                            <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-100 flex gap-3">

                                <ShieldCheck size={22} className="text-blue-700 shrink-0" />

                                <p className="text-sm text-blue-800 leading-6">
                                    Your profile may require administrator verification.
                                    Emergency activities requiring specific qualifications
                                    will be assigned only after the necessary checks.
                                </p>

                            </div>

                        </div>

                        {/* ERROR MESSAGE */}

                        {error && (
                            <div className="mt-6 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        {/* SUBMIT BUTTON */}

                        <div className="mt-9 pt-6 border-t border-slate-100">

                            <button
                                type="submit"
                                className="w-full sm:w-auto sm:min-w-64 px-8 py-4 rounded-xl bg-gray-800 active:scale-95 hover:bg-gray-900 text-white font-semibold flex items-center justify-center gap-3 transition shadow-lg shadow-blue-100"
                            >
                                <HeartHandshake size={19} />
                                Register as Volunteer
                            </button>

                        </div>

                    </form>
                </div>

                {/* LOGIN LINK */}

                <p className="text-center text-sm text-slate-500 mt-6">
                    Already registered?{" "}
                    <Link
                        to="/auth/volunteer/login"
                        className="font-bold text-blue-700 hover:underline"
                    >
                        Login as Volunteer
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default VolunteerRegister;
