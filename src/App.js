import React, { useEffect, useState } from "react";
import "./App.css";
import Welcome from "./Welcome";
import Game from "./Game";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import mySong from "./assets/xray.mp3";
import SoundOff from "./assets/sound-off.svg";
import SoundOn from "./assets/sound-loud.svg";

function App() {
  const [isMuted, setIsMuted] = useState(false);
  const [audio] = useState(new Audio(mySong));

  useEffect(() => {
    audio.volume = 0.25;
    audio.loop = true;

    // Play audio when the user interacts with the page
    document.addEventListener("click", () => {
      audio.play();
    });

    return () => {
      audio.pause();
    };
  }, [audio]);

  const toggleMute = () => {
    if (isMuted) {
      audio.volume = 0.25;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <div className="App">
      <img
        src={isMuted ? SoundOff : SoundOn}
        alt="Sound icon"
        className="sound-icon shadow blink glow"
        onClick={toggleMute}
      />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
