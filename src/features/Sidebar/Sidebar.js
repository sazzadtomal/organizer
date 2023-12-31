import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setActiveMenu } from '../Navbar/NavbarSlice'
const catagories=["Weather", "Music","Movies","Todos","Admin"]


const Sidebar = () => {
  const dispatch=useDispatch()
  return (
    <div className='w-full flex h-screen flex-col gap-32 '>
      <div className='flex justify-between items-center box-border' >
        <p className='text-3xl dark:text-stone-300 p-2 mt-2'>Organizer!</p>
      </div>

      <ul className='pl-2'>
      <li onClick={()=>dispatch(setActiveMenu())} className='dark:text-stone-300 cursor-pointer hover:text-slate-700 hover:text-2xl p-2 mb-4 ' >
          <NavLink to="/" key="home" >Home</NavLink>
        </li>

        {catagories.map(cat=><li onClick={()=>dispatch(setActiveMenu())} className='dark:text-stone-300 cursor-pointer hover:text-slate-700 hover:text-2xl p-2 mb-4 ' >
          <NavLink to={`/${cat.toLowerCase()}`} key={cat} >{cat}</NavLink>
        </li>)}
      </ul>


    </div>
  )
}

export default Sidebar