import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CurrentCategory = string;

const initialCurrentCategory: CurrentCategory = '';

export const currentCategorySlice = createSlice({
    name: 'currentCategory',
    initialState: initialCurrentCategory,
    reducers: {
        setCurrentCategory: (state, action: PayloadAction<CurrentCategory>) => state = action.payload
    }
});

export const { setCurrentCategory } = currentCategorySlice.actions;

export default currentCategorySlice.reducer;