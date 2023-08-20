import Search from "../../features/Search/Search"
import { useState} from "react"
import { useGetMovieByNameQuery } from "./moviesApi"
import {AiOutlinePlusCircle} from "react-icons/ai"
import {mymovies,addMovie} from "./movieSlice"
import {useSelector, useDispatch} from "react-redux";


const Movies = () => {

  const dispatch=useDispatch()
  const watchListData= useSelector(mymovies)
  const [query,setQuery]=useState("")
  const {data}=useGetMovieByNameQuery(query)
  
  console.log(watchListData)
  
  let watchList=<div className=" flex justify-center items-center h-48 w-32 bg-gray-300 opacity-50 "> Add Movies! </div>

  if(watchListData){
    watchList=watchListData.map(movie=>(<div className=" flex p-1 justify-center items-center h-48 w-48 shrink-0  bg-gray-300  ">{movie.Title}</div>))
  }
  
  
  
  // dynamic components for searched movies
  let searchMovies=<div className=" dark:text-stone-200 h-48 flex justify-center items-center"> Start Searching for movies to add!!!  </div>
  if(data?.Search){
    searchMovies=data.Search.map((movie,index)=>
    <div key={index}  className="px-2 mb-1 hover:dark:text-stone-200   dark:text-stone-400  py-2 box-border rounded-md border dark:border-cyan-900 flex justify-between items-center">
      <p className="w-64">{movie.Title}</p>
      <AiOutlinePlusCircle onClick={()=>dispatch(addMovie(movie))} className="text-2xl hover:scale-110 "/>
    </div>)
  }



 
 
 

  return (
    <div className="dark:bg-slate-700 mt-16 md:mt-4 flex gap-4 flex-col  h-5/6 p-4 px-6" >
    
    <h2 className="text-2xl font-semibold dark:text-stone-200">Current Watchlist.</h2>
    
    <Search modifier={setQuery}/>
     
    <div className="overflow-y-scroll p-2 rounded-md w-full  lg:w-2/3 flex flex-col m-auto ">
      {searchMovies}
    </div>
    
    
    </div>
  )
}

export default Movies