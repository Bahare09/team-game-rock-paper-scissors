import { useState, React } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false); // New error state
  const navigate = useNavigate();

  const handleInput = (event) => {
    event.preventDefault();
    const inputVal = event.target.value.slice(0, 9).split(" ").join(''); // limit to 9 characters
    setName(inputVal);
    setError(false);
  };

  //formatting the name, so it is without space, with first capital letter
  const formatString = (str) => {
    const trimmed = str.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  };

  //to pass the useState 'name' tp the navigate Page
  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() !== "") {
      navigate("/game", { state: { name: formatString(name) } });
    } else setError(true);
  };

  return (
    <>
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
            <button className="btn">
              <span>Click!</span>
              <span>Play</span>
            </button>
            {error && <p>Please Enter a Valid Name.</p>}
          </form>
        </div>
        <img src="/media/right_skeleton.webp" alt="skeleton" />
      </div>
    </>
  );
}
