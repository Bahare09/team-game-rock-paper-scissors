import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import "./Controls.css";

const Controls = () => {
  const [option, setOption] = useState("");
  const { socket, room } = useContext(SocketContext);

  useEffect(() => {
    if (room.players[socket.id].optionLock) {
      setOption(room.players[socket.id].option);
    } else {
      setOption("");
    }
  }, [room]);

  const handleChange = ({ currentTarget: input }) => {
    setOption(input.value);
    room.players[socket.id].option = input.value;
    room.players[socket.id].optionLock = true;
    socket.emit("room:update", room);
  };

  return (
    <div className="buttons">
      <button
        className={
          option === "Rock"
            ? "custom-btn button active_btn"
            : "custom-btn button"
        }
        disabled={room.players[socket.id].optionLock}
        onClick={handleChange}
        value="Rock"
      >
        Rock
      </button>
      <button
        className={
          option === "Paper"
            ? "custom-btn button active_btn"
            : "custom-btn button"
        }
        disabled={room.players[socket.id].optionLock}
        onClick={handleChange}
        value="Paper"
      >
        Paper
      </button>
      <button
        className={
          option === "Scissors"
            ? "custom-btn button active_btn"
            : "custom-btn button"
        }
        disabled={room.players[socket.id].optionLock}
        onClick={handleChange}
        value="Scissors"
      >
        Scissors
      </button>
    </div>
  );
};

export default Controls;
