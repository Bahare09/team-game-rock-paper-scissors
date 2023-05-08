import { useState } from "react";
import "./JoinLink.css";

const JoinLink = ({ link }) => {
  const [active, setActive] = useState(false);

  const handleChange = () => {
    setActive(true);
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="link_container">
      <div onClick={handleChange} className="copy_text">
        {active ? "Copied !" : "Click to copy !"}
      </div>
      <button
        className={active ? `link-btn link-btn-active` : "link-btn"}
        onClick={handleChange}
      >
        {link}
      </button>
      <p>Send this room to your friend to connect.</p>
    </div>
  );
};

export default JoinLink;
