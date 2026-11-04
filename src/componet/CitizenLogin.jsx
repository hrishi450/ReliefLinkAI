import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Eye, EyeOff, Siren } from "lucide-react";
const CitizenLogin = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        identity: "",
        password: "",
        remember: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Connect your login API here.
        // Navigate only after the backend confirms successful login.
        localStorage.setItem("citizenName", formData.identity); // Store the identity in localStorage
        navigate("/citizen/dashboard");

    };

    return (
        <main className="relative flex min-h-screen items-center justify-center bg-[#F4F7FC] px-4 py-20 sm:px-6">

            {/* Back to Home */}
            <button
                onClick={() => navigate("/")}
                className="absolute left-4 top-5 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-x-1 hover:text-blue-600 sm:left-8 sm:top-8"
            >
                <ArrowLeft size={18} />
                Back to Home
            </button>
            <header className=" absolute right-0 lg:right-5 top-5 mb-12 flex items-center justify-end sm:mb-16">
                <div className=" gap-3">
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
            <div className="w-full mt-8 max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-9">

                {/* Logo */}
                <div className="mb-7 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">

                        <ShieldCheck size={30} />
                    </div>

                    <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                        Welcome Back, Citizen
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        Sign in to manage your emergency requests and stay connected with
                        relief assistance.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Mobile Number or Email
                        </label>

                        <input
                            type="text"
                            name="identity"
                            value={formData.identity}
                            onChange={handleChange}
                            placeholder="Enter mobile number or email"
                            required
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                        <label className="flex cursor-pointer items-center gap-2 text-slate-600">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={formData.remember}
                                onChange={handleChange}
                                className="h-4 w-4 accent-blue-600"
                            />
                            Remember Me
                        </label>

                        <Link
                            to="/auth/citizen/forgot-password"
                            className="font-semibold text-blue-600 hover:text-blue-800"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl   bg-gray-800
            text-white py-3 font-bold shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
                    >
                        Login as Citizen
                    </button>
                </form>

                {/* Registration link */}
                <div className="mt-7 border-t border-slate-100 pt-6 text-center">
                    <p className="text-sm text-slate-500">
                        Don't have a Citizen account?
                    </p>

                    <button
                        onClick={() => navigate("/auth/citizen/register")}
                        className="mt-2 font-bold text-blue-600 hover:text-blue-800"
                    >
                        Create Citizen Account
                    </button>
                </div>

                <p className="mt-6 text-center text-xs text-slate-400">
                    Secure Citizen Access · ReliefLinkAI
                </p>
            </div>
        </main>
    );
}

export default CitizenLogin