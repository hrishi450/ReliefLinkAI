import React, { useRef } from 'react'
import { Siren, Users, Hospital, ChevronRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
const HomeR = () => {

    const rightBox = useRef()

    gsap.registerPlugin(ScrollTrigger);
    useGSAP(() => {
        gsap.from(rightBox.current, {
            x: 100,
            duration: 0.5,
            scrollTrigger: {
                trigger: rightBox.current,
                start: "top 30%",
                end: "bottom 50%",
                scrub: 1,
            }
        })
    })
    return (
        <div
            ref={rightBox}
            className="w-full h-full  lg:w-1/2 flex items-center justify-center
             px-4 sm:px-6 lg:px-4"
        >
            <div
                className="RightBox relative flex w-full max-w-[440px]
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
    )
}

export default HomeR
