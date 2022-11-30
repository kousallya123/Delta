import { createSlice } from '@reduxjs/toolkit'
const defaultUser = JSON.parse(localStorage.getItem('user'))


if(defaultUser){
    var { _id,username, email, profilePicture,status,coverPicture,followers, followings, createdAt,posts,desc} = defaultUser
}else{

}


const userSlice = createSlice({
    name:'user',
    initialState:{
        _id,
        username,
        email,
        status,
        profilePicture,
        coverPicture,
        followers,
        followings,
        createdAt,
        posts,
        desc
        
    },
    reducers:{
        login:(state,action)=>{
            state._id = action.payload._id
            state.username = action.payload.username
            state.email = action.payload.email
            state.profilePicture = action.payload.profilePicture
            state.coverPicture = action.payload.coverPicture
            state.followers = action.payload.followers
            state.followings = action.payload.followings
            state.createdAt = action.payload.createdAt
            state.posts = action.payload.posts
            state.status = action.payload.status
            state.desc = action.payload.desc
        }, 
        logout:(state) => {state ={} }
    },
});


export const {login, logout} = userSlice.actions;
export default userSlice.reducer;






// import { createSlice } from '@reduxjs/toolkit'
// import storage from 'redux-persist/lib/storage';
// import {persistReducer} from 'redux-persist'
// import {combineReducers} from "@reduxjs/toolkit";
// const defaultUser = JSON.parse(localStorage.getItem('user'))


// if(defaultUser){
//     var { _id,username, email, profilePicture,status,coverPicture,followers, followings, createdAt,posts} = defaultUser
// }else{

// }


// const persistConfig={
//     key:"root",
//     version:1,
//     storage
// }

// const reducer=combineReducers({
//     login:(state,action)=>{
//         state._id = action.payload._id
//         state.username = action.payload.username
//         state.email = action.payload.email
//         state.profilePicture = action.payload.profilePicture
//         state.coverPicture = action.payload.coverPicture
//         state.followers = action.payload.followers
//         state.followings = action.payload.followings
//         state.createdAt = action.payload.createdAt
//         state.posts = action.payload.posts
//         state.status = action.payload.status
//     }, 
//     logout:(state) => {state ={} }
// })

// const persistedReducer=persistReducer(persistConfig,reducer)


// const userSlice = createSlice({
//     name:'user',
//     initialState:{
//         _id,
//         username,
//         email,
//         status,
//         profilePicture,
//         coverPicture,
//         followers,
//         followings,
//         createdAt,
//         posts,
        
//     },
//     reducers:persistedReducer
// });


// export const {login, logout} = userSlice.actions;
// export default userSlice.reducer;