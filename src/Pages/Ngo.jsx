import React from 'react'
import NGOLogin from '../componet/NGOLogin'
import NGORegister from '../componet/NGORegister'

const Ngo = () => {
    return (
        <div className=' h-full w-full bg-gray-900'>
            <NGOLogin />
            <NGORegister />
        </div>
    )
}

export default Ngo