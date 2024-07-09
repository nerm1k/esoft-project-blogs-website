// import { createStore } from "redux";
// import rootReducers from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import currentPageSlice from "./currentPageSlice";
import pagesAroundSlice from "./pagesAroundSlice";
import currentCategorySlice from "./currentCategorySlice";

export const store = configureStore({
    reducer: {
        currentPage: currentPageSlice,
        pagesAround: pagesAroundSlice,
        currentCategory: currentCategorySlice
    }
});

// export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;