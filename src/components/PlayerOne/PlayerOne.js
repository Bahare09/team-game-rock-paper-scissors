import { useEffect, useState, useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import Blue_head from "../../assets/media/blue_head.webp";
import Red_head from "../../assets/media/red_head.webp";

const PlayerOne = ({ updateScore }) => {
  const [score, setScore] = useState(0);
  const { room, player_1 } = useContext(SocketContext);

  useEffect(() => {
    if (updateScore) {
      setScore(room.players[player_1].score);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateScore]);

  return (
    <>
      <div className="scoreboard scoreboard_1">
        <h1 className="board-text">
          {room.players[player_1].name
            ? room.players[player_1].name
            : "Player 1"}
        </h1>
        <div className="head_group">
          {[...Array(3).keys()].map((ele, index) =>
            index + 1 <= score ? (
              <img key={index} src={Red_head} alt="red head" />
            ) : (
              <img key={index} src={Blue_head} alt="blue head" />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default PlayerOne;
