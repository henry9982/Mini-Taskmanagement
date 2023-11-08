import React from 'react'
import { getSingleTask } from '../Api'
import { useState } from 'react'
import { useEffect } from 'react'
import {useParams } from 'react-router-dom'
import {BsClockHistory} from 'react-icons/bs'
import {PiSubtitlesLight} from 'react-icons/pi'
import { data } from 'autoprefixer'
import {Link} from 'react-router-dom'
import Load from '../loader/Load'

const Detail = () => {
    const {id} = useParams()
    const [task,setTask] = useState()
    const getData = async()=>{
        const {data} = await getSingleTask(id)
        console.log(data);
        setTask(data)
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <>
        {task===undefined?<Load/>:    <div className={`${task?.title===''&&task?.description===''?'w-fit':'md:w-2/3 w-4/5'}  mx-auto   h-auto flex flex-col flex-wrap gap-5 my-20  p-5 rounded`}>
        <div className='flex self-start border-b py-2 max-[390px]:gap-5 w-fit items-center gap-16'>
            <div className='flex flex-col w-fit'>
                <div className='self-start font-poppins font-semibold text-lg'>
                    {task?.title===""?'Title':task?.title}
                </div>
                <PiSubtitlesLight className='self-end text-lg'/>
            </div>
            <div className='w-fit relative flex flex-col flex-nowrap whitespace-nowrap'>
                <div className='self-end whitespace-nowrap'>{task?.time}</div>
                <div className='whitespace-nowrap'>{task?.date}</div>
                <BsClockHistory className='absolute top-1 -left-1'/>
            </div>
        </div>
        <div className='flex flex-col gap-3 w-fit border-b pb-3'>
            <p className='font-bold text-lg'>Description</p>
            <p className='font-poppins leading-7 tracking-wider'>
                {task?.description===""?'You left the description blank':task?.description}
            </p>
        </div>
        <div className='flex items-center gap-3'>
            <Link to={'/'} className='border px-3  py-2 hover:scale-95 transition duration-300 active:bg-blue-600 bg-blue-500 text-white  rounded'>Go back</Link>
            <Link to={`/edit/${id}`} className='border px-3 py-2 hover:scale-95 transition duration-300 active:bg-orange-500  bg-orange-400 text-white rounded'>Edit</Link>
        </div>
    </div>}
    </>

  ) 
}

export default Detail