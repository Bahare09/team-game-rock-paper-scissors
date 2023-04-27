import { useState, React } from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };
  return (
    <div className="main">
      <h1>Rock, Paper, Scissors</h1>
      <p>Do you dare to play</p>
      <p>this game?</p>
      <form onSubmit={handleSubmit}>
        <label>
          Provide your Name:
          <input type="text" value={name} onChange={handleSubmit} />
        </label>
        <Link to="/game">
          <input type="submit" />
        </Link>
      </form>
    </div>
  );
}
