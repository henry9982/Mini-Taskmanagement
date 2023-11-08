import React, { useEffect, useState } from 'react'
import { fetchFilterTags, fetchTasks } from '../Api'
import Card from '../components/Card'

const AllTasks = () => {
  const [tasks,setTasks] = useState([])
  const [tags,setTags] = useState([])

  const getData = async()=>{
    const {data:tagsData} = await fetchFilterTags()
    const {data:tasksData} = await fetchTasks()
    console.log(tagsData);
    console.log(tasksData);
    setTasks(tasksData)
    setTags(tagsData)
  }
  useEffect(()=>{
    getData()
  },[])
  return (
    <div className='flex flex-col  gap-3 my-2 w-full'>
        {tasks.length>0?tasks.map(task=><Card key={task.id} data={task} func={getData}/>):<div>Nothig to show</div>}
    </div>
  )
}

export default AllTasks