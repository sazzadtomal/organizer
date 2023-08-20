import { configureStore } from "@reduxjs/toolkit";
import navbarSlice from "../features/Navbar/NavbarSlice";
import { moviesApi } from "../pages/Movies/moviesApi";
import movieSlice from "../pages/Movies/movieSlice";


  const store=configureStore({
    reducer:{
         [moviesApi.reducerPath]:moviesApi.reducer,
         navbar:navbarSlice,
         movies:movieSlice

    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
  })


  export default store