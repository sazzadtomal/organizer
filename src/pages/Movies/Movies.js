import Search from "../../features/Search/Search"
import { useState} from "react"
import { useGetMovieByNameQuery } from "./moviesApi"
import {AiOutlinePlusCircle} from "react-icons/ai"
import {AiOutlineMinusCircle} from "react-icons/ai"
import {mymovies,addMovie,removeMovie,movieIds} from "./movieSlice"
import {useSelector, useDispatch} from "react-redux";
import {getAuth} from "../../features/LoginForm/loginSlice"


const Movies = () => {

  const dispatch=useDispatch()
  const watchListData= useSelector(mymovies)
  const [query,setQuery]=useState("")
  const {data}=useGetMovieByNameQuery(query)
  const watchIds=useSelector(movieIds)

  const auth=useSelector(getAuth)
  
  console.log(watchListData)
  
  let watchList=<div className=" flex justify-center items-center h-48 w-32 bg-gray-300 opacity-50"> Add Movies! </div>

  if(watchListData){
    watchList=watchListData.map(movie=>(<div className="rounded-xl flex w-64 md:w-1/2 my-2 lg:w-1/5 shrink-0 md:p-4 sm:p-2 gap-2  bg-gray-300  ">
     
          <img className="w-24 h-36 md:w-36 md:h-48 text-sm" src={movie.Poster}/>
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="">{movie.Title}</h1>
              <h2>{movie.Year}</h2>
            </div>
           <AiOutlineMinusCircle className=" my-4 text-2xl" onClick={()=>dispatch(removeMovie(movie.imdbID))} />
 
          </div>
      
      
      
      </div>))
  }
  
  
  
  // dynamic components for searched movies
  let searchMovies=<div className=" dark:text-stone-200 h-48 flex justify-center items-center"> Start Searching for movies to add!!!  </div>
  if(data?.Search){
    searchMovies=data.Search.map((movie,index)=>
    <div key={index}  className="px-2 mb-1 hover:dark:text-stone-200   dark:text-stone-400  py-2 box-border rounded-md border dark:border-cyan-900 flex justify-between items-center">
     
        <div className="flex flex-col">
          <p>{movie.Title}</p>
          <p>{movie.Year}</p>
        </div>
     {!watchIds.includes(movie.imdbID) ? <AiOutlinePlusCircle onClick={()=>dispatch(addMovie(movie))} className="text-2xl hover:scale-110 "/> :
     <AiOutlineMinusCircle onClick={()=>dispatch(removeMovie(movie.imdbID))} className="text-2xl hover:scale-110 "/> } 
    </div>)
  }

  console.log(data?.Search)



 
 
 

  return (
    <div className="dark:bg-slate-700 mt-16 md:mt-4 flex gap-4 flex-col  h-5/6 p-4 px-6" >
    
    <h2 className="text-2xl font-semibold dark:text-stone-200">Current Watchlist.</h2>
    

    <div>
      <div className="m-auto flex gap-2 w-full overflow-scroll ">{watchList}</div>
    </div>


    <Search modifier={setQuery}/>
     
    <div className="overflow-y-scroll h-4/6 p-2 rounded-md w-full  lg:w-2/3 flex flex-col m-auto ">
      {searchMovies}
    </div>
    
    
    </div>
  )
}

export default Movies