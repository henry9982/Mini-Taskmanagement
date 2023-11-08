import { useEffect, useState } from "react";
import { fetchFilterTags, fetchTasks } from "../Api"
import { NavLink, Outlet,useNavigate } from "react-router-dom";
import Load from "../loader/Load";

const Home = () => {
  const [tasks,setTasks] = useState()
  const [tags,setTags] = useState()
  const navigate = useNavigate()

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
    <>
      {tags===undefined?<Load/>:    <div className='flex overflow-hidden lg:w-[60%] md:w-[75%] w-full mx-auto  py-10 px-5 gap-3  flex-col'>
          <button  onClick={()=>navigate('/create')} className='border w-fit self-end p-2 rounded bg-blue-400 font-bold text-sm text-white flex-shrink-0'>Add New Task</button>
        <div className='flex w-full overflow-hidden flex-nowrap whitespace-nowrap overflow-x-auto border scroll-bar py-3 cursor-pointer px-3 rounded items-center gap-2'>
            <div>Tags:</div>
              <div className='flex flex-nowrap gap-2'>
                {tags.length>0?tags.map(tag=><NavLink key={tag.id} to={tag.filterBy===''?'/':`filter/${tag.filterBy}`} className="border text-sm rounded px-1 py-1 hover:scale-110 transition hover:bg-black hover:text-white ">{tag.tag}</NavLink>):<div>No Tag to filter please create one!</div>}
              </div>
          </div>
        <Outlet/>
    </div>}
    </>
  )
}

export default Home