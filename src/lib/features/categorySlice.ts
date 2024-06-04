import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// mendefinisikan properti/data apa saja yang mungkin nanti disimpan
export interface ICategory {
  id?: string;
  title?: string;
}

// inisialisasi value
const data: ICategory[] = [];

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [] as ICategory[],
    selectedCategory: "",
  },
  reducers: {
    setCategory: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

const actions = {
  setCategoryAction: categorySlice.actions.setCategory,
  setSelectedCategoryAction: categorySlice.actions.setSelectedCategory,
};

export const { setCategoryAction, setSelectedCategoryAction } = actions;

export default categorySlice.reducer;

// #middleware
export const getCategory = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(
        `https://blog-website-ashecone-25ef50f82ac6.herokuapp.com/categories`
      );
      console.log("Response from middleware", res.data);
      dispatch(setCategoryAction(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
};
