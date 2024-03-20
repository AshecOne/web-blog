import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  isLoggedIn: boolean;
}

// Definisikan initialState menggunakan IUserState untuk type state Anda
const initialState: IUserState = {
  id: "",
  username: "",
  email: "",
  password: "",
  role: "author", // asumsikan role default adalah 'author'
  isLoggedIn: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Gunakan PayloadAction untuk mendefinisikan type payload
    setSuccessLogin: (state, action: PayloadAction<IUserState>) => {
      // Directly mutating the state is okay with immer in Redux Toolkit
      Object.assign(state, action.payload);
      state.isLoggedIn = true; 
      // Simpan id user ke localStorage untuk keep login
      localStorage.setItem("success-login", action.payload.id);
    },
    // Menambahkan reducer untuk reset state
    resetUserState: () => {
      // Kembali ke initialState
      localStorage.removeItem("success-login");
      return {
        ...initialState,
        isLoggedIn: false, // Set isLoggedIn menjadi false saat reset state
      };
    },
  },
});

// Export actions dan reducer
export const { setSuccessLogin, resetUserState } = userSlice.actions;
export default userSlice.reducer;
