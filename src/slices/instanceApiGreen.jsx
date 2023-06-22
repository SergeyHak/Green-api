import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  IdInstance: "",
  ApiTokenInstance: "",
  UserNumber: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.IdInstance = action.payload.IdInstance;
      state.ApiTokenInstance = action.payload.ApiTokenInstance;
      state.UserNumber = action.payload.UserNumber;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
