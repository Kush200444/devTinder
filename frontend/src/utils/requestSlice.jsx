import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"requests",
    initialState: null,
    reducers:{
        addRequests:(state,action) => action.payload,
        removeRequest:(state,actions) => {
            const newArray  = state.filter((request) => request._id !== actions.payload);
            return newArray;
        }
    }
});

export const{addRequests,removeRequest} = requestSlice.actions;
export default requestSlice.reducer;