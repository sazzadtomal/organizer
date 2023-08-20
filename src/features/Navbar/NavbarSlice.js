import { createSlice } from "@reduxjs/toolkit";


const initialState={
    activeMenu: false,
    screenSize: null,
    darkMode: false
}


const navbarSlice=createSlice({
    name:"Sidebar",
    initialState,
    reducers:{
        setActiveMenu:(state,action)=>{
            state.activeMenu=action.payload
        },
        setScreenSize:(state,action)=>{
            state.screenSize=action.payload
        },
        setDarkMode: (state,action)=>{
            state.darkMode=!state.darkMode
        }



    }
})


export const {setActiveMenu,setScreenSize,setDarkMode}=navbarSlice.actions

export const getScreenSize=(state)=>state.navbar.screenSize
export const getActiveMenu=(state)=>state.navbar.activeMenu
export const getDarkMode=(state)=>state.navbar.darkMode

export default navbarSlice.reducer