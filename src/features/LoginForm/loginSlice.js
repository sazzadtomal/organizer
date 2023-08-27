import { createSlice } from "@reduxjs/toolkit";


const initialState={}


const loginSlice=createSlice({
    name:"Login",
    initialState,
    reducers:{
        setAuth:(state,action)=>{
            return action.payload
        }

    }
})


export const {setAuth}=loginSlice.actions

export const getAuth=(state)=>state.login
export default loginSlice.reducer