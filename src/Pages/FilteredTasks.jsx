import React, { useEffect, useState } from 'react'
import {  fetchFilterTags, fetchTasks } from '../Api'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'

const FilteredTasks = () => {
  const {id} = useParams()
  console.log(id);

  const [tasks,setTasks] = useState([])
  const [tags,setTags] = useState([])



  const getData = async()=>{
    const {data:tagsData} = await fetchFilterTags()
    const {data:tasksData} = await fetchTasks()
    console.log(tagsData);
    console.log(tasksData);
    setTasks(tasksData.filter(task=>task.tag===id))
    setTags(tagsData)

    // console.log(data);
  }
  useEffect(()=>{
    getData()
  },[id])
  console.log(tasks);
  return (
    <div className='flex flex-col  gap-3 w-full my-2'>
        {tasks.length>0?tasks.map(task=><Card key={task.id} data={task} func={getData}/>):<div>Nothig to show</div>}
    </div>
  )
}

export default FilteredTasks