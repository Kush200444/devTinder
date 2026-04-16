const requestSlice = createSlice({
    name:"requests",
    intialState:{
        requests:null,
    },
    reducers:{
        addRequests:(state,action) => action.payload,
        removeRequests:(state,action) => null,
    }
});

export const{addRequests,removeRequests} = requestSlice.actions;
export default requestSlice.reducer;