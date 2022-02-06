import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    userLoggedIn: (state, action) => {
      const { userId, name } = action.payload.data;
      state.user = { userId, name };
    },
    userLoggedOut: (state) => {
      state.user = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = slice.actions;
export default slice.reducer;
