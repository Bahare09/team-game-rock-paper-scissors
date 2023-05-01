import "./Header.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <>
      <NavLink to={"/"} className="nav">
        <div>
          <h1 id="shadow">
            <span id="glow">ROCK, </span>
            <span id="glow">PAPER, </span>
            <span id="blink">SCISSORS</span>
          </h1>
        </div>
      </NavLink>
    </>
  );
}
