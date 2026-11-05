
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Eye, EyeOff } from "lucide-react";
import CitizenLogin from "../componet/CitizenLogin";
import CitizenRegister from "../componet/CitizenRegister";
import CitizenDashboard from "../componet/CitizenDashboard";

const Citizen = () => {
    return (
        <div>
            <CitizenLogin />
            <CitizenRegister />
            <CitizenDashboard />
        </div>
    )
};

export default Citizen;
