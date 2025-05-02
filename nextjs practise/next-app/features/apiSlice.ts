import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState ={
    loading: false,
    data: null,
    error: null,   
}
const apiSlice= createSlice({
    name: 'api',
    initialState,
    reducers: {
        onApiLoading: (state)=> {
            state.loading= true,
            state.data= null,
            state.error= null
        },
        
        onApiSuccessResponse: (state, action) => {
            state.loading= false,
            state.data= action.payload,
            state.error= null
        },

        onApiErrorResponse: (state, action) => {
            state.loading= false,
            state.data= null
            state.error= action.payload
        }
    }
});


const { onApiLoading, onApiErrorResponse, onApiSuccessResponse }= apiSlice.actions;
export default apiSlice.reducer;