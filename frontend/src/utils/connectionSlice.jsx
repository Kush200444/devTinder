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
export default connectionSlice.reducer;