import React, { useEffect, useState } from 'react'
import { fetchFilterTags, fetchTasks } from '../Api'
import Card from '../components/Card'
import Load from '../loader/Load'
import {BiTaskX} from 'react-icons/bi'

const AllTasks = () => {
  const [tasks,setTasks] = useState()
  const [tags,setTags] = useState()

  const getData = async()=>{
    const {data:tagsData} = await fetchFilterTags()
    const {data:tasksData} = await fetchTasks()

    setTasks(tasksData)
    setTags(tagsData)
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <div className='flex flex-col  gap-3 my-2 w-full'>
      {tasks===undefined?<Load/>:tasks.length>0?tasks.map(task=><Card key={task.id} data={task} func={getData}/>):<div className='w-fit mx-auto my-10 flex items-center gap-2 text-lg'>
        <div>
          No Task to show
        </div>
        <BiTaskX/>
      </div>
}
    </div>
  )
}

export default AllTasks