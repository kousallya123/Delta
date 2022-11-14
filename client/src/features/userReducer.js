import { createSlice } from "@reduxjs/toolkit";
const userDetails=JSON.parse(localStorage.getItem('user'))


if(userDetails){
   var {username,email,profilePicture,coverPicture,followers,followings,posts,createdAt}=userDetails
}


export const userSlice=createSlice({
    name:"user",
    initialState:{
        user:{
            username,email,profilePicture,coverPicture,followers,followings,posts,createdAt
        }
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