/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import "../../App.css";
import "./Room.css";
import JoinLink from "../../components/JoinLink/JoinLink";
import LostSong from "../../assets/evil-laugh.mp3";
import Controls from "../../components/controls/Controls";
import PlayerOne from "../../components/PlayerOne/PlayerOne";
import PlayerTwo from "../../components/PlayerTwo/PlayerTwo";
import HandImage1 from "../../components/Hand_Images/HandImage1.js";
import HandImage2 from "../../components/Hand_Images/HandImage2.js";

function Room() {
  const location = useLocation();
  const navigate = useNavigate();
  const [resultText, setResultText] = useState("VS");
  const { socket, room, player_1, player_2 } = useContext(SocketContext);
  const [user, setUser] = useState("Rock");
  const [computer, setComputer] = useState("Rock");
  const [showModal, setShowModal] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [updateScore, setUpdateScore] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [audio] = useState(new Audio(LostSong));

  //for updating name value
  useEffect(() => {
    const players = room?.players;
    if (players && players[player_1] && players[player_1].name === "") {
      players[player_1].name = location.state.name;
    } else if (players && players[player_2] && players[player_2].name === "") {
      players[player_2].name = location.state.name;
    }
    socket.emit("room:update", room);
  }, []);

  //for disabling buttons when after the pop up window
  useEffect(() => {
    if (showModal) {
      setButtonsDisabled(true);
    } else {
      setButtonsDisabled(false);
    }
  }, [showModal]);

  useEffect(() => {
    let roomId = location.pathname.split("/")[2];
    let size = Object.keys(socket).length;

    if (size > 0) {
      socket.emit("room:join", { roomId }, (err, room) => {
        if (err) navigate("/");
      });
    }
  }, [socket]);

  useEffect(() => {
    const calculateResults = async () => {
      const players = room?.players;
      if (
        players &&
        players[player_1]?.optionLock === true &&
        players[player_2]?.optionLock === true
      ) {
        let option_1 = players[player_1].option;
        let option_2 = players[player_2].option;

        let result = { score: [0, 0], text: "**Tie**" };
        if (option_1 !== option_2) {
          result = validateOptions(`${option_1} ${option_2}`);
        }

        await performAnimation(result.text, option_1, option_2);

        room.players[player_1].score += result.score[0];
        room.players[player_2].score += result.score[1];

        setUpdateScore(true);

        room.players[player_1].optionLock = false;
        room.players[player_2].optionLock = false;

        if (
          room.players[player_1].score === 3 ||
          room.players[player_2].score === 3
        ) {
          setShowModal(true);
        }

        if (room.players[player_1].score === 3) {
          audio.play();
        }
        if (room.players[player_2].score === 3) {
          audio.play();
        }

        socket.emit("room:update", room);
      }
    };
    calculateResults();
  }, [room, socket, player_1, player_2]);

  const validateOptions = (value) => {
    switch (value) {
      case "Rock Paper":
        return { score: [0, 1], text: "You lose!!" };
      case "Paper Scissors":
        return { score: [0, 1], text: "You lose!!" };
      case "Scissors Rock":
        return { score: [0, 1], text: "You lose!!" };
      case "Paper Rock":
        return { score: [1, 0], text: "You Win!!" };
      case "Scissors Paper":
        return { score: [1, 0], text: "You Win!!" };
      case "Rock Scissors":
        return { score: [1, 0], text: "You Win!!" };
      default:
        return { score: [0, 0], text: "**Tie**" };
    }
  };

  const performAnimation = async (text, option_1, option_2) => {
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    // reset the resultText and animation states
    setResultText("VS");
    setUser("Rock");
    setComputer("Rock");

    for (let i = 0; i <= 2; i++) {
      if (i === 1) {
        setAnimationClass("up-down");
        await timer(2000);
      } else if (i === 2) {
        setUser(option_1);
        setComputer(option_2);
        setResultText(text);
        setAnimationClass("scale");
        await timer(1000);
      }
      setAnimationClass("");
      setUpdateScore(false);
    }

    return Promise.resolve();
  };

  const handleAnotherNameClick = (event) => {
    event.preventDefault();
    restartGame();
  };

  const restartGame = () => {
    navigate("/");
    setButtonsDisabled(false);
  };

  return (
    <div className="home">
      <div className="game_container">
        <div className="hands_container">
          <HandImage1 option={user} animationClass={animationClass} />
          <h1 className="result">{resultText}</h1>
          <div className="waiting_container">
            {!player_2 && room.type === "friend" && (
              <JoinLink link={`${room.roomId}`} />
            )}
            {!player_2 && <p>waiting for opponent connection...</p>}
          </div>

          {player_2 && (
            <HandImage2 option={computer} animationClass={animationClass} />
          )}
        </div>

        <div className="scoreboards_buttons">
          {player_2 && <Controls buttonsDisabled={buttonsDisabled} />}
          <PlayerOne updateScore={updateScore} />
          <PlayerTwo updateScore={updateScore} />
        </div>

        <div className="btn-center">
          <button
            type="button"
            className="btn name_btn"
            onClick={handleAnotherNameClick}
          >
            <span>Click!</span>
            <span>Another game?</span>
          </button>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              {resultText === "You Win!!" ? (
                <h2>Congratulations! You Win!</h2>
              ) : resultText === "Computer Wins!" ? (
                <h2>Oops! Computer Wins!</h2>
              ) : (
                <h2>Game Over! You lose!</h2>
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

export default Room;
