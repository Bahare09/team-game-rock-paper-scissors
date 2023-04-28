import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import "./Game.css";

function Game() {
  //to import the useState name from Welcome Page
  //access it like ==>{location.state.name}
  const location = useLocation();

  const choices = [
    { name: "Rock", icon: "rock" },
    { name: "Paper", icon: "paper" },
    { name: "Scissors", icon: "scissors" },
  ];
  const [user, setUser] = useState(
    <img className="left_hand" src="./media/left_rock.webp" alt="rock hand" />
  );
  const [computer, setComputer] = useState(
    <img className="right_hand" src="./media/right_rock.webp" alt="rock hand" />
  );
  const [result, setResult] = useState("VS");
  const [userPoint, setUserPoint] = useState(0);
  const [compPoint, setCompPoint] = useState(0);
  const [compHead, setCompHead] = useState([
    <img src="./media/blue_head.webp" alt="blue head" />,
    <img src="./media/blue_head.webp" alt="blue head" />,
    <img src="./media/blue_head.webp" alt="blue head" />,
  ]);
  const [userHead, setUserHead] = useState([
    <img src="./media/blue_head.webp" alt="blue head" />,
    <img src="./media/blue_head.webp" alt="blue head" />,
    <img src="./media/blue_head.webp" alt="blue head" />,
  ]);
  const [showModal, setShowModal] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setUser((prevUser) => {
      return (
        <img
          src={prevUser.props.src}
          className={`left_hand ${animationClass}`}
          alt="hand"
        />
      );
    });
    setComputer((prevComputer) => {
      return (
        <img
          src={prevComputer.props.src}
          className={`right_hand ${animationClass}`}
          alt="hand"
        />
      );
    });
  }, [animationClass]);

  const handleClick = (userChoice) => {
    // reset the result and animation states
    setResult("VS");
    setUser(
      <img
        src="./media/left_rock.webp"
        className={`left_hand ${animationClass}`}
        alt="rock hand"
      />
    );
    setComputer(
      <img
        src="./media/right_rock.webp"
        className={`right_hand ${animationClass}`}
        alt="rock hand"
      />
    );

    // Set the animation class to trigger the up-down animation
    setAnimationClass("up-down");

    // Wait for the up-down animation to finish, then switch to the new image
    setTimeout(() => {
      setUser(
        <img
          src={`./media/left_${userChoice.icon}.webp`}
          className={`left_hand ${animationClass}`}
          alt="hand"
        />
      );
      const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];
      setComputer(
        <img
          src={`./media/right_${computerChoice.icon}.webp`}
          className={`right_hand ${animationClass}`}
          alt="hand"
        />
      );

      // Set the animation class to trigger the scale animation
      setAnimationClass("scale");

      // Wait for the scale animation to finish, then remove the animation class
      setTimeout(() => {
        setAnimationClass("");
      }, 1000);

      if (
        (userChoice.name === "Rock" && computerChoice.name === "Scissors") ||
        (userChoice.name === "Paper" && computerChoice.name === "Rock") ||
        (userChoice.name === "Scissors" && computerChoice.name === "Paper")
      ) {
        setResult("You Win!!");
        setUserPoint(userPoint + 1);
        if (userPoint === 0) {
          setUserHead([
            <img src="./media/red_head.webp" alt="red head" />,
            <img src="./media/blue_head.webp" alt="blue head" />,
            <img src="./media/blue_head.webp" alt="blue head" />,
          ]);
        }
        if (userPoint === 1) {
          setUserHead([
            <img src="./media/red_head.webp" alt="red head" />,
            <img src="./media/red_head.webp" alt="red head" />,
            <img src="./media/blue_head.webp" alt="blue head" />,
          ]);
        }
        if (userPoint === 2) {
          setUserHead([
            <img src="./media/red_head.webp" alt="red head" />,
            <img src="./media/red_head.webp" alt="red head" />,
            <img src="./media/red_head.webp" alt="red head" />,
          ]);
          setShowModal(true);
        }
      } else if (userChoice === computerChoice) {
        setResult("**Tie**");
      } else {
        setResult("Computer Wins!");
        setCompPoint(compPoint + 1);
        if (compPoint === 0) {
          setCompHead([
            <img src="./media/red_head.webp" alt="red head" />,
            <img src="./media/blue_head.webp" alt="blue head" />,
            <img src="./media/blue_head.webp" alt="blue head" />,
          ]);
        }
        if (compPoint === 1) {
          setCompHead([
            <img src="./media/red_head.webp" alt="red head" />,
            <img src="./media/red_head.webp" alt="red head" />,
            <img src="./media/blue_head.webp" alt="blue head" />,
          ]);
        }
        if (compPoint === 2) {
          setCompHead([
            <img src="./media/red_head.webp" alt="red head" />,
            <img src="./media/red_head.webp" alt="red head" />,
            <img src="./media/red_head.webp" alt="red head" />,
          ]);
          setShowModal(true);
        }
      }
    }, 2000);
  };
  const restartGame = () => {
    setUser(
      <img className="left_hand" src="./media/left_rock.webp" alt="rock hand" />
    );
    setComputer(
      <img
        className="right_hand"
        src="./media/right_rock.webp"
        alt="rock hand"
      />
    );
    setResult("VS");
    setUserPoint(0);
    setCompPoint(0);
    setShowModal(false);
    setCompHead([
      <img src="./media/blue_head.webp" alt="blue head" />,
      <img src="./media/blue_head.webp" alt="blue head" />,
      <img src="./media/blue_head.webp" alt="blue head" />,
    ]);
    setUserHead([
      <img src="./media/blue_head.webp" alt="blue head" />,
      <img src="./media/blue_head.webp" alt="blue head" />,
      <img src="./media/blue_head.webp" alt="blue head" />,
    ]);
  };

  return (
    <div className="home">
      <Header />
      <div className="game_container">
        <div className="hands_container">
          {user}
          <h1 className="result">{result}</h1>
          {computer}
        </div>

        <div className="scoreboards_buttons">
          <div className="buttons">
            {choices.map((choice, index) => (
              <button
                className="custom-btn button"
                key={index}
                onClick={() => handleClick(choice)}
              >
                {choice.name}
              </button>
            ))}
          </div>

          <div className="scoreboard scoreboard_1">
            <h1>{location.state.name}</h1>
            <div className="head_group">{userHead}</div>
          </div>
          <div className="scoreboard scoreboard_2">
            <h1>Computer</h1>
            <div className="head_group">{compHead}</div>
          </div>
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              {result === "You Win!!" ? (
                <h2>Congratulations! You Win!</h2>
              ) : result === "Computer Wins!" ? (
                <h2>Oops! Computer Wins!</h2>
              ) : (
                <h2>Game Over!</h2>
              )}
              <button onClick={restartGame}>Restart Game</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
