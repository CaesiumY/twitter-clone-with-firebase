import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <li>
          <Link to="/" className="navLink__text">
            <FontAwesomeIcon icon={faTwitter} color={"#04aaff"} size="2x" />
            <span style={{ marginTop: 10 }}>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/profile" className="navLink__text">
            <FontAwesomeIcon icon={faUserAlt} color={"#04aaff"} size="2x" />
            <span style={{ marginTop: 10 }}>Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
