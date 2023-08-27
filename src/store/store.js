import { configureStore } from "@reduxjs/toolkit";
import navbarSlice from "../features/Navbar/NavbarSlice";
import { moviesApi } from "../pages/Movies/moviesApi";
import movieSlice from "../pages/Movies/movieSlice";
import loginSlice from "../features/LoginForm/loginSlice";

  const store=configureStore({
    reducer:{
         [moviesApi.reducerPath]:moviesApi.reducer,
         navbar:navbarSlice,
         movies:movieSlice,
         login:loginSlice  

    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
  })


  export default store