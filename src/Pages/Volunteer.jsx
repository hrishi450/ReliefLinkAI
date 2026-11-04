import React from 'react'
import VolunteerLogin from '../componet/VolunteerLogin'
import VolunteerRegister from '../componet/VolunteerRegistration'

const Volunteer = () => {
    return (
        <div className='bg-[url(/src/assets/reliefimg.png)]'>
            <VolunteerLogin />
            <VolunteerRegister />
        </div>
    )
}

export default Volunteer