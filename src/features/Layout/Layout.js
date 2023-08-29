import { getActiveMenu,getDarkMode } from '../Navbar/NavbarSlice';
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { useSelector } from 'react-redux';

const Layout = () => {

  const activeMenu=useSelector(getActiveMenu);
  const darkMode=useSelector(getDarkMode)


  return (

    <div className={`${darkMode ? "dark" : " "}`}>
    <div className='relative flex' >
          {activeMenu ? (<div className='dark:bg-slate-800 dark:shadow-cyan-800 w-72 fixed bg-white shadow-xl p-5'>
                  <Sidebar/>
                </div>) : (<div className='w-0 overflow-hidden box-border' > <Sidebar/></div>)}
        
     <div className={`w-full fixed md:static h-screen ${activeMenu ? "ml-72" : "flex-1" } dark:bg-slate-700 overflow-hidden `} >
                <div className='fixed md:static bg-main-bg  w-full'>
                    <Navbar/>
                </div>
              
                <Outlet/>
        
              </div>
        </div>

        </div>    
    
  )
}

export default Layout