import { useContext, useState } from "react";
import { SocketContext } from "../../context/SocketContext";

const WelcomeButton = ({ name, type, userName, setError }) => {
  const { socket, navigate } = useContext(SocketContext);
  const [activeButtons, setActiveButtons] = useState(false);
  const [activeRoom, setActiveRoom] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [error2, setError2] = useState(false);

  const handleChange = (type) => {
    if (userName.trim() === "") {
      setError(true);
    } else if (type === "computer") {
      navigate("/game", { state: { name: formatString(userName) } });
    } else if (type === "stranger") {
      console.log("stranger");
      socket.emit("room:create", { type }, (err, roomId) => {
        navigate(`/room/${roomId}`, {
          state: { name: formatString(userName) },
        });
      });
    } else if (type === "friend") {
      console.log("friend");
      setActiveButtons(true);
    }
  };

  //formatting the name, so it is without space, with first capital letter
  const formatString = (str) => {
    const trimmed = str.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  };

  const handleCreateRoom = () => {
    socket.emit("room:create", { type }, (err, roomId) => {
      navigate(`/room/${roomId}`, { state: { name: formatString(userName) } });
    });
    setActiveButtons(false);
  };

  const handleRoomChange = (event) => {
    event.preventDefault();
    const inputVal = event.target.value.slice(0, 9).split(" ").join(""); // limit to 9 characters
    setRoomName(inputVal);
    setError2(false);
  };

  const handleJoinRoom = () => {
    setActiveRoom(true);
    setActiveButtons(false);
  };

  const joinRoom = () => {
    if (roomName !== "") {
      socket.emit("room:create", { type }, (err, roomId) => {
        navigate(`/room/${roomName}`, {
          state: { name: formatString(userName) },
        });
      });
      setActiveRoom(false);
    } else {
      setError2(true);
    }
  };

  return (
    <>
      <div className="btn-center" onClick={() => handleChange(type)}>
        <button className="btn" type="submit" value={name}>
          <span>Click!</span>
          <span>{name}</span>
        </button>
      </div>
      {activeButtons && (
        <div>
          <div>
            <button type="submit" onClick={handleCreateRoom}>
              Create room
            </button>
            <button type="submit" onClick={handleJoinRoom}>
              Join room
            </button>
          </div>
        </div>
      )}
      {activeRoom && (
        <>
          <label>
            <span>Provide your room:</span>
            <input
              className="input-name"
              type="text"
              value={roomName}
              onChange={handleRoomChange}
              required
            />
          </label>
          {error2 && <p>Wrong room</p>}
          <button type="submit" onClick={joinRoom}>
            Join room
          </button>
        </>
      )}
    </>
  );
};

export default WelcomeButton;
