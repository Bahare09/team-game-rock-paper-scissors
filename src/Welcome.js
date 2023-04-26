import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="main">
      <h1>Rock, Paper, Scissors</h1>
      <p>Do you dare to play</p>
      <p>this game?</p>
      <Link to="/login">
        <button>Play</button>
      </Link>
    </div>
  );
}
