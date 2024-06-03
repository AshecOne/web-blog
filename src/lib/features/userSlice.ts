import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  id: string;
  username: string;
  email: string;
  isLoggedIn: boolean;
}

const initialState: IUserState = {
  id: "",
  username: "",
  email: "",
  isLoggedIn: typeof window !== 'undefined' ? !!localStorage.getItem("user-token") : false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSuccessLogin: (state, action: PayloadAction<{ id: string; username: string; email: string }>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    resetUserState: (state) => initialState,
  },
});

export const { setSuccessLogin, resetUserState } = userSlice.actions;
export default userSlice.reducer;
