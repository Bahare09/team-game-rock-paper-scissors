import { useState, React } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import WelcomeButton from "../../components/WelcomeButton/WelcomeButton";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false); // New error state
  const navigate = useNavigate();

  const handleInput = (event) => {
    event.preventDefault();
    const inputVal = event.target.value.slice(0, 9).split(" ").join(""); // limit to 9 characters
    setUserName(inputVal);
    setError(false);
  };

  //formatting the name, so it is without space, with first capital letter
  // const formatString = (str) => {
  //   const trimmed = str.trim();
  //   return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  // };

  //to pass the useState 'name' tp the navigate Page
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (name.trim() !== "") {
  //     navigate("/game", { state: { name: formatString(name) } });
  //   } else setError(true);
  // };

  return (
    <>
      <div className="main">
        <img src="/media/left_skeleton.webp" alt="skeleton" />
        <div className="main-content">
          <h3>Do you dare to play this game?</h3>
          <form>
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
            <div>
              <WelcomeButton
                name="Play with Computer"
                type="computer"
                userName={userName}
              />
              <WelcomeButton
                name="Play with Friend"
                type="friend"
                userName={userName}
              />
              <WelcomeButton
                name="Play with Stranger"
                type="stranger"
                userName={userName}
              />

              {/* <div className="btn-center">
                <button className="btn">
                  <span>Click!</span>
                  <span>Play with Computer</span>
                </button>
              </div>
              <div className="btn-center">
                <button className="btn">
                  <span>Click!</span>
                  <span>Play with Friend</span>
                </button>
              </div>
              <div className="btn-center">
                <button className="btn">
                  <span>Click!</span>
                  <span>Play with Stranger</span>
                </button>
              </div> */}
            </div>

            {error && <p>Please Enter a Valid Name.</p>}
          </form>
        </div>
        <img src="/media/right_skeleton.webp" alt="skeleton" />
      </div>
    </>
  );
}
