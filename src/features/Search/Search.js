import {AiOutlineSearch} from "react-icons/ai"
import { useEffect,useState,memo } from "react"



const Search = ({modifier}) => {
  
 
  const [currentValue, setCurrentValue]=useState("")
 
 useEffect(()=>{

    const time=setTimeout(()=>modifier(currentValue),500)


    return ()=>{
      clearTimeout(time)
    }

  },[currentValue,modifier])


  return (
    <div className=" w-full h-8 flex justify-end text-sm">
    <div className="border box-border p-1 flex items-center dark:bg-gray-300 bg-white rounded-xl">
      <input  onChange={event=>{setCurrentValue(event.target.value)}} className="dark:text-stone-500 dark:bg-gray-300 box-border pl-2 max-w-sm outline-none" type="text" placeholder="search" />
      <AiOutlineSearch className="text-md hover:rotate-12"/>
    </div>
</div>
  )
}

export default  memo(Search)