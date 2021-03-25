import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { create } from "apisauce";
//use api sause to create base url
const api = create({
  baseURL: "https://itunes.apple.com",
});
//initial state
const initialState = {
  songs: [],
  status: "idle",
  error: null,
};

//createAsyncThunk for async operations
export const fetchSongs = createAsyncThunk("songs/fetchSongs", async (term) => {
  const response = await api.any({
    //apisause to fetch URL
    method: "GET",
    url: "/search",
    params: { term: term, media: "music", limit: 30 },
  });
  return response.data.results; //get data
});
//creteSlice
const musicSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {},
  extraReducers: {
    //states of fetching song
    [fetchSongs.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchSongs.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.songs = action.payload;
    },
    [fetchSongs.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});
//destructuring actions
export const { musicFetched, musicSearched } = musicSlice.actions;
//returning reducer
export default musicSlice.reducer;
//method to getAllSongs
export const getAllSongs = (state) => state.songs.songs;
//method to get particular song
export const getSong = (state, songName) => {
  fetchSongs(songName);
};
