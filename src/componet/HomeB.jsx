import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'

const HomeB = () => {

    useGSAP(() => {
        gsap.from(".Hometext,.HomeB", {
            y: 10,
            opacity: 0,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.HomeB',
                start: "top 80%",
                end: "bottom 70%",
                scrub: 3
            }
        })
    })

    return (
        <div className="w-full  lg:mt-0">
            <div
                className="Homebox relative grid w-full
               grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
               gap-4 sm:gap-5 lg:gap-6
               bg-[#092B4C] p-5 sm:p-6 lg:px-15 lg:py-2"
            >
                {/* People Assisted */}
                <div className="HomeB flex flex-col gap-2 p-3 
                    text-white border-l-2 border-white/40">
                    <h1 className="Hometext font-popinB font-bold text-2xl sm:text-2xl">
                        2,486
                    </h1>
                    <h2 className="Hometext font-popinB font-semibold text-base sm:text-xl text-[#acb9be]">
                        People assisted
                    </h2>
                    <h3 className="Hometext font-popinSB font-semibold text-sm sm:text-base text-[#667fd3dc]">
                        +18% this month
                    </h3>
                </div>

                {/* NGOs Connected */}
                <div className="HomeB flex flex-col gap-2 p-3 sm:p-4
                    text-white border-l-2 border-white/40">
                    <h1 className="Hometext font-popinB font-bold text-2xl sm:text-2xl">
                        164
                    </h1>
                    <h2 className="Hometext font-popinB font-semibold text-base sm:text-xl text-[#acb9be]">
                        NGO's Connected
                    </h2>
                    <h3 className="Hometext font-popinSB font-semibold text-sm sm:text-base text-[#667fd3dc]">
                        Across Maharashtra
                    </h3>
                </div>

                {/* Volunteers Active */}
                <div className="HomeB flex flex-col gap-2 p-5 sm:p-4
                    text-white border-l-2 border-white/40">
                    <h1 className="Hometext font-popinB font-bold text-2xl sm:text-2xl">
                        1,208
                    </h1>
                    <h2 className="Hometext font-popinB font-semibold text-base sm:text-xl text-[#acb9be]">
                        Volunteers Active
                    </h2>
                    <h3 className="Hometext font-popinSB font-semibold text-sm sm:text-base text-[#667fd3dc]">
                        Ready to Respond
                    </h3>
                </div>

                {/* Hospitals Connected */}
                <div className="HomeB flex flex-col gap-2 p-3 sm:p-4
                    text-white border-l-2 border-white/40">
                    <h1 className="Hometext font-popinB font-bold text-2xl sm:text-2xl">
                        102
                    </h1>
                    <h2 className="Hometext font-popinB font-semibold text-base sm:text-xl text-[#acb9be]">
                        Hospital Connected
                    </h2>
                    <h3 className="Hometext font-popinSB font-semibold text-sm sm:text-base text-[#667fd3dc]">
                        Emergency Capacity
                    </h3>
                </div>

            </div>
        </div>

    )
}

export default HomeB
