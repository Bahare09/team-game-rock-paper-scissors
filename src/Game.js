import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";

function Game() {
  //to import the useState name from Welcome Page
  //access it like ==>{location.state.name}
  const location = useLocation();

  const choices = [
    { name: "Rock", icon: "rock-icon" },
    { name: "Paper", icon: "paper-icon" },
    { name: "Scissors", icon: "scissors-icon" },
  ];
  const [user, setUser] = useState("close-hand-icon");
  const [computer, setComputer] = useState("close-hand-icon");
  const [result, setResult] = useState("VS");
  const [userPoint, setUserPoint] = useState(0);
  const [compPoint, setCompPoint] = useState(0);
  const [compHead, setCompHead] = useState([
    "head-icon **",
    "head-icon **",
    "head-icon **",
  ]);
  const [userHead, setUserHead] = useState([
    "head-icon **",
    "head-icon **",
    "head-icon **",
  ]);

  const handleClick = (userChoice) => {
    setUser(userChoice.icon);
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputer(computerChoice.icon);
    if (
      (userChoice.name === "Rock" && computerChoice.name === "Scissors") ||
      (userChoice.name === "Paper" && computerChoice.name === "Rock") ||
      (userChoice.name === "Scissors" && computerChoice.name === "Paper")
    ) {
      setResult("You Win!!");
      setUserPoint(userPoint + 1);
      if (userPoint === 0) {
        setUserHead(["red-head-icon **", "head-icon **", "head-icon **"]);
      }
      if (userPoint === 1) {
        setUserHead(["red-head-icon **", "red-head-icon **", "head-icon **"]);
      }
      if (userPoint === 2) {
        setUserHead([
          "red-head-icon **",
          "red-head-icon **",
          "red-head-icon **",
        ]);
      }
    } else if (userChoice === computerChoice) {
      setResult("**Tie**");
    } else {
      setResult("Computer Wins!");
      setCompPoint(compPoint + 1);
      if (compPoint === 0) {
        setCompHead(["red-head-icon **", "head-icon **", "head-icon **"]);
      }
      if (compPoint === 1) {
        setCompHead(["red-head-icon **", "red-head-icon **", "head-icon **"]);
      }
      if (compPoint === 2) {
        setCompHead([
          "red-head-icon **",
          "red-head-icon **",
          "red-head-icon **",
        ]);
      }
    }
  };

  return (
    <div className="home">
      <div className="container">
        <h1>Rock,Paper,Scissors</h1>
        <div> {user}</div>
        <h1>{result}</h1>
        <div>{computer}</div>
        <div className="buttons">
          {choices.map((choice, index) => (
            <button key={index} onClick={() => handleClick(choice)}>
              {choice.name}
            </button>
          ))}
        </div>
        <div className="scoreboard">
          <h1>username</h1>
          <div>{userHead}</div>
        </div>
        <div className="scoreboard">
          <h1>computer</h1>
          <div>{compHead}</div>
        </div>
      </div>
    </div>
  );
}

export default Game;
