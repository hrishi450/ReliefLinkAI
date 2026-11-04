import React, { useState } from 'react'
import { Dot, MoveRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";


const HomeL = () => {

    const navigate = useNavigate();

    gsap.registerPlugin(ScrollTrigger);
    useGSAP(() => {
        const tl = gsap.timeline()
        tl.from('.home-1 h2,.home-1 h3', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.2,
        })
        tl.from('.home-text h1', {
            y: 10,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,

        })
        tl.from('.homeP p', {
            y: 10,
            opacity: 0,
            duration: 0.5,
        })
        tl.from('.homeBottom button,.homeBottom h3,.Avatar', {
            y: 10,
            opacity: 0,
            duration: 0.5,
            style: '',
            stagger: 0.2,
        })
        // tl.from(".Avatar", {
        //     y: 10,
        //     duration: 0.5,
        //     opacity: 0,
        //     scrollTrigger: {
        //         trigger: ".Avatar",
        //         start: "top 90%",
        //         end: "bottom 80%",
        //         scrub: true
        //     }
        // })

    })
    return (
        <div className='
    h-[120vh] lg:h-[100vh] w-full lg:w-1/2
    bg-[#F3F8FB]
    p-6 sm:p-8 md:p-10 lg:p-15
    z-90 relative
'>



            <div className='
        home-1 flex items-center
        h-auto min-h-9
        relative z-10
    '>

                <h2 className='uppercase text-[12px] font-bold shrink-0'>
                    <Dot
                        size={40}
                        color="#2AA66D"
                        strokeWidth={2}
                    />
                </h2>

                <h3 className='
            text-[#1261A0]
            uppercase
            text-[0.65rem] sm:text-[0.7rem] md:text-[0.8rem]
            font-bold
            leading-tight
        '>
                    Maharashtra emergency coordination network
                </h3>

            </div>

            <div className='
        home-text
        text-[#092B4C]
        font-popin-EB
        w-full
        py-2
        leading-tight
        relative z-10
    '>

                <h1 className='
            text-[2.2rem]
            sm:text-[5rem]
            md:text-[3rem]
            lg:text-[3.6rem]
            font-extrabold
        '>
                    One platform.
                    <span className='text-[#C93D3D]'>
                        {' '}Every emergency.
                    </span>
                    {' '}Faster relief.
                </h1>
            </div>
            <div className='
        homeP
        text-[#092B4C]
        font-popin-EB
        w-full
        px-0 sm:px-2
        relative z-10
    '>
                <p className='
            text-[#092B4C]
            text-base
            sm:text-lg
            md:text-xl
            leading-relaxed
        '>
                    ReliefLinkAI connects people in crisis with nearby
                    responders, resources and medical care — making every
                    minute count.
                </p>
            </div>
            <div className='
        homeBottom
        flex
        flex-col
        sm:flex-row
        gap-4 sm:gap-5
        mt-6 sm:mt-8
        items-stretch sm:items-center
        text-[#092B4C]
        px-0 sm:px-2
        relative z-10
    
    '>

                <button onClick={() => navigate("/login")}

                    className='
            bg-gray-800
            text-white
            w-full 
            sm:w-1/2
            rounded-lg
            flex items-center justify-center
            gap-2
            py-3
            px-5
            font-popinSB
            text-base sm:text-lg md:text-xl
            active:scale-95
            transition-transform
        '>
                    Register Now  <span className='mt-1'>
                        <MoveRight />
                    </span>

                </button>

                <h3 onClick={() => navigate("/login")}
                    className='
            p-3 bg-blue-600 text-white rounded-xl font-semibold" 
            text-base sm:text-5xl lg:text-xl md:text-5xl
            flex items-center
            justify-center 
            sm:mt-3 lg:mt-4 sm:w-full lg:w-1/2
        '>
                    Sign In

                    <span className='mt-1 ml-2'>
                        <MoveRight />
                    </span>
                </h3>
            </div>

            <div className='
        Avatar
        flex
        flex-col
        sm:flex-row
        items-start sm:items-center
        gap-3 sm:gap-4
        lg:mt-6 mb-1
        ml-0 sm:ml-2
        relative z-10
    '>

                <div className='flex items-center mt-2 -space-x-2'>

                    <div className='
                w-9 h-9
                sm:w-10 sm:h-10
                rounded-full
                bg-cyan-200
                border-2 border-white
                flex items-center justify-center
                font-semibold
                text-xs sm:text-sm
                text-slate-700
            '>
                        SK
                    </div>

                    <div className='
                w-9 h-9
                sm:w-10 sm:h-10
                rounded-full
                bg-orange-200
                border-2 border-white
                flex items-center justify-center
                font-semibold
                text-xs sm:text-sm
                text-slate-700
            '>
                        PM
                    </div>

                    <div className='
                w-9 h-9
                sm:w-10 sm:h-10
                rounded-full
                bg-blue-200
                border-2 border-white
                flex items-center justify-center
                font-semibold
                text-xs sm:text-sm
                text-slate-700
            '>
                        AR
                    </div>

                    <div className='
                w-9 h-9
                sm:w-10 sm:h-10
                rounded-full
                bg-slate-700
                border-2 border-white
                flex items-center justify-center
                font-semibold
                text-xs sm:text-sm
                text-white
            '>
                        +
                    </div>

                </div>


                <div>

                    <h3 className='
                text-sm
                sm:text-md
                font-semibold
                text-slate-800
            '>
                        Trusted by 1,208 volunteers
                    </h3>

                    <p className='mt-1 text-xs sm:text-sm text-slate-500
            '>
                        Coordinating relief across 18 districts
                    </p>

                </div>
            </div>


            <div className='lg:invisible md:h-screen sm:h-screen homeR'>
                <div
                    className="w-full mt-12 mb-12  lg:mb-0 lg:w-1/2 flex items-center justify-center
             px-4 sm:px-6 lg:px-4 z-[90]"
                >
                    <div
                        className=" relative flex w-full max-w-[440px]
               min-h-[280px] sm:min-h-[360px] lg:min-h-[440px] 
               bg-[rgb(251,251,251)] rounded-2xl
               p-4 sm:p-5 shadow-sm"
                    >
                        <div className="flex flex-col w-full min-w-0">

                            {/* Header */}
                            <div className="flex items-center justify-between gap-3 mb-4">
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-500"></span>

                                    <h1 className="text-sm sm:text-base font-semibold text-[#092B4C]">
                                        Live response map
                                    </h1>
                                </div>

                                <h2 className="shrink-0 text-[10px] sm:text-xs text-[#363f47ee]">
                                    Update Just Now
                                </h2>
                            </div>

                            {/* Map Image */}
                            <div className="w-full flex-1 min-h-0">
                                <img
                                    src="/src/assets/map.png"
                                    className="block w-full h-full min-h-[220px] sm:min-h-[280px]
                     lg:min-h-[340px] object-cover rounded-xl"
                                    alt="Live response map"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomeL
