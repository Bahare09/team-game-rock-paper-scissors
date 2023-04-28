import { useState, React } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import Header from "./Header";

export default function Welcome() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleInput = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };
  //to pass the useState 'name' tp the navigate Page
  const handleSubmit = () => {
    navigate("/game", { state: { name } });
  };

  return (
    <>
      <Header />
      <div className="main">
        <img src="/media/left_skeleton.webp" alt="skeleton" />
        <div className="main-content">
          <h3>Do you dare to play this game?</h3>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Provide your Name:</span>
              <input
                className="input-name"
                type="text"
                value={name}
                onChange={handleInput}
                required
              />
            </label>
            <button class="btn">
              <span>Click!</span>
              <span>Play</span>
            </button>
          </form>
        </div>
        <img src="/media/right_skeleton.webp" alt="skeleton" />
      </div>
    </>
  );
}
