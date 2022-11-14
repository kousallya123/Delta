import { createSlice } from "@reduxjs/toolkit";
const userDetails=JSON.parse(localStorage.getItem('user'))


if(userDetails){
    userDetails=userDetails.user
}
export const userSlice=createSlice({
    name:"user",
    initialState:{
        user:
    },
    reducers:{
         login:(state,action)=>{
         state.user=action.payload;     
         },
         logout:(state)=>{
                state.user=null
        },
    },
})


export const {login,logout}=userSlice.actions;

export const selectUser=(state)=>state.user.user;

export default userSlice.reducer;