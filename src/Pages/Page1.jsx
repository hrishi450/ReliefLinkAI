import React from 'react'
import HomeL from '../componet/HomeL'
import HomeR from '../componet/HomeR'
import HomeB from '../componet/HomeB'
import { Siren, Users, Hospital, ChevronRight, ArrowRight } from 'lucide-react'


const Page1 = () => {
    return (
        <div className=' bg-[url(/src/assets/reliefimg.png)] overflow-hidden relative flex flex-wrap items-center'>
            <HomeL />
            <HomeR />
        </div>
    )
}

export default Page1
