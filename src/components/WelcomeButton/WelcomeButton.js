import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";

const WelcomeButton = ({ name, type, userName }) => {
  const { socket, navigate } = useContext(SocketContext);

  const handleChange = (type) => {
    socket.emit("game:create", { type }, (err, roomId) => {
      navigate(`/game/${roomId}`);
    });
  };

  //formatting the name, so it is without space, with first capital letter
  const formatString = (str) => {
    const trimmed = str.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  };

  return (
    <div className="btn-center" onClick={() => handleChange(type)}>
      <button className="btn">
        <span>Click!</span>
        <span>{name}</span>
      </button>
    </div>
  );
};

export default WelcomeButton;
