import { useContext } from "react";
import { SocketContext } from "../../context/SocketContext";

const WelcomeButton = ({ name, type, userName, setError }) => {
  const { socket, navigate } = useContext(SocketContext);

  const handleChange = (type) => {
    if (userName.trim() === "") {
      setError(true);
    } else if (type === "computer") {
      navigate("/game", { state: { name: formatString(userName) } });
    } else {
      socket.emit("room:create", { type }, (err, roomId) => {
        navigate(`/room/${roomId}`, {
          state: { name: formatString(userName) },
        });
      });
    }
  };

  //formatting the name, so it is without space, with first capital letter
  const formatString = (str) => {
    const trimmed = str.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  };

  return (
    <div className="btn-center" onClick={() => handleChange(type)}>
      <button className="btn" type="submit" value={name}>
        <span>Click!</span>
        <span>{name}</span>
      </button>
    </div>
  );
};

export default WelcomeButton;
