import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Eye,
    EyeOff,
    ShieldCheck,
    Building2,
    Mail,
    Lock,
    Clock,
    Siren,
} from "lucide-react";

const NGOLogin = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Connect your NGO login API here.
        // Do not mark an NGO as verified from the frontend.
        navigate("/ngo/dashboard");
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
                <header className=" absolute right-0 lg:right-5 top-6 mb-12 flex items-center justify-end sm:mb-16">
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

                {/* Login Card */}
                <div className="bg-white rounded-3xl mt-12 shadow-xl border border-slate-100 p-4 sm:p-9">

                    {/* Logo / Icon */}
                    <div className="flex justify-center gap-2 items-center mb-2">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-gray-700 flex items-center justify-center">
                            <Building2 size={32} />
                        </div>
                        <p className="text-sm text-center mt-2 font-semibold text-gray-700 mb-2">
                            NGO PORTAL
                        </p>
                    </div>
                    <div className="text-center mb-2">

                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                            NGO Partner Login
                        </h1>

                        <p className="text-sm text-slate-500 mt-3 leading-6">
                            Access your organization dashboard and coordinate emergency
                            relief operations.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Official Email */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Official Email
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="organization@example.com"
                                    required
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                />
                            </div>
                        </div>

                        {/* Password */}
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
                                    required
                                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-700"
                                >
                                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember / Forgot */}
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
                                to="/auth/ngo/forgot-password"
                                className="font-semibold text-blue-700 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login button */}
                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl bg-gray-800 hover:bg-gray-900 active:scale-95 text-white font-semibold shadow-lg shadow-blue-200 transition"
                        >
                            Login as NGO
                        </button>
                    </form>

                    {/* Register link */}
                    <div className="text-center mt-7 text-sm text-slate-600">
                        Don't have an NGO account?{" "}
                        <Link
                            to="/auth/ngo/register"
                            className="font-bold text-blue-700 hover:underline"
                        >
                            Register Your Organization
                        </Link>
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-400">
                        <ShieldCheck size={15} />
                        Secure NGO Partner Portal
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NGOLogin;