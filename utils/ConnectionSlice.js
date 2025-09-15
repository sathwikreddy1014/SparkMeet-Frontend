import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers:{
        addConnections: (state, action) =>{
            return action.payload;
        },
        removeConnection: () => {
            return null;}
    }
});
export const {addConnections, removeConnection} = ConnectionSlice.actions;
export default ConnectionSlice.reducer;