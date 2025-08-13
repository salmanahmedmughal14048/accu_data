// src/redux/reducer/menuDataSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    menuData: [],
    opacity: 0.95,  

};

const menuDataSlice = createSlice({
    name: 'menuData',
    initialState,
    reducers: {
        setMenuData: (state, action) => {
            state.menuData = action.payload;
        },
        clearMenuData: (state) => {
            state.menuData = [];
        },
            setOpacity: (state, action) => { // Add this reducer
            state.opacity = action.payload;
        },

    }
});

export const { 
    setMenuData, 
    clearMenuData,
    setOpacity
} = menuDataSlice.actions;

export default menuDataSlice.reducer;