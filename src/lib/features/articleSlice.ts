import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IArticle {
  id: string;
  author: {
    username: string;
  };
  title: string;
  urlImage: string;
  description: string;
  createdAt: string;
  category: {
    title: string;
  };
}

interface ArticleState {
  selectedArticle: IArticle | null;
}

const initialState: ArticleState = {
  selectedArticle: null,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setSelectedArticle(state, action: PayloadAction<IArticle>) {
      state.selectedArticle = action.payload;
    },
    clearSelectedArticle(state) {
      state.selectedArticle = null;
    },
  },
});

export const { setSelectedArticle, clearSelectedArticle } =
  articleSlice.actions;

export default articleSlice.reducer;
