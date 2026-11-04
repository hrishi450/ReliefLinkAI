import React from 'react'
import { Minus } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    House,
    Building2,
    Hospital,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";
const About = () => {
    // About Text Animation
    const AboutText = useRef();
    const AboutCard = useRef();
    useGSAP(
        () => {

            gsap.from(AboutText.current, {
                y: 200,
                opacity: 0,
                stagger: 0.18,
                scrollTrigger: {
                    trigger: AboutText.current,
                    start: "top 110%",
                    end: "top 80%",
                    scrub: 3,
                },
            });

            // About Card Animation
            gsap.from(AboutCard.current, {
                y: 50,
                opacity: 0,
                duration: 1,

                scrollTrigger: {
                    trigger: AboutText.current,
                    start: "top 60%",
                    end: "bottom 80%",
                    scrub: 2,
                },
            });
        }
    )

    const roles = [
        {
            title: "Citizens",
            description:
                "Request help in seconds and follow your response in real time.",
            icon: House,
            iconBg: "bg-sky-100",
            iconColor: "text-sky-700",
        },
        {
            title: "NGOs & responders",
            description:
                "Find nearby requests, mobilize teams and manage resources.",
            icon: Building2,
            iconBg: "bg-pink-100",
            iconColor: "text-pink-700",
        },
        {
            title: "Hospitals",
            description:
                "Share emergency capacity and coordinate incoming patients.",
            icon: Hospital,
            iconBg: "bg-cyan-100",
            iconColor: "text-cyan-700",
        },
        {
            title: "Authorities",
            description:
                "Monitor the network and direct resources where they matter most.",
            icon: ShieldCheck,
            iconBg: "bg-slate-200",
            iconColor: "text-slate-700",
        },
    ];
    return (
        <div ref={AboutText}

            className='h-screen w-full lg:mt-0 md:mt-0 mt-0'>
            <div
                className='h-[50vh]  flex flex-col items-center justify-center '>
                <div className='flex pr-8'>
                    <Minus color="#C93D3D " />
                    <h1 className='text-[#1261A0] font-popinB font-bold uppercase'> One connected network</h1>
                </div>
                <div className='flex flex-col items-center justify-center p-0 leading-11'>
                    <h3 className=' text-[#092B4C] font-popinB font-[400]  text-[2.5rem]'>When crisis strikes,
                    </h3>
                    <h3 className='text-[#C93D3D] font-popinB font-[400] lg:text-[2.5rem] md:text-12rem text-[2rem]'>coordination saves lives.</h3>
                </div>
                <div className='w-[90vw] lg:w-[50vw] md:w-[70vw] text-center text-gray-500 mt-4'>
                    <p>From the first emergency call to the final delivery of aid, ReliefLinkAI brings every person, organization and resource into one clear view.</p>
                </div>
            </div>
            <div className='  flex items-center'>
                <div ref={AboutCard} className="grid grid-cols-1 gap-5 p-3 lg:pl-20 sm:grid-cols-2 xl:grid-cols-4">

                    {roles.map((role, index) => {
                        const Icon = role.icon;
                        return (
                            <div
                                key={index}
                                className="group h-[230px] lg:w-[280px] w-full rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl sm:p-7"
                            >
                                {/* Icon */}
                                <div
                                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${role.iconBg}`}
                                >
                                    <Icon
                                        size={23}
                                        strokeWidth={1.8}
                                        className={role.iconColor}
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="mb-3 text-lg font-semibold text-slate-800 sm:text-xl">
                                    {role.title}
                                </h3>

                                {/* Description */}
                                <p className="min-h-[52px] text-sm leading-6 text-slate-500">
                                    {role.description}
                                </p>

                                {/* Learn More */}
                                <button className=" inline-flex items-center gap-2 text-sm font-bold text-slate-700 transition-colors duration-300 hover:text-blue-600">
                                    Learn more
                                    <ArrowRight
                                        size={17}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div >
    )
}
export default About