import React from 'react'
import {TbError404} from 'react-icons/tb'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const data = useLocation()
    const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-5 justify-center items-center bg-white top-0 fixed z-30 w-screen h-screen'>
        <div className='font-poppins  text-3xl flex items-center'style={{textShadow: '3px 2px 3px black'}}>{<TbError404 className='text-[50px]' />} : Page Not Found</div>
        <button onClick={()=>navigate('/')} className='border-2 border-black shadow-lg  py-1 px-6 rounded transition  font-poppins text-xl btnShadow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none '>Go Back</button>
    </div>
  )
}

export default NotFoundPage