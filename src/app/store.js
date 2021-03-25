import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "../features/music/musicSlice";

export default configureStore({
  reducer: {
    songs: musicReducer,
  },
});
