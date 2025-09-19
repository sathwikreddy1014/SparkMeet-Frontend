import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],   // ✅ start as an array, not null
  reducers: {
    addFeed: (state, action) => {
      return action.payload;  // expecting an array of users
    },
     updateFeedUser: (state, action) => {
      const index = state.findIndex(user => user._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload; // update user in place
      }
    },
    removeoneFeed: (state, action) => {
      return state.filter(user => user._id !== action.payload);  // ✅ safe now
    },
  },
});

export const { addFeed, removeoneFeed, updateFeedUser } = feedSlice.actions;
export default feedSlice.reducer;
