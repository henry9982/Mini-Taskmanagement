import React from 'react'
import { removeTask } from '../Api'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

const Card = ({data,func}) => {
  const navigate = useNavigate()
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  return (
    <div className='flex w-full p-2 flex-wrap px-3 rounded-md border justify-between items-center hover:scale-105 transition duration-300 hover:shadow-lg hover:shadow-slate-400/50 '>
        <div className={`cursor-pointer w-3/5 max-[422px]:w-2/5 flex  flex-col ${data?.title===""&&data?.description===""&&"flex-1 h-10"}`} onClick={()=>navigate(`/detail/${data?.id}`)}>
            <h1 className={`font-semibold text-xl whitespace-nowrap w-4/6 overflow-hidden text-ellipsis`}>{data?.title}</h1>
            <small className='whitespace-nowrap  w-4/6 overflow-hidden text-ellipsis'>{data.description}</small>
        </div>
        <div className='flex gap-2 '>
            <button className='border px-3 max-[422px]:px-2 rounded-md bg-blue-500 text-white' onClick={()=>navigate(`/edit/${data?.id}`)}>Edit</button>
            <button onClick={()=>{
              swalWithBootstrapButtons.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your task has been deleted.",
                    icon: "success"
                  });
                  removeTask(data?.id)
                  func()
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your task is safe :)",
                    icon: "error"
                  });
                }
              })
              }} className='border bg-red-500 px-3 py-2 max-[422px]:px-2 rounded-md text-white'>Delete</button>
        </div>
    </div>
  )
}

export default Card