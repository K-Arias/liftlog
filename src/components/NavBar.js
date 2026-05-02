import { Link } from "react-router-dom";


function NavBar({ currentLift }) {
  return (
    <nav className="nav">
      <h2>LiftLog</h2>

      <div className="navLinks">
        <Link to="/">home</Link>

        <Link to="/workout">
          {currentLift ? "continue workout" : "start workout"}
        </Link>

        <Link to="/history">history</Link>
      </div>
    </nav>
  );
}

export default NavBar;