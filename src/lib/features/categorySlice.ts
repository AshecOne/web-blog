import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/utils/helper";

// mendefinisikan properti/data apa saja yang mungkin nanti disimpan
interface ICategory {
  id?: string;
  title?: string;
}

// inisialisasi value
const data: ICategory[] = [];

const categorySlice = createSlice({
  name: "category",
  initialState: [...data],
  reducers: {
    setCategory: (initialState, action) => {
      return [...action.payload]; //cara mas abdi
      // if (!initialState.length) {
      //   return [...initialState, ...action.payload]; //cara putu
      // }
    },
  },
});

const actions = {
  setCategoryAction: categorySlice.actions.setCategory,
};

export const { setCategoryAction } = actions;

export default categorySlice.reducer;

// #middleware
export const getCategory = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(BASE_URL + `/categories`);
      console.log("Response from middleware", res.data);
      dispatch(setCategoryAction(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
};
