import { useState } from "react";

const JoinLink = ({ link }) => {
  const [active, setActive] = useState(false);

  const handleChange = () => {
    setActive(true);
    navigator.clipboard.writeText(link);
  };

  return (
    <div>
      <div onClick={handleChange}>
        {active ? "Copied !" : "Click to copy !"}
      </div>
      <button
        // className={
        //   active
        //     ? `${styles.join_link} ${styles.join_link_active}`
        //     : styles.join_link
        // }
        onClick={handleChange}
      >
        {link}
      </button>
      <h2>Send this link to your friend to connect.</h2>
    </div>
  );
};

export default JoinLink;
