import React, { useEffect } from "react";
import { Navbar, Home } from "./components/index";
import { useSelector, useDispatch } from "react-redux";
import { fetchSongs } from "./features/music/musicSlice";
import { Spin } from "antd";

function App() {
  const dispatch = useDispatch();

  //get status
  const fetchStatus = useSelector((state) => state.songs.status);
  //get error
  const error = useSelector((state) => state.songs.error);
  //fetch songs
  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchSongs("pokemon"));
    }
  }, [fetchStatus, dispatch]);

  return (
    <div className="app__container">
      <Navbar />
      <main>
        {fetchStatus === "loading" && <Spin />}
        {fetchStatus === "succeeded" && <Home />}
        {fetchStatus === "failed" && <div>{error}</div>}
      </main>
    </div>
  );
}

export default App;
