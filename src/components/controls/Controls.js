import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import "./Controls.css";

const Controls = ({ choices }) => {
  const [option, setOption] = useState("");
  const { socket, game } = useContext(SocketContext);

  useEffect(() => {
    if (game.players[socket.id].optionLock) {
      setOption(game.players[socket.id].option);
    } else {
      setOption("");
    }
  }, [game]);

  const handleChange = ({ currentTarget: input }) => {
    setOption(input.value);
    game.players[socket.id].option = input.value;
    game.players[socket.id].optionLock = true;
    socket.emit("game:update", game);
  };

  return (
    <div className="buttons">
      {choices.map((choice, index) => (
        <button
          className={
            option.length > 0
              ? "custom-btn button active_btn"
              : "custom-btn button"
          }
          key={index}
          disabled={game.players[socket.id].optionLock}
          onClick={handleChange}
          value={choice.name}
        >
          {choice.name}
        </button>
      ))}
    </div>
  );
};

export default Controls;
