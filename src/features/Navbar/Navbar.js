import { useEffect } from "react"
import { setActiveMenu,setScreenSize,getScreenSize,getActiveMenu,setDarkMode } from "./NavbarSlice"
import { useDispatch,useSelector} from "react-redux"
import {GiHamburgerMenu} from "react-icons/gi"
import {CgDarkMode} from "react-icons/cg"
import {CiSettings} from "react-icons/ci"



const Navbar = () => {
  
  const dispatch=useDispatch()

  const screenSize=useSelector(getScreenSize)
  const activeMenu=useSelector(getActiveMenu)

 
 
  useEffect(()=>{
    const handleSize=()=>{
      dispatch(setScreenSize(window.innerWidth));
    }
    window.addEventListener("resize", handleSize);

    handleSize();

    return ()=>{
      window.removeEventListener("resize", handleSize)
    }
  },[dispatch])

  useEffect(()=>{
    if(screenSize<=500){
       dispatch(setActiveMenu(false))
    }
    else{
      dispatch(setActiveMenu(true))
    }
  },[screenSize,dispatch]
  )



  console.log("navbar rendering",screenSize,activeMenu)





  return (
    <div className='bg-gray-100 dark:text-stone-300 justify-between w-full h-full flex items-center p-4 box-border dark:bg-slate-800 ' >
        <div className="text-2xl " onClick={()=>dispatch(setActiveMenu(activeMenu ? false : true))}><GiHamburgerMenu/></div>
        <div className="flex gap-3 ml-2">
          <div className="text-2xl" onClick={()=>dispatch(setDarkMode())}><CgDarkMode/></div>
          <div className="text-2xl"><CiSettings/></div>
        </div>

    </div>
  )
}

export default Navbar