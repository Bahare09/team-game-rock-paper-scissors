import { useState, React } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="main">
      <h1>Rock, Paper, Scissors</h1>
      <p>Do you dare to play</p>
      <p>this game?</p>
      <form onSubmit={handleSubmit}>
        <label>
          Provide your Name:
          <input type="text" value={name} onChange={handleInput} />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}
