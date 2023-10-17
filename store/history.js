import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    history: []
};

const historySlice = createSlice({
    name: "history",
    initialState: initialState,
    reducers: {
        addHistory: (state, action) => {
            let history = state.history;
            history.push(action.payload);
        },
        removeHistory: (state, action) => {
            let history = state.history;
            let index = history.findIndex((h) => h == action.payload);
            history.splice(index, 1);
            state.history = history;
        }
    }
});

export const { addHistory, removeHistory } = historySlice.actions;
export default historySlice.reducer;