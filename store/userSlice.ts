import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface UserState {
    ID: string;
    avatar: string;
    userName: string;
    email: string;
    gender: string;
    marketingEmails: boolean;
    shareData: boolean;
    lovedSongs: string[];
    collections: string[];
    lovedCollections: string[];
}

// Initial state
const initialState: UserState = {
    ID: '',
    avatar: '',
    userName: '',
    email: '',
    gender: '',
    marketingEmails: false,
    shareData: false,
    lovedSongs: [],
    collections: [],
    lovedCollections: [],
};


// Actual Slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    // Action to set the user status
    setUserState(state, action) {
        state = action.payload;
    },

    setUser(state, action) {
        state.ID = action.payload.ID;
        state.avatar = action.payload.avatar;
        state.userName = action.payload.userName;
        state.email = action.payload.email;
        state.gender = action.payload.gender;
        state.marketingEmails = action.payload.marketingEmails;
        state.shareData = action.payload.shareData;
        state.lovedSongs = action.payload.lovedSongs;
        state.collections = action.payload.collections;
        state.lovedCollections = action.payload.lovedCollections;
    },

    SIGNUP(state, action) {
        
    },

    LOGOUT(state, action) {

    },

    SIGNIN(state, action) {
        
    },


  },
});

export const { setUserState, SIGNUP, LOGOUT, SIGNIN } = userSlice.actions;

export const selectUserState = (state: AppState) => state.user;

export default userSlice.reducer;