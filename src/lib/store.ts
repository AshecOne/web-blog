import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import categoryReducer from "./features/categorySlice";
import article from "./features/articleSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      userReducer,
      categoryReducer,
      article,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
