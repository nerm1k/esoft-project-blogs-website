import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PagesAround {
    previous: boolean,
    next: boolean
};

const initialPagesAround: PagesAround = {
    previous: false,
    next: true
};

export const pagesAroundSlice = createSlice({
    name: 'pagesAround',
    initialState: initialPagesAround,
    reducers: {
        setPagesAround: (state, action: PayloadAction<PagesAround>) => {
            state.previous = action.payload.previous;
            state.next = action.payload.next;
        }
    }
});

export const { setPagesAround } = pagesAroundSlice.actions;

export default pagesAroundSlice.reducer;