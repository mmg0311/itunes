import React, { useEffect } from "react";
import { Navbar, Home } from "./components/index";
import { useSelector, useDispatch } from "react-redux";
import { fetchSongs } from "./features/music/musicSlice";
import { Spin } from "antd";
import { Typography } from "antd";

import "antd/dist/antd.css";

const { Title } = Typography;

function App() {
  const dispatch = useDispatch();
  //get status
  const fetchStatus = useSelector((state) => state.songs.status);

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchSongs("justin"));
    }
  }, [fetchStatus, dispatch]);

  return (
    <div className="app__container">
      <Navbar />
      <main>
        {fetchStatus === "loading" && (
          <div className="loader">
            <Spin size="large" />
          </div>
        )}
        {fetchStatus === "succeeded" && <Home />}
        {fetchStatus === "failed" && (
          <div className="loader">
            <Title type="danger" level={4}>
              Something went wrong... Please try again later
            </Title>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
