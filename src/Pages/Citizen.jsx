
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Eye, EyeOff } from "lucide-react";
import CitizenLogin from "../componet/CitizenLogin";
import CitizenRegister from "../componet/CitizenRegister";
import CitizenDashboard from "../componet/CItizenDashboard";

const Citizen = () => {
    return (
        <div>
            <CitizenLogin />
            <CitizenRegister />

        </div>
    )
};

export default Citizen;
