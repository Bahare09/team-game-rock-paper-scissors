import { useState, React } from "react";

export default function Game() {
  const choices = [{ name: "Rock" }, { name: "Paper" }, { name: "Scissors" }];
  const [user, setUser] = useState("");
  const [computer, setComputer] = useState("");
  const [result, setResult] = useState("");
  const [userPoint, setUserPoint] = useState(0);
  const [compPoint, setCompPoint] = useState(0);

  const handleClick = (userChoice) => {
    setUser(userChoice);
    const computerChoice =
      choices[Math.floor(Math.random() * choices.length)].name;
    setComputer(computerChoice);
    if (
      (userChoice === "Rock" && computerChoice === "Scissors") ||
      (userChoice === "Paper" && computerChoice === "Rock") ||
      (userChoice === "Scissors" && computerChoice === "Paper")
    ) {
      setResult("You Win!!");
      setUserPoint(userPoint + 1);
    } else if (userChoice === computerChoice) {
      setResult("**Tie**");
    } else {
      setResult("Computer Wins!");
      setCompPoint(compPoint + 1);
    }
  };

  return (
    <div className="home">
      <div className="container">
        <h1>Rock,Paper,Scissors Game!</h1>
        <div className="buttons">
          {choices.map((choice, index) => (
            <button key={index} onClick={() => handleClick(choice.name)}>
              {choice.name}
            </button>
          ))}
        </div>
        <h3>Your Choice Is :{user}</h3>
        <h3>Computer Choice Is :{computer}</h3>
        <h1>{result}</h1>
        <div className="buttons-1">
          <div className="col">
            <h2>User Points:</h2>
            <button>{userPoint}</button>
          </div>
          <div className="col">
            <h2>Computer Points:</h2>

            <button>{compPoint}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
