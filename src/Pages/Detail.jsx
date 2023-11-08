import React from 'react'
import { getSingleTask } from '../Api'
import { useState } from 'react'
import { useEffect } from 'react'
import {useParams } from 'react-router-dom'

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
    <div className='w-2/3 mx-auto h-auto flex flex-col flex-wrap gap-5'>
        <div className='flex items-center gap-16'>
            <div className='self-start'>
                {task?.title}
            </div>
            <div>
                <div>{task?.date}</div>
                <div>{task?.time}</div>
            </div>
        </div>
        <div>
            <div className='w-52 bg-gray-400 flex flex-wrap'>
                <p className='w-3/5 bg-zinc-700'>{task?.description}</p>
            </div>
        </div>
    </div>

  )
}

export default Detail