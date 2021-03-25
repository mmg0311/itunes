import React from "react";
import { useSelector } from "react-redux";
import { getAllSongs } from "../features/music/musicSlice";

function Home() {
  const songs = useSelector(getAllSongs);
  return (
    <div className="home__container">
      <div className="songs">
        {songs.map((song) => (
          <div className=" card" key={song.trackId}>
            <div className="card-header">
              <div className="card-img">
                <img src={song.artworkUrl100} alt="" />
              </div>
              <div className="card-body">
                <p className="song-name">{song.trackName}</p>
                <a href={song.artistViewUrl} className="artist-name">
                  {song.artistName}
                </a>
              </div>
            </div>
            <div className="player">
              <audio controls>
                <source src={song.previewUrl} />
              </audio>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
