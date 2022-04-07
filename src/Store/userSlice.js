import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Currentuser: null,
  isFetching: false,
  error: false,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.Currentuser = action.payload;
      state.error = false;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutSuccess: () => {
      return initialState;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutSuccess } =
  userSlice.actions;
export default userSlice.reducer;
