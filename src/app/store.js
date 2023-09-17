import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../features/hotel/hotelSlice";


export const store = configureStore({
    reducer: {
        hotels: hotelReducer,
    }
})