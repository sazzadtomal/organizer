import {Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import RequireOath from "./features/RequireOath/RequireOath"
import Layout from "./features/Layout/Layout"
import Music from "./pages/Music/Music"
import Movies from "./pages/Movies/Movies";
import Register from "./pages/Register/Register";
import Todos from "./pages/Todos/Todos"
import Weather from "./pages/Weather/Weather"
import Home from "./pages/Home/Home"


function App() {

  return (
             <Routes>
               
              {/* Not Protected */}
                <Route path="/" element= {<Layout/>}>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />

                
                {/* Protected */}

                <Route element={<RequireOath/>}>
                  <Route path="/" element={<Home/>} />
                  <Route path="/movies" element={<Movies/>} />
                  <Route path="/music" element={<Music/>} />
                  <Route path="/todos" element={<Todos/>} />
                  <Route path="/weather" element={<Weather/>} />
                </Route>
               
               </Route>

                
              </Routes>
        
        
  )
}

export default App;
