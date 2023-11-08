import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Create from './Pages/Create'
import Edit from './Pages/Edit'
import {GrTasks} from 'react-icons/gr'
import AllTasks from './Pages/AllTasks'
import FilteredTasks from './Pages/FilteredTasks'
import Detail from './Pages/Detail'
import NotFoundPage from './Pages/NotFoundPage'


const App = () => {
  return (
    <div className=''>
      <Link to={'/'}>
        <div className='w-fit gap-2 flex justify-center items-center mx-auto my-4  text-3xl'>
            <GrTasks className='hover:scale-110 transition duration-300'/>
            <div className='font-bold hover:scale-110 transition duration-300 text-[#435585] -mt-1'>TSM</div>
        </div>
      </Link>
      <Routes>
        <Route path='/' element={<Home/>}>
          <Route index element={<AllTasks/>}/>
          <Route path='filter/:id' element={<FilteredTasks/>}/>
        </Route>
        <Route path='create' element={<Create/>}/>
        <Route path='edit/:id' element={<Edit/>}/>
        <Route path='detail/:id' element={<Detail/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
      
    </div>
  )
}

export default App