import React, { useEffect, useState } from 'react'
import { addMroeTag, addNewTask, fetchFilterTags, fetchTasks, removeTag } from '../Api'
import { NavLink , Link ,useNavigate } from 'react-router-dom'
import {IoIosRemoveCircleOutline} from 'react-icons/io'
import Swal from 'sweetalert2'
import Load from '../loader/Load'


const Create = () => {
  const [tasks,setTasks] = useState()
  const [tags,setTags] = useState()

  const [title,setTitle] = useState('')
  const [desc,setDesc] = useState('')
  const [chooseTag,setChooseTag] = useState('')

  const [addTagInput,setAddTagInput] = useState('')

  const navigate = useNavigate()


  const getData = async()=>{
    const {data:tagsData} = await fetchFilterTags('allData')
    const {data:tasksData} = await fetchTasks('allData')
    setTasks(tasksData)
    setTags(tagsData)
  }
  useEffect(()=>{
    getData()
  },[])

  const createNewTag = async()=>{
      if (addTagInput==='') {
        return
      }
      const object = {
        tag: addTagInput,
        filterBy:addTagInput.toLocaleLowerCase(),
        id: Date.now()
      }
      const data = await addMroeTag(object)
      getData()

      setAddTagInput('')
  }
  const handleRemoveTag = async(id)=>{
    const data = await removeTag(id)
    getData()
  }

  const handleSubmit = ()=>{


    if (title===""||desc==="") {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to leave the title or description blank?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Saved!",
            text: "The task has been saved.",
            icon: "success"
          });
          const today = new Date();
          const currentYear = today.getFullYear();
          const currentMonth = today.getMonth() + 1; // Months are 0-indexed, so add 1
          const currentDay = today.getDate();
      
          const dateString = `${currentYear}-${currentMonth}-${currentDay}`;
          let hours = today.getHours();
          const minutes = today.getMinutes();
          
          let minutesString = minutes
          if (minutes>=10) {
            minutesString = minutes
          }else{
            minutesString = `0${minutes}`
          }
          let amOrPm = "AM";
      
          if (hours >= 12) {
              amOrPm = "PM";
              if (hours > 12) {
                  hours -= 12;
              }
          }
          const timeString = `${hours}:${minutesString} ${amOrPm}`;
      
          const object = {
            title:title,
            description: desc,
            id: Date.now(),
            tag: chooseTag,
            date:dateString,
            time:timeString
          }
          
      
          addNewTask(object)
          navigate('/')
        }
      });
      return
    }

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // Months are 0-indexed, so add 1
    const currentDay = today.getDate();

    const dateString = `${currentYear}-${currentMonth}-${currentDay}`;
    let hours = today.getHours();
    const minutes = today.getMinutes();
    let amOrPm = "AM";

    if (hours >= 12) {
        amOrPm = "PM";
        if (hours > 12) {
            hours -= 12;
        }
    }
    const timeString = `${hours}:${minutes} ${amOrPm}`;

    const object = {
      title:title,
      description: desc,
      id: Date.now(),
      tag: chooseTag,
      date:dateString,
      time:timeString
    }
    

    addNewTask(object)
    navigate('/')

  }
  return (
      <>
      {tags===undefined?<Load/>:    <div className='lg:w-[50%] sm:w-[72%] w-[80%] px-3 mx-auto my-10 gap-3 flex flex-col items-center justify-center'>
        <div className='w-full'>
            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" id="small-input" className="outline-none block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs   dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='React...'/>
        </div>
        <div className='w-full'>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} id="message" rows="4" className="block outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="React is a Javascript..."></textarea>      
        </div>
        <div className='flex w-full flex-wrap border  py-3  px-3 rounded items-center gap-2'>
              <div className='flex flex-wrap gap-2'>
                {tags.map(tag=><div className='relative ' key={tag.id}>
                  <div    onClick={()=>setChooseTag(tag.filterBy)} className={`${tag.filterBy===chooseTag?"border z-0 cursor-pointer text-sm rounded px-1 py-1  transition bg-[#D8D9DA] text-white":'border z-0 cursor-pointer text-sm rounded px-1 py-1  transition hover:bg-[#D8D9DA] hover:text-white'}`}>{tag.tag}</div>
                  {tag.filterBy!==""&&                  <IoIosRemoveCircleOutline onClick={()=>{handleRemoveTag(tag.id)}} className='text-md absolute -top-2 -left-2 z-10 cursor-pointer'/>}
                </div>)}
              </div>
              <small className='underline underline-offset-1'>Please choose one tag to be able to find what you are looking for easily</small>
        </div>
        <div className='flex max-sm:flex-col max-sm:gap-2 w-full sm:justify-between sm:items-center'>
          <div className='flex gap-2 self-start border px-2 py-2 rounded bg-gray-50'>
              <input onKeyDown={(e)=>e.key==="Enter"&&createNewTag()} value={addTagInput} onChange={(e)=>setAddTagInput(e.target.value)} type="text" className='outline-none bg-gray-50' placeholder='Add your own tag' />
              <button  onClick={()=>createNewTag()} className='border bg-white hover:scale-105 transition active:bg-green-600 hover:bg-green-500 hover:text-white rounded px-2 py-1'>add</button>
          </div>
          <div className='flex items-center gap-5  max-sm:ms-5 self-end'>
            <Link to={'/'} className='text-blue-500 font-semibold hover:scale-105 transition py-2 cursor-pointer'>Cancle</Link>
            <button onClick={()=>handleSubmit()} className='text-white border bg-blue-500 px-2 py-2 rounded-lg hover:scale-105 transition'>Save Task</button>
          </div>
        </div>

    </div>}
      </>
  )
}

export default Create