import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import "./Game.css";
import LostSong from "./assets/evil-laugh.mp3" 

function Game() {
  //to import the useState name from Welcome Page
  //access it like ==>{location.state.name}
  const location = useLocation();
  const navigate = useNavigate();

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
    <img key={0} src="./media/blue_head.webp" alt="blue head" />,
    <img key={1} src="./media/blue_head.webp" alt="blue head" />,
    <img key={2} src="./media/blue_head.webp" alt="blue head" />,
  ]);
  const [userHead, setUserHead] = useState([
    <img key={0} src="./media/blue_head.webp" alt="blue head" />,
    <img key={1} src="./media/blue_head.webp" alt="blue head" />,
    <img key={2} src="./media/blue_head.webp" alt="blue head" />,
  ]);
  const [showModal, setShowModal] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const [audio] = useState(new Audio(LostSong));

  //updating animationClass each time it was called
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

  //for disabling buttons when after the pop up window
  useEffect(() => {
    if (showModal) {
      setButtonsDisabled(true);
    } else {
      setButtonsDisabled(false);
    }
  }, [showModal]);

  const handleAnotherNameClick = (event) => {
    event.preventDefault();
    navigate("/");
    restartGame();
  };

  const handleClick = (userChoice) => {
    setButtonsDisabled(true);
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
      setButtonsDisabled(false);
      if (
        (userChoice.name === "Rock" && computerChoice.name === "Scissors") ||
        (userChoice.name === "Paper" && computerChoice.name === "Rock") ||
        (userChoice.name === "Scissors" && computerChoice.name === "Paper")
      ) {
        setResult("You Win!!");
        setUserPoint(userPoint + 1);
        if (userPoint === 0) {
          setUserHead([
            <img key={0} src="./media/red_head.webp" alt="red head" />,
            <img key={1} src="./media/blue_head.webp" alt="blue head" />,
            <img key={2} src="./media/blue_head.webp" alt="blue head" />,
          ]);
        }
        if (userPoint === 1) {
          setUserHead([
            <img key={0} src="./media/red_head.webp" alt="red head" />,
            <img key={1} src="./media/red_head.webp" alt="red head" />,
            <img key={2} src="./media/blue_head.webp" alt="blue head" />,
          ]);
        }
        if (userPoint === 2) {
          setUserHead([
            <img key={0} src="./media/red_head.webp" alt="red head" />,
            <img key={1} src="./media/red_head.webp" alt="red head" />,
            <img key={2} src="./media/red_head.webp" alt="red head" />,
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
            <img key={0} src="./media/red_head.webp" alt="red head" />,
            <img key={1} src="./media/blue_head.webp" alt="blue head" />,
            <img key={2} src="./media/blue_head.webp" alt="blue head" />,
          ]);
        }
        if (compPoint === 1) {
          setCompHead([
            <img key={0} src="./media/red_head.webp" alt="red head" />,
            <img key={1} src="./media/red_head.webp" alt="red head" />,
            <img key={2} src="./media/blue_head.webp" alt="blue head" />,
          ]);
        }
        if (compPoint === 2) {
          setCompHead([
            <img key={0} src="./media/red_head.webp" alt="red head" />,
            <img key={1} src="./media/red_head.webp" alt="red head" />,
            <img key={2} src="./media/red_head.webp" alt="red head" />,
          ]);
          audio.play()
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
      <img key={0} src="./media/blue_head.webp" alt="blue head" />,
      <img key={1} src="./media/blue_head.webp" alt="blue head" />,
      <img key={2} src="./media/blue_head.webp" alt="blue head" />,
    ]);
    setUserHead([
      <img key={0} src="./media/blue_head.webp" alt="blue head" />,
      <img key={1} src="./media/blue_head.webp" alt="blue head" />,
      <img key={2} src="./media/blue_head.webp" alt="blue head" />,
    ]);
  };

  return (
    <div className="home">
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
                disabled={buttonsDisabled}
              >
                {choice.name}
              </button>
            ))}
          </div>

          <div className="scoreboard scoreboard_1">
            <h1 className="board-text">{location.state.name}</h1>
            <div className="head_group">{userHead}</div>
          </div>
          <div className="scoreboard scoreboard_2">
            <h1 className="board-text">Computer</h1>
            <div className="head_group">{compHead}</div>
          </div>
        </div>

        <div className="btn-center">
          <button
            type="button"
            className="btn name_btn"
            onClick={handleAnotherNameClick}
          >
            <span>Click!</span>
            <span>Another name?</span>
          </button>
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
            </div>
            <div className="btn-center">
              <button className="btn btn-modal" onClick={restartGame}>
                <span>Click!</span>
                <span>Restart</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
