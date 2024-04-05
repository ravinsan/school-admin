import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name:"profile",
  initialState:{
    token: null,
    profile: null,
    user: null, //name store for testing
    value : false,
  },
  reducers:{
    setProfile:(state,action)=>{
      state.profile=action.payload;
    },
    setToken:(state,action)=>{
      state.token=action.payload;
    },
    logout:(state)=>{
      localStorage.removeItem("token");
      state.token=null;
    },
    setUser:(state,action)=>{
      state.user=action.payload;
    },
    toggleValue:(state)=>{
      state.value= !state.value;
    }

  },
});



export const { setProfile, setToken, logout, setUser, toggleValue } = profileSlice.actions;
export default profileSlice.reducer;

