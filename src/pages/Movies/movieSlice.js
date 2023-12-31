import { createSlice, createEntityAdapter} from '@reduxjs/toolkit'


const movieAdapter=createEntityAdapter({
    selectId:(movie)=>movie.imdbID
})


const movieSlice=createSlice({
     name: "Movies",
     initialState:movieAdapter.getInitialState(),
     reducers:{
        addMovie: (state,action)=>{
            movieAdapter.addOne(state,action.payload)
        },
        removeMovie: (state,action)=>{
            movieAdapter.removeOne(state,action.payload)
        }
     }


})


export const {addMovie,removeMovie}=movieSlice.actions



export const {selectAll:mymovies, selectIds:movieIds}=movieAdapter.getSelectors((state) => state.movies)


export default movieSlice.reducer