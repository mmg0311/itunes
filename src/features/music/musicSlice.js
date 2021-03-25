import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { create } from "apisauce";

const api = create({
  baseURL: "https://itunes.apple.com",
});

const initialState = {
  songs: [],
  status: "idle",
  error: null,
};

export const fetchSongs = createAsyncThunk("songs/fetchSongs", async (term) => {
  const response = await api.any({
    method: "GET",
    url: "/search",
    params: { term: term, media: "music", limit: 10 },
  });
  return response.data.results;
});

const musicSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {},
  extraReducers: {
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
export const { musicFetched, musicSearched } = musicSlice.actions;
export default musicSlice.reducer;
export const getAllSongs = (state) => state.songs.songs;
export const getSong = (state, songName) => {
  fetchSongs(songName);
};
