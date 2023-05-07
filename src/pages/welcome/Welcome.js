import { useState, React } from "react";
import "./Welcome.css";
import WelcomeButton from "../../components/WelcomeButton/WelcomeButton";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false); // New error state

  const handleInput = (event) => {
    event.preventDefault();
    const inputVal = event.target.value.slice(0, 9).split(" ").join(""); // limit to 9 characters
    setUserName(inputVal);
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userName.trim() === "") {
      setError(true);
    }
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
                value={userName}
                onChange={handleInput}
                required
              />
            </label>
            {error && <p>Please Enter a Valid Name.</p>}
            <div>
              <WelcomeButton
                name="Play with Computer"
                type="computer"
                userName={userName}
                setError={setError}
              />
              <WelcomeButton
                name="Play with Stranger"
                type="stranger"
                userName={userName}
                setError={setError}
              />
              <WelcomeButton
                name="Play with Friend"
                type="friend"
                userName={userName}
                setError={setError}
              />
            </div>
          </form>
        </div>
        <img src="/media/right_skeleton.webp" alt="skeleton" />
      </div>
    </>
  );
}
