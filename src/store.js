import { configureStore } from "@reduxjs/toolkit";
import { statSlice } from "./reducer";

const store = configureStore({
    reducer: {
        stats: statSlice.reducer
    }
});


export default store;