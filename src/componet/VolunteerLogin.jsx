
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Eye,
    EyeOff,
    ShieldCheck,
    HeartHandshake,
    Mail,
    Siren,
    Lock,
    Phone,
} from "lucide-react";

const VolunteerLogin = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.identifier.trim() || !formData.password) {
            setError("Please enter your mobile number/email and password.");
            return;
        }

        // Connect your volunteer login API here.
        // Verify account status on the backend before granting dashboard access.
        localStorage.setItem("volunteername", formData.identifier);
        navigate("/volunteer/dashboard");
    };

    return (
        <div className="min-h-screen bg-[url(/src/assets/reliefimg.png)] bg-slate-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">

                {/* Back button */}
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

                <div className="bg-white  rounded-3xl mt-15  shadow-xl border border-slate-100 p-6 sm:p-9">

                    <div className="flex justify-center mb-5">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-gray-700 flex items-center justify-center">
                            <HeartHandshake size={35} />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <p className="text-sm font-semibold tracking-wider text-gray-700 mb-2">
                            RELIEFLINKAI VOLUNTEER PORTAL
                        </p>

                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                            Welcome, Volunteer
                        </h1>

                        <p className="text-sm text-slate-500 mt-3 leading-6">
                            Sign in and discover opportunities to make a difference.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Mobile Number / Email
                            </label>

                            <div className="relative">
                                <Phone
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    name="identifier"
                                    value={formData.identifier}
                                    onChange={handleChange}
                                    placeholder="Enter mobile number or email"
                                    autoComplete="username"
                                    required
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Password
                            </label>

                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-700"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 accent-blue-700"
                                />
                                Remember Me
                            </label>

                            <Link
                                to="/auth/volunteer/forgot-password"
                                className="font-semibold text-blue-700 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-lg shadow-blue-200 transition"
                        >
                            Login as Volunteer
                        </button>
                    </form>

                    <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100">
                        <div className="flex gap-3">
                            <ShieldCheck size={20} className="text-blue-700 shrink-0" />
                            <div>
                                <h3 className="text-sm font-bold text-blue-800">
                                    Volunteer Account Verification
                                </h3>
                                <p className="text-xs sm:text-sm text-blue-700 mt-1 leading-5">
                                    Some volunteer activities may require profile verification
                                    or additional training approval before assignment.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-7 text-sm text-slate-600">
                        New to ReliefLinkAI?{" "}
                        <Link
                            to="/auth/volunteer/register"
                            className="font-bold text-blue-700 hover:underline"
                        >
                            Join as a Volunteer
                        </Link>
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-400">
                        <ShieldCheck size={15} />
                        Secure Volunteer Portal
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerLogin;
