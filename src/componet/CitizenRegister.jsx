
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Eye, EyeOff, Siren } from "lucide-react";

const CitizenRegister = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
        state: "",
        district: "",
        city: "",
        address: "",
        emergencyContact: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Password and Confirm Password do not match.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        // Connect your registration API here.
        // Navigate to the dashboard only after successful registration.
        localStorage.setItem("citizenName", formData.fullName);
        navigate("/citizen/dashboard");

        // Example after successful API response:
        // navigate("/citizen/dashboard");
    };

    const inputClass =
        "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

    const labelClass =
        "mb-2 block text-sm font-semibold text-slate-700";

    return (
        <main className="relative min-h-screen bg-[#F4F7FC] px-4 py-20 sm:px-6">

            {/* Back button */}
            <button
                onClick={() => navigate("/login")}
                className="absolute left-4 top-5 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-x-1 hover:text-blue-600 sm:left-8 sm:top-8"
            >
                <ArrowLeft size={18} />
                Back to Roles
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
            <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-9 lg:p-11">

                {/* Heading */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                        <ShieldCheck size={30} />
                    </div>

                    <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                        Create Your Citizen Account
                    </h1>

                    <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
                        Register to access emergency assistance and track your requests.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-7">

                    {/* Personal Information */}
                    <section>
                        <h2 className="mb-5 border-b border-slate-100 pb-3 text-lg font-bold text-slate-800">
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            <div className="sm:col-span-2">
                                <label className={labelClass}>Full Name *</label>
                                <input
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Mobile Number *</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="Enter mobile number"
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Password *</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Minimum 8 characters"
                                        minLength={8}
                                        className={`${inputClass} pr-12`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    >
                                        {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Confirm Password *</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        className={`${inputClass} pr-12`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    >
                                        {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Location Information */}
                    <section>
                        <h2 className="mb-5 border-b border-slate-100 pb-3 text-lg font-bold text-slate-800">
                            Location Information
                        </h2>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            <div>
                                <label className={labelClass}>State *</label>
                                <input
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="Enter your state"
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className={labelClass}>District *</label>
                                <input
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    placeholder="Enter your district"
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className={labelClass}>City / Village *</label>
                                <input
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Enter city or village"
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className={labelClass}>Full Address *</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="House number, street, landmark..."
                                    rows={3}
                                    className={`${inputClass} resize-none`}
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    {/* Emergency Contact */}
                    <section>
                        <h2 className="mb-5 border-b border-slate-100 pb-3 text-lg font-bold text-slate-800">
                            Emergency Contact
                        </h2>

                        <div>
                            <label className={labelClass}>
                                Emergency Contact Number
                            </label>

                            <input
                                type="tel"
                                name="emergencyContact"
                                value={formData.emergencyContact}
                                onChange={handleChange}
                                placeholder="Enter alternate contact number"
                                pattern="[0-9]{10}"
                                maxLength={10}
                                className={inputClass}
                            />

                            <p className="mt-2 text-xs text-slate-400">
                                Provide a trusted person's mobile number for emergency
                                communication.
                            </p>
                        </div>
                    </section>

                    {/* Error message */}
                    {error && (
                        <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">
                            {error}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
                    >
                        Create Account
                    </button>

                    <p className="text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/auth/citizen/login")}
                            className="font-bold text-blue-600 hover:text-blue-800"
                        >
                            Login Here
                        </button>
                    </p>

                </form>
            </div>
        </main>
    );
};

export default CitizenRegister;
