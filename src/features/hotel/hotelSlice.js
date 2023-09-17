import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const HOTEL_LIST_URL = "/service-ai/hotels";

const initialState = [];

export const fetchHotels = createAsyncThunk("hotels/fetchHotels", async () => {
    const response = await axios.get(HOTEL_LIST_URL);
    // console.log('response.data: ' + response.data)
    return response.data;
    // return initialHotels
});

const hotelSlice = createSlice({
    name: "hotels",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchHotels.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const selectAllHotels = (state) => state.hotels;

export const selectHotelById = (state, hotelId) =>
    state.hotels.find((hotel) => hotel.hotelId === hotelId);

export default hotelSlice.reducer;
