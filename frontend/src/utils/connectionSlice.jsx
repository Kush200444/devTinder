import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:"connections",
    intialState:{
        connections:null
    },
    reducers:{
        addConnections:(state,actions) => actions.payload,
        removeConnections:(state,actions) => null,
    }
});
export const {addConnections,removeConnections} = connectionSlice.actions;
export default connectionSlice.reducer;