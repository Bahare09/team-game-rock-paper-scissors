import React, { useEffect, useState } from "react";
import "./App.css";
import Welcome from "./pages/welcome/Welcome";
import Game from "./pages/game/Game";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import mySong from "./assets/Mystical_music.mp3";
import SoundOff from "./assets/sound-off.svg";
import SoundOn from "./assets/sound-loud.svg";
import NoMatch from "./NoMatch";

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
    if (audio.muted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
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
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
