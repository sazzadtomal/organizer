import Sidebar from "./features/Sidebar/Sidebar";
import Navbar from "./features/Navbar/Navbar";
import { getActiveMenu,getDarkMode} from "./features/Navbar/NavbarSlice";
import {useSelector } from "react-redux/es/hooks/useSelector";
import Movies from "./pages/Movies/Movies";
import Weather from "./pages/Weather/Weather";
import {Routes, Route } from "react-router-dom";

function App() {

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
              <Routes>
                <Route path="/movies" element={<Movies/>} />
              </Routes>
        
        
              </div>
        </div>
    </div>

  )
}

export default App;
